import React, { Component } from 'react';
import {Card , Button , Icon ,Table, message , Modal} from 'antd';
import MyButton from '../../components/my-button';
import "./index.less";
import {reqAddCategory, reqCategories} from '../../api';
import AddCategoryForm from "./add-ccategory-from";

export default class Category extends Component {
  state = {
    categories: [],//一级分类列表
    isShowAddCategory:false,//显示添加的品类
  }

  async componentDidMount(){
    const result = await  reqCategories("0");
    if (result) {
      this.setState({categories:result})
    }
  }
      /*
      显示添加品类
      h
       */
  ShowAddCategory = () =>{
    this.setState({
      isShowAddCategory:true,
    })
  };
  // 隐藏添加品类
  hideAddCategory = () =>{
    this.setState({
      isShowAddCategory:false
    })
  }

  // 添加品类
  addCategory =() =>{
    this.addCategoryFrom.props.form.validateFields(async (err,values)=>{
      if(!err){
        // 如果效验通过
        console.log(values);
        const { parentId,categoryName} = values;
      const result = await reqAddCategory(parentId,categoryName)
        if(result){
          message.success("添加分类成功",2)
          this.setState({
            isShowAddCategory:false
          })
        }
      }
    })
  }


  render() {
    const  { categories , isShowAddCategory} = this.state;
    // 表头内容n
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',

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


    return <Card title="一级分类列表" extra={<Button type="primary"  onClick={this.ShowAddCategory}><Icon type="plus" />添加品类</Button>}>
      <Table
      columns={columns}
      dataSource={this.state.categories}
      bordered
      // 注意小驼峰命名
      pagination={{
        defaultPageSize:3,
        showSizeChanger:true,
        showQuickJumper:true,
        pageSizeOptions:['3','6','9']
    }}
      rowKey="_id"
      />,
      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.hideAddCategory}
        okText="确认"
        cancelText="取消"
      >
      <AddCategoryForm categories={categories} wrappedComponentRef ={(from)=>this.addCategoryFrom =from}/>
      </Modal>
    </Card>
  }
}