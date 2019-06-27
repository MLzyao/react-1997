// 难点

//
// import React, { Component } from 'react';
// import {Card , Button , Icon ,Table, message , Modal} from 'antd';
// import MyButton from '../../components/my-button';
// import {reqAddCategory, reqCategories,reqUpdateCategoryName} from '../../api';
// import AddCategoryForm from "./add-category-from";
// import UpdateCategoryNameForm from './update-category-name';
// import "./index.less";
//
// export default class Category extends Component {
//   state = {
//     categories: [],//一级分类列表
//     subCategories:[],//二级分类列表
//     isShowSubCategories:false,//是否显示耳机分类的列表(标尺 )
//     isShowAddCategory:false,//显示添加的品类
//     isShowUpdateCategoryName: false,
//     loading: true, //显示加载
//   }
//
//   category = {}
//
//     // 定义接口,DidMount发请求,发了请求更新状态,用户信息就发生变化
//       componentDidMount(){
//       this.fetchCategories('0')
//       }
//   fetchCategories = async (parentId) => {
//     this.setState({
//       loading:true
//     })
//
//   const  result = await  reqCategories(parentId);
//     if (result) {
//       if (parentId === "0") {
//         this.setState({categories: result})
//       } else {
//         this.setState({
//           subCategories: result,
//           isShowSubCategories: true
//         })
//       }
//     }
//       // categories分类的意思
//       this.setState({
//         loading:false
//       })
//     }
//
//   /*
//   显示添加品类
//   */
//   // ShowAddCategory = () =>{
//   //   this.setState({
//   //     isShowAddCategory:true,
//   //   })
//   // };
//   // // 隐藏添加品类
//   // hideAddCategory = () =>{
//   //   this.setState({
//   //     isShowAddCategory:false
//   //   })
//   // };
//
//
//   // 添加品类
//   addCategory =() =>{
//     const { form } = this.addCategoryFrom.props;
//     form.validateFields(async (err,values)=>{
//       if(!err){
//         // 如果效验通过
//         console.log(values);
//         const { parentId,categoryName} = values;
//         const result = await reqAddCategory(parentId,categoryName);
//         if(result){
//           // 添加成功
//           message.success("添加分类成功",2);
//           // 清空表单数据
//           form.resetFields(['parentId','categoryName']);
//           /*
//                    如果是一级分类：就在一级分类列表中展示
//                    如果是二级分类：就在二级分类中展示，而一级分类是不需要的
//                   */
//           // 初始化
//           const options = {
//           //显示添加的品类
//          iShowAddCategory: false
//           } ;
//
//           const {isShowSubCategories} = this.state;
//
//           // parentId ==='0'等于一级菜单
//           // categories 类别的意思
//           if( result.parentId ==='0'){
//             // 只有一级才能进来
//            options.categories = [...this.state.categories,result]
//             // 判断是一级的二级的同级是否一致才能进入
//            }else if(isShowSubCategories && result.parentId === this.parentCategory._id){
//             options.subCategories = [...this.state.subCategories,result]
//           }
//           // 统一更新
//           this.setState( options );
//         }
//       }
//     })
//   };
//   // 切换显示
//   toggleDisplay = (stateName,stateValue) =>{
//     return () =>{
//       this.setState({
//         [stateName] : stateValue
//       })
//     }
//   };
//
//   hideUpdateCategoryName =() =>{
//     // 清空表单的值
//     this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
//     this.setState({
//       isShowUpdateCategoryName:false
//     })
//   };
//
//
//   saveCategory = (category) =>{
//     return() =>{
//       this.category = category;
//       this.setState({
//         isShowUpdateCategoryName:true
//       })
//     }
//   };
//
//   updateCategoryName =() => {
// //     // 收集数据
// //     const {form} = this.updateCategoryNameForm.props;
// //     form.validateFields(async (err, values) => {
// //       if (!err) {
// //         const {categoryName} = values;
// //
// //         const categoryId = this.category._id;
// //
// //         // 发送请求
// //         const result = await reqUpdateCategoryName(categoryId,categoryName );
// //         // console.log(result)
// //
// //         if (result) {
// //             const { parentId } = this.category;
// //
// //         let categoryData = this.state.categories;
// //         let stateName = 'categories';
// //
//             if( parentId !=="0"){
//             categoryData = this.state.subCategories;
//             stateName = 'subCategories'
//             }
//
//           // 不想修改原数据
//           const categories = categoryData.map((category) => {
//             let {_id, name, parentId} = category;
//             if (_id === categoryId) {
//               name = categoryName;
//               return {
//                 _id,
//                 name,
//                 parentId
//               }
//             }
//             // 没修裱框内容改则返回
//             return category
//           });
//           // 清空表单项的值 隐藏对话框
//           form.resetFields(['categoryName']);
//
//           message.success('更新分类成功', 2)
//
//           this.setState({
//             isShowUpdateCategoryName: false,
//           [stateName] : categories
//           })
//         }
//       }
//     })
//   };
//   // 显示二级分类
//   showSubCategory = ( category) =>{
//     //发请求二级分类
//     return async ()=>{
//     this.parentCategory  = category;
//     this.fetchCategories(category._id)
//
//     }
//   };
//   goBack =() =>{
//       this.setState({
//       isShowCategories:false
//   })
//   }
//       render(){
//     const {
//
//       categories ,
//       subCategories,
//       isShowSubCategories,
//       isShowAddCategory,
//       isShowUpdateCategoryName,
//       loading } = this.state;
//     // 表头内容
//     const columns = [
//       {
//         title: '品类名称',
//         dataIndex: 'name',
//       },
//       {
//         title: '操作 ',
//         // dataIndex: 'operation',
//         className: "category-operation",
//         // 表单内容
//         render: category => {
//           // console.log(text)
//           return <div>
//             {/*做判断,跳转二级页面*/}
//             <MyButton onClick ={this.saveCategory(category)}>修改名称</MyButton>
//             { this.state.isShowSubCategories
//               ?null :  <MyButton onclick={this.showSubCategory(category)}>查看其他</MyButton>
//             }
//
//           </div>
//         }
//       },
//     ];
//
//
//     return <Card
//       title={ isShowSubCategories?<div><MyButton onClick ={this.goBack}>一级分类</MyButton><Icon type='arrow-left'/>{this.parentCategory.name}</div>:"一级分类列表"}
//       extra={<Button type="primary" onClick={this.toggleDisplay("isShowAddCategory",true)}><Icon type="plus" />添加品类</Button>}>
//       <Table
//       columns={columns}
//       // isShowSubCategories为true,就展示二级
//       dataSource={isShowSubCategories?subCategories:categories }
//       bordered
//       // 注意小驼峰命名
//       pagination={{
//         defaultPageSize:3,
//         showSizeChanger:true,
//         showQuickJumper:true,
//         pageSizeOptions:['3','6','9']
//
//     }}
//       rowKey="_id"
//       loading={loading}
//
//       />
//       <Modal
//         title="添加分类"
//         visible={isShowAddCategory}
//         onOk={this.addCategory}
//         onCancel={this.toggleDisplay('isShowAddCategory',false)}
//         okText="确认"
//         cancelText="取消"
//       >
//         <AddCategoryForm categories={categories} wrappedComponentRef ={(form)=>this.addCategoryFrom =form}/>
//       </Modal>
//
//         <Modal
//           title="修改分类"
//           visible={isShowUpdateCategoryName}
//           onOk={this.updateCategoryName}
//           onCancel={this.hideUpdateCategoryName}
//           okText="确认"
//           cancelText="取消"
//           width={300}
//         >
//           <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef = {(form)=> this.updateCategoryNameForm =form}/>
//       </Modal>
//     </Card>
//   }
// }
import React, { Component } from 'react';
import { Card, Button, Icon, Table, Modal, message } from 'antd';

