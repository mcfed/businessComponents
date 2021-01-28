// import React from 'react';
// import {Input, Select, Button} from 'antd';
// import {storiesOf} from '@storybook/react';
// import McTransfer from '../index';
// import {actions} from '@storybook/addon-actions';
// // import Readme from "../README.md";

// const stories = storiesOf('TransferView', module);
// const eventsFromNames = actions('onClick', 'onMouseOver');

// // stories.addParameters({ jest: ["TransferView.spec.js"] });
// const targetKeys = [];
// const mockData = [];
// for (let i = 0; i < 20; i++) {
//   const data = {
//     key: i.toString(),
//     title: `content${i + 1}`,
//     description: `description of content${i + 1}`,
//     name: `name${i + 1}`,
//     chosen: Math.random() * 2 > 1
//   };
//   if (data.chosen) {
//     targetKeys.push(data.key);
//   }
//   mockData.push(data);
// }
// const header = [
//   {
//     text: 'title',
//     width: 160
//   },
//   {
//     text: 'description',
//     width: 80
//   },
//   {
//     text: 'name',
//     width: 60
//   }
// ];
// const searchItem = 'title';

// function handleChange(targetKeys, direction, moveKeys) {
//   console.log(targetKeys, direction, moveKeys);
//   // targetKeys = targetKeys
// }

// function handleSearch(dir, value) {
//   console.log('search:', dir, value);
// }

// // renderFooter = () => (
// //   <Button size="small" style={{ float: "right", margin: 5 }}>
// //     reload
// //   </Button>
// // );
// stories.add('基础用法', () => (
//   <McTransfer
//     dataSource={mockData}
//     targetKeys={targetKeys}
//     onChange={handleChange}
//     header={header}
//     titles={['Source', 'Target']}
//     showSearch={true}
//     onSearch={handleSearch}
//     filterOption={function(filter, item) {
//       return (
//         (filter.input ? item.title.indexOf(filter.input) >= 0 : true) &&
//         (filter.select ? item.key === filter.select : true)
//       );
//       // && item.key === filter.select
//     }}
//     searchItem={searchItem}
//     // footer={renderFooter}
//   />
// ));
