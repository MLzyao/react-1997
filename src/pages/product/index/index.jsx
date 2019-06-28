import React, { Component } from 'react';
import { Card,Input,Select,Icon,Button ,Table,message } from 'antd';
import MyButton from '../../../components/my-button';
import { reqProducts,reqSearchProduct } from '../../../api'
import './index.less';

const { Option } =Select;
export default class Index extends Component {
  state= {
    products:[],
    total: 0,
    loading:true,
    searchType :"productName",
    searchContent:"",
    pageSize:3,
    pageNum:1
  };

 componentDidMount() {
  this.getProducts(1,3)
  }

  getProducts = async (pageNum,pageSize) =>{
    this.setState({
      loading:true
    });
    // 代表请求的第一页 3条数据
    const { searchContent,searchType } = this.state;

    let promise =null;
    // 如果input有值，则请求会里面的页数 ，行，内容
    if (this.isSearch && searchContent ) {
      promise = reqSearchProduct({
        searchType, searchContent, pageSize, pageNum
      })
      // 没有则显示行和页数
    } else {
         promise = reqProducts(pageNum,pageSize)
      }
      const result = await  promise;

      if(result) {
        this.setState({
          // products在页面展示
          products:result.list,
          total: result.total,
          loading:false,
          pageNum,
          pageSize
        })
      }
  };

  // 点击跳转到add-update
  showAddProduct  = ()=>{
      this.props.history.push('/product/add-update')
  };

  showProduct = (path,product) =>{
  return () =>{
    // console.log(path);
    this.props.history.push(path,product)

  }
  };

  //stateName 要收集的东西
    handleChange =(stateName)=>{
      return (e)=>{
        // 如果是所有状态，是默认就searchType(protuctName)，不是则显示关键字productContent
       const value = stateName ==="searchType" ? e:e.target.value;
        this.setState({ [stateName]:value })

    }
    };
    // 搜索按钮
  Search = async ()=> {
    //收集表单数据
    const { searchContent, pageSize, pageNum} = this.state;
    //收集页数，行数

    if (searchContent) {
      this.setState({loading: true});

      const {searchContent} = this.state;

      if (searchContent) {
        this.isSearch = true;
        this.getProducts(pageNum, pageSize)
        //   const result =await reqSearchProduct({searchType,searchContent,pageSize,pageNum});
        // if( result ){
        //   this.setState({
        //     // products在页面展示
        //     products:result.list,
        //     total: result.total,
        //     loading:false
        //   })
        // }

      } else {
        message.warn("请输入搜索内容", 2)
      }
    }
  };

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
            console.log(product);

            return <div>
              <MyButton onClick = { this.showProduct('/product/detail',product)}>详情</MyButton>
              <MyButton onClick={ this.showProduct('/product/add-update',product) }>修改</MyButton>

            </div>
          }
        },
    ];

    return<Card title={
      <div>
        <Select defaultValue="productName" onChange = {this.handleChange("searchType")}>
          <Option key ={0} value = "productName">根据商品名称</Option>
          <Option key={1} value = "productDesc">根据产品名称</Option>
        </Select>
        <Input placeholder="关键字" className="search-input" onChange = {this.handleChange("searchContent")}/>
        <Button type="primary"  onClick={this.Search}>搜索</Button>
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