import { reqCategories, reqAddCategory, reqUpdateCategoryName } from '../../api';
import MyButton from '../../components/my-button';
import AddCategoryForm from "./add-category-from";
import UpdateCategoryNameForm from './update-category-name';
import './index.less';

export default class Category extends Component {
  state = {
    categories: [], // 一级分类列表
    subCategories: [], // 二级分类列表
    isShowSubCategories: false, // 是否显示二级分类列表
    isShowAddCategory: false, // 显示添加品类
    isShowUpdateCategoryName: false, // 显示修改分类名称
    loading: true, // 是否显示loading
  };

  // 初始化临时保存分类数据（否则下面this.category.name会报错）
  category = {};

  componentDidMount() {
    this.fetchCategories('0');
  };

  /**
   * 请求分类数据函数
   * @param parentId 分类id
   * @returns {Promise<void>}
   */
  fetchCategories = async (parentId) => {
    this.setState({
      loading: true
    });

    const result = await reqCategories(parentId);

    if (result) {
      if (parentId === '0') {
        this.setState({categories: result});
      } else {
        this.setState({
          subCategories: result,
          isShowSubCategories: true
        })
      }
    }

    this.setState({
      loading: false
    })

  };

  /**
   * 添加分类请求功能
   */
  addCategory = () => {
    // 1. 表单校验
    // 2. 收集表单数据

    const { form } = this.addCategoryForm.props;

    form.validateFields(async (err, values) => {
      if (!err) {
        // 校验通过
        // console.log(values);
        const { parentId, categoryName } = values;
        // 3. 发送请求
        const result = await reqAddCategory(parentId, categoryName);

        if (result) {
          // 添加分类成功~
          message.success('添加分类成功~', 2);
          // 清空表单数据
          form.resetFields(['parentId', 'categoryName']);

          /*
            如果是一级分类：就在一级分类列表中展示
            如果是二级分类：
              当前显示的是一级分类是不需要的展示
              当前显示的是二级分类，还需要满足添加分类的一级分类和当前显示的一级分类一致，才显示，否则不显示
           */

          const options = {
            isShowAddCategory: false
          };

          const { isShowSubCategories } = this.state;

          if (result.parentId === '0') {
            options.categories = [...this.state.categories, result];
          } else if (isShowSubCategories && result.parentId === this.parentCategory._id) {
            options.subCategories = [...this.state.subCategories, result];
          }

          // 统一更新
          this.setState(options);
        }
      }
    })
  };

