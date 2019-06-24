import React, { Component } from 'react';
import {Card , Button , Icon ,Table} from 'antd'
import MyButton from '../../components/my-button';
import "./index.less";
import  { reqCategories } from '../../api';

export default class Category extends Component {
  state = {
    categories: []
  }
  async componentDidMount(){
    const result = await  reqCategories("0");
    if (result) {
      this.setState({categories:result})
    }
  }

  render() {
    // 表头内容
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'categoryName',

      },
      {
        title: '操作 ',
        dataIndex: 'operation',
        className: "category-operation",
        // 表单内容
        render: text => {
          return <div>
            <MyButton>修改</MyButton>
            <MyButton>种类</MyButton>
          </div>
        }
      },
    ];
    const data = [
      {
        key: '1',
        categoryName: '充电宝',
        operation: '￥300',
      },
      {
        key: '2',
        categoryName: ' 手机',
        operation: '￥125',
      },
      {
        key: '3',
        categoryName: '家具',
        operation: '￥120',
      },
      {
        key: '4',
        categoryName: '电脑 ',
        operation: '￥125',
      }, {
        key: '5',
        categoryName: ' 冰箱',
        operation: '￥125',
      },
    ];

    return <Card title="一级分类列表" extra={<Button type="primary"><Icon type="github"/>添加品类</Button>}>
      <Table
      columns={columns}
      dataSource={this.state.categories}
      bordered
      Pagination={{
      showSizeChanger: true,
      pageSizeOptions: ['1', '2', '3', '4'],
      showQuickJumper: true,
      defaultPageSize: 3
    }}
      />,
    </Card>
  }
}