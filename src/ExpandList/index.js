import React from 'react';
import {List, Button} from 'antd';
import PropTypes from 'prop-types';

import fetch from 'cross-fetch';

class ExpandList extends React.Component {
  state = {
    initLoading: true,
    loading: false,
    current: 1,
    data: [],
    list: []
  };

  componentDidMount() {
    this.getInitData();
  }

  componentWillReceiveProps() {
    this.getInitData();
  }

  getInitData() {
    const {pageSize} = this.props;
    let {current, initLoading} = this.state;
    this.getData(res => {
      if (current * pageSize < res.length) {
        initLoading = false;
      }
      this.setState({
        initLoading,
        data: res.slice(0, current * pageSize),
        current: 1,
        list: res
      });
    });
  }

  getData = callback => {
    const {fetchListUrl} = this.props;
    fetch(fetchListUrl, {
      method: 'GET'
    })
      .then(json => {
        return json.json();
      })
      .then(result => {
        if (result.code === 0) {
          callback(result.data.items);
        }
      });
  };

  onLoadMore = () => {
    const {pageSize} = this.props;
    let {current, list, initLoading} = this.state;
    current++;
    if (current * pageSize >= list.length) {
      initLoading = true;
    }
    this.setState(
      {
        data: list.slice(0, current * pageSize),
        current,
        initLoading
      },
      () => {
        window.dispatchEvent(new Event('resize'));
      }
    );
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
        renderItem={item => renderItems(item)}
      />
    );
  }
}

ExpandList.propTypes = {
  /**
   * header 头信息，接收string或者reactDom，默认为空
   */
  header: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  /**
   * pageSize 分页条数，默认为10
   */
  pageSize: PropTypes.number,
  /**
   * fetchListUrl 请求的url 必填
   */
  fetchListUrl: PropTypes.string.isRequired,
  /**
   * renderItems 渲染的items子项
   */
  renderItems: PropTypes.func.isRequired
};
ExpandList.defaultProps = {
  header: '',
  pageSize: 10,
  fetchListUrl: '',
  renderItems: function() {}
};

export default ExpandList;
