import React from 'react';
import {List, Button} from 'antd';
import fetch from 'cross-fetch';

interface ExpandListProps {
  header?: React.ReactNode | string;
  pageSize?: number;
  fetchListUrl: string;
  renderItems: (item: any) => React.ReactNode;
}

interface initializeState {
  /**
   * 用来判断是否要显示加载更多按钮
   */
  initLoading: boolean;
  /**
   * 当卡片内容还在加载中时，可以用 loading 展示一个占位
   */
  loading: boolean;
  /**
   * 列表当前所在页数
   */
  current: number;
  /**
   * 列表数据源
   */
  data: any;
  /**
   * 获取初始化时列表的全部数据
   */
  list: any;
  /**
   * pageSize 分页条数，默认为10
   */
  pageSize: number;
}

class ExpandList extends React.Component<ExpandListProps, initializeState> {
  static defaultProps = {
    header: '',
    pageSize: 10,
    fetchListUrl: '',
    renderItems: function(item: any) {}
  };

  constructor(props: ExpandListProps) {
    super(props);
    let {pageSize} = this.props;
    this.state = {
      initLoading: true,
      loading: false,
      current: 1,
      data: [],
      list: [],
      pageSize: pageSize || 1
    };
  }

  componentDidMount() {
    this.getInitData();
  }

  componentWillReceiveProps() {
    this.getInitData();
  }

  getInitData() {
    let {pageSize} = this.props;
    if (typeof pageSize === 'undefined') {
      pageSize || 10;
    }
    let {current, initLoading} = this.state;
    let totalnow = !pageSize ? current * 10 : current * pageSize;
    this.getData((res: any) => {
      res = res || [];
      if (totalnow < res.length) {
        initLoading = false;
      }
      this.setState({
        initLoading,
        data: res.slice(0, totalnow),
        current: 1,
        list: res
      });
    });
  }

  getData = (callback: any) => {
    const {fetchListUrl} = this.props;
    fetch(fetchListUrl, {
      method: 'GET'
    })
      .then((json: any) => {
        return json.json();
      })
      .then((result: any) => {
        if (result.code === 0) {
          callback(result.data.items);
        }
      });
  };

  onLoadMore = () => {
    const {pageSize} = this.props;
    let {current, list, initLoading} = this.state;
    current++;
    let totalnow = !pageSize ? current * 10 : current * pageSize;
    if (totalnow >= list.length) {
      initLoading = true;
    }
    this.setState(
      {
        data: list.slice(0, totalnow),
        // current,
        initLoading
      },
      () => {
        window.dispatchEvent(new Event('resize'));
      }
    );
  };

  renderItems = (item: any) => {
    const {renderItems} = this.props;
    if (!renderItems) return null;
    return renderItems(item);
  };

  render() {
    const {header, renderItems} = this.props;
    const {loading, data, initLoading} = this.state;
    const loadMore =
      !initLoading && !loading ? (
        <div style={{textAlign: 'center', margin: 8}}>
          <a onClick={this.onLoadMore}>加载更多</a>
        </div>
      ) : null;

    return (
      <List
        className='demo-loadmore-list'
        loading={loading}
        itemLayout='horizontal'
        loadMore={loadMore}
        header={header}
        size='large'
        dataSource={data}
        renderItem={(item: any) => this.renderItems(item)}
      />
    );
  }
}

export default ExpandList;
