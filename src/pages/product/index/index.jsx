import React, { Component } from 'react';
import { Card,Input,Select,Icon,Button ,Table,} from 'antd';
import MyButton from '../../../components/my-button';
import { reqProducts } from '../../../api'

import './index.less';

const { Option } =Select;
export default class Index extends Component {
  state= {
    products:[],
    total: 0,
    loading:true,
  }

 componentDidMount() {
  this.getProducts(1,3)
  }

  getProducts =async (pageNum,pageSize) =>{
    this.setState({
      loading:true
    })
    // 代表请求的第一页 3条数据
    const result = await  reqProducts(pageNum,pageSize);
    console.log(result);
    if(result) {
      this.setState({
        // products在页面展示
        products:result.list,
        total: result.total,
        loading:false
      })
    }
  }

  // 点击跳转到add-update
  showAddProduct  = ()=>{
      this.props.history.push('/product/add-update')
  }
  showUpdateProduct = (product) =>{
  return () =>{
    this.props.history.push('/product/add-update')
  }
  }


  render() {
    const { products,total, loading } = this.state;
    const columns=[
      {
        title:"商品名称",
        dataIndex:'name'
      },
       {
       title:"商品描述",
       dataIndex:'desc'
     },
       {
         title:"价格",
         dataIndex:'price'
       },

        {
          title:"状态",
          dataIndex:'status',
          className:"product-status",
          render:(status) =>{
            return status ===1
              ?<div><Button type="primary">上架</Button> 已下架</div>
              :<div><Button type="primary">下架</Button> 在线</div>
          }
        },

        {
          title:"操作",
          className:"product-status",
          render:( product) =>{
            console.log(product)

            return <div>
              <MyButton>详情</MyButton>
              <MyButton onClick={ this.showUpdateProduct(product) }>修改</MyButton>

            </div>
          }
        },
    ];





    return<Card title={
      <div>
        <Select defaultValue={0} >
          <Option value={0} key={0}>根据商品名称</Option>
          <Option value={1} key={1}>根据产品名称</Option>
        </Select>
        <Input placeholder="关键字" className="search-input" />
        <Button type="primary">搜索</Button>
      </div>
    }
       extra = {<Button type="primary" onClick={this.showAddProduct}><Icon type="plus"/>添加产品</Button>}
    >
      <Table
        columns = {columns}
        // 数据源
        dataSource = {products}
        bordered
        pagination ={{
          defaultPageSize:3,
          showSizeChanger:true,
          pageSizeOptions:['3','6','9'],
          showQuickJumper:true,
          total,
          onChange:this.getProducts,
          onShowSizeChange:this.getProducts
        }}
        rowKey="_id"
        loading={loading}
      />

    </Card>
  }
}