  /**
   * 切换显示
   */
  toggleDisplay = (stateName, stateValue) => {
    return () => {
      this.setState({
        [stateName]: stateValue
      })
    }
  };

  /**
   * 隐藏更新分类对话框
   */
  hideUpdateCategoryName = () => {
    // 清空表单项的值
    this.updateCategoryNameForm.props.form.resetFields(['categoryName']);
    // 隐藏对话框
    this.setState({
      isShowUpdateCategoryName: false
    })
  };

  /**
   * 临时保存要修改的分类数据

   */
  saveCategory = (category) => {
    return () => {
      // 保存要更新的分类数据
      this.category = category;

      this.setState({
        isShowUpdateCategoryName: true
      })
    }
  };

  /**
   * 更新分类名称
   */



  updateCategoryName = () => {
    const { form } = this.updateCategoryNameForm.props;
    // 校验表单，收集数据
    form.validateFields(async (err, values) => {
      if (!err) {
        const { categoryName } = values;
        const categoryId = this.category._id;
        // 发送请求
        const result = await reqUpdateCategoryName(categoryId, categoryName);

        if (result) {
          const { parentId } = this.category;

          let categoryData = this.state.categories;
          let stateName = 'categories';


          if (parentId !== '0') {
            // 二级分类
            categoryData = this.state.subCategories;
            stateName = 'subCategories';
          }

          // 不想修改原数据
          const categories = categoryData.map((category) => {
            let { _id, name, parentId } = category;

            // 找到对应id的category，修改分类名称
            if (_id === categoryId) {
              name = categoryName;
              return {
                _id,
                name,
                parentId
              }
            }
            // 没有修改的数据直接返回
            return category
          });

          // 清空表单项的值 隐藏对话框
          form.resetFields(['categoryName']);

          message.success('更新分类名称成功~', 2);

          this.setState({
            isShowUpdateCategoryName: false,
            [stateName]: categories
          });
        }
      }
    })
  };

  /**
   * 显示二级分类
   * @param category
   * @returns {Function}
   */



  showSubCategory = (category) => {
    return async () => {
      // 请求二级分类数据
      this.parentCategory = category;
      this.fetchCategories(category._id);
    }
  };

  /**
   * 返回一级分类
   */
  goBack = () => {
    this.setState({
      isShowSubCategories: false
    })
  };

  render() {
    const {
      categories,
      subCategories,
      isShowSubCategories,
      isShowAddCategory,
      isShowUpdateCategoryName,
      loading
    } = this.state;

    // 表头内容
    const columns = [
      {
        title: '品类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        // dataIndex: '_id',
        className: 'category-operation',
        // 改变当列的显示
        render: category => {
          // console.log(category);
          return <div>
            <MyButton onClick={this.saveCategory(category)}>修改名称</MyButton>
            {
              this.state.isShowSubCategories ? null : <MyButton onClick={this.showSubCategory(category)}>查看其子品类</MyButton>
            }
          </div>
        },
      },
    ];



    return <Card
      title={ isShowSubCategories ? <div><MyButton onClick={this.goBack}>一级分类</MyButton><Icon type="arrow-right"/>&nbsp;{this.parentCategory.name}</div> : "一级分类列表" }
      extra={<Button type="primary" onClick={this.toggleDisplay('isShowAddCategory', true)}><Icon type="plus" />添加品类</Button>}>
      <Table
        columns={columns}
        // isShowSubCategories为true,就展示二级
        dataSource={isShowSubCategories ? subCategories : categories}
        bordered
        pagination={{
          showSizeChanger: true,
          pageSizeOptions: ['3', '6', '9', '12'],
          defaultPageSize: 3,
          showQuickJumper: true
        }}
        rowKey="_id"
        loading={loading}
      />

      <Modal
        title="添加分类"
        visible={isShowAddCategory}
        onOk={this.addCategory}
        onCancel={this.toggleDisplay('isShowAddCategory', false)}
        okText="确认"
        cancelText="取消"
      >
        <AddCategoryForm categories={categories} wrappedComponentRef={(form) => this.addCategoryForm = form}/>
      </Modal>

      <Modal
        title="修改分类名称"
        visible={isShowUpdateCategoryName}
        onOk={this.updateCategoryName}
        onCancel={this.hideUpdateCategoryName}
        okText="确认"
        cancelText="取消"
        width={300}
      >
        <UpdateCategoryNameForm categoryName={this.category.name} wrappedComponentRef={(form) => this.updateCategoryNameForm = form}/>
      </Modal>

    </Card>;
  }
}