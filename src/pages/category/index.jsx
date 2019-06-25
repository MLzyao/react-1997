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
    // 定义接口,DidMount发请求,发了请求更新状态,用户信息就发生变化
  async componentDidMount(){
    const result = await  reqCategories("0");
    if (result) {
      // categories分类的意思
      this.setState({categories:result})
    }
  }
  /*
  显示添加品类
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
  };
  // 添加品类
  addCategory =() =>{
    const { form } = this.addCategoryFrom.props;
    form.validateFields(async (err,values)=>{
      if(!err){
        // 如果效验通过
        console.log(values);
        const { parentId,categoryName} = values;
      const result = await reqAddCategory(parentId,categoryName);
        if(result){
          // 添加成功
          message.success("添加分类成功",2);
          // 清空表单数据
          form.resetFields(['parentId','categoryName']);
          /*
                   如果是一级分类：就在一级分类列表中展示
                   如果是二级分类：就在二级分类中展示，而一级分类是不需要的
                  */
          // 初始化
          const options = {
          //显示添加的品类
         iShowAddCategory: false
          }
          // parentId ==='0'等于一级菜单
          // categories 类别的意思
          if( result.parentId ==='0'){
            // 只有一级才能进来
           options.categories = [...this.state.categories,result]
          }
          // 统一更新
          this.setState( options );
        }
      }
    })
  }

  render() {
    const  { categories , isShowAddCategory} = this.state;
    // 表头内容
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
          console.log(text)
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