import React, { Component } from 'react';
import { Card, Icon, Form , Input,Button ,Cascader,InputNumber} from'antd';
import draftToHtml from "draftjs-to-html";
import {convertToRaw} from "draft-js";

import { reqCategories ,reqAddProduct ,reqUpdateProduct} from "../../../api";
import RichTextEditor from './rich-text-editor'
import PicturesWall from './pictureWall';


import './index.less'

const { Item } = Form ;

class AddUpdate extends Component{
  state = {
   options:[ ]
  };

  richTextEditorRef = React.createRef();

  // 需求：修改一级分类
    getCategories  =async (parentId) =>{
      const result = await reqCategories(parentId);
      // 请求一级菜单的内荣
      if (result) {
        if(parentId==="0"){
          this.setState({
            options: result.map((item) => {
              return {
                value: item._id,
                label: item.name,
                isLeaf: false,
              }
            })
          })
        }else {
          // 如果是二级
          this.setState({
            options:this.state.options.map((item)=>{
                if(item.value ===parentId){
                  item.children =result.map((item)=>{
                    return {
                      value:item._id,
                      label:item.name

                    }
                  })
                }
                return item
            })
          })
        }

      }
    }
// 默认请求的一级分类
     async componentDidMount() {
        this.getCategories('0');

       const product = this.props.location.state;
       // 如果是一级分类：pCategoryId: 0  categoryId: 一级分类id
       // 如果是二级分类：pCategoryId:一级分类id  categoryId: 二级分类id

       let categoriesId = [];

       if (product) {
         // 如果bu是二级
         if(product.pCategoryId !=='0'){
           categoriesId.push (product.pCategoryId)
           // 请求二级数据
           this.getCategories(product.pCategoryId)
         }
         categoriesId.push(product.categoryId)

       }
       this.categoriesId  = categoriesId

     }


  // *加载二级数据
  // *
  // *
  loadData = async selectedOptions => {
    console.log(selectedOptions);//一级分类数据
    // 获取数组最后一项
    const targetOption = selectedOptions[selectedOptions.length - 1];
    console.log(targetOption)
   // 显示图标
    targetOption.loading = true;

    // 发送请求、请求二级分类数据
    const result = await reqCategories(targetOption.value);

    console.log(result);
    // 请求成功
    if (result) {
      targetOption.loading = false;

      // 将响应结果添加到childern去
      targetOption.children = result.map((item) => {

        return {
          label: item.name,
          value: item._id,
        }
      });

      this.setState({
        options: [...this.state.options],
      })
    }
  };

  addProduct = (e) =>{
    e.preventDefault()

    // 验证和收集方法
    this.props.form.validateFields(async(err,values)=>{
      if (!err) {
        const { editorState } = this.richTextEditorRef.current.state;
        const detail = draftToHtml(convertToRaw(editorState.getCurrentContent()));

        const { name, desc, price, categoriesId } = values;

        let pCategoryId = '0';
        let categoryId = ' ';

        if( categoriesId.length ===1){
          categoryId = categoriesId[0];

        }else {
          pCategoryId = categoriesId[0];
          categoryId = categoriesId[1];
        }
        let promise = null;
        // 通过product修改或更新
        const product = this.props.location.state;
        const options ={name, desc, price, categoryId, pCategoryId, detail}
        // 发送请求
        if( product){

          //更新修改
          options._id = product._id;
          promise = reqUpdateProduct(options)
        }else{
          //添加
          promise = reqAddProduct(options)

        }
        // 统一的等待
        const result = await  promise;
        // 统一的处理
        if(result) {
          // this.props.form.resetFields(name, desc, price,categoriesId)
          this.props.history.push ('/product/index');
        }
  }
    })
  }
  // 二级菜单返回一级
  goBack = ()=>{
    this.props.history.goBack()

  };



  render(){
    // 读取数据
    const { options } = this.state;
    const { getFieldDecorator } = this.props.form;
    // 产品的内容
    // 如果是添加产品，product是undefined，
    // 如果是修改产品，product是对象

    const product = this.props.location.state;


    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 2 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 9 },
      },
    };


    return <Card title ={
      <div ><Icon type ='arrow-left'  onClick={this.goBack} className="arrow-icon"/><span>添加商品</span></div>}>
      <Form {...formItemLayout}  onSubmit={this.addProduct}>
          <Item label='商品名称'>
            {
              getFieldDecorator(

                "name",{
                  rules:[{
                    required:true,message:"请输入商品"
                  }],
                  // 输入框有值，则修改，没有则添加
                  initialValue:product? product.name: '',

                }
              )(
                <Input placeholder= '请输入商品名称'/>
              )
            }

          </Item>
        <Item label='商品描述'>
          {
            getFieldDecorator (
              'desc',{
                rules:[{
                  required: true,message:"请输入商品描述"
                }],
                initialValue:product? product.desc: ''

              }
            )(
              <Input placeholder= '请输入商品描述'/>)
          }

        </Item>
        <Item label='选择分类' wrapperCol={{span:5}}>
          {
            getFieldDecorator(
              "categoriesId",{
                rules: [
                  {required: true, message: '请选择分类'}
                ],
                initialValue:this.categoriesId,

              }
            )(
              <Cascader
                options={options}
                loadData={this.loadData}
                changeOnSelect
              />
            )
          }

        </Item>
        <Item label='商品价格' >
          {getFieldDecorator(
            'price',{
              rules: [
                {required: true, message: '请输入商品价格'}
              ],
              initialValue:product? product.price:''

            }
          )(
            <InputNumber
              //格式化
              formatter={value =>`￥ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={value => value.replace(/￥\s?|(,*)/g, '')}
              className='input-number'
            />
          )}
        </Item>
       < Item label='商品图片'  >
         {/*组件upload*/}}
         {/*因为要修改，所以用到id*/}
          < PicturesWall imgs ={product?product.imgs:[] } id ={product?product.detail._id:''}/>


      </Item>
        <Item label='商品详情' wrapperCol={{span: 20}}  >
            < RichTextEditor ref={this.richTextEditorRef} detail ={product ?product.detail:""} />
        </Item>
        <Item >
         <Button type='primary' className='input-sm' htmlType='submit'>提交</Button>
        </Item>
      </Form>
    </Card>
  }
}
export default Form.create()(AddUpdate)


