import React, { Component } from 'react';
import {Form , Input, } from 'antd';
import PropTypes from 'prop-types'

class UpdateCategoryNameForm extends Component {
  static propTypes = {
    categoryName: PropTypes.string.isRequired
  };

  validator = (rule, value, callback) => {
    if (!value) {
      callback('请输入分类名称');
    } else if (value === this.props.categoryName) {
      callback('请不要输入之前名称~');
    } else {
      callback();
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return <Form>
      <Form.Item>
        {
          getFieldDecorator(
            'categoryName',
            {
              initialValue: this.props.categoryName,
              rules: [{
                validator: this.validator
              }]
            }
          )(
            <Input />
          )
        }
      </Form.Item>
    </Form>;
  }
}

export default Form.create()(UpdateCategoryNameForm);
//  class UpdateCategoryNameForm  extends Component {
// //
// //    validator=( rule, value ,callback) =>{
// //      if(!value){
// //        callback("请输入名称")
// //      }else if(value === this.props.categoryName){
// //        callback("不要重复该名称")
// //      }else {
// //        callback()
// //      }
// //
// //    }
// //
// //
// //   // 初始化的值就是 第一次的值
// //    static propTypes = {
// //      categoryName : PropTypes.string.isRequired
// //    }
// //
// //    state = {
// //      categoryName : this.props.categoryName
// //    }
// //    // 一点击就修改
// //    handleChange = (ev)=>{
// //    // this.props.form.setFieldsValue({categoryName :ev.target.value})
// //     this.setState({
// //       categoryName:ev.target.value
// //     })
// //  }
// //    // componentDidMount() {
// //    //   this.props.form.setFieldsValue({ categoryName:this.categoryName})
// //    // }
// //    componentWillReceiveProps(nextProps, nextContext) {
// //      this.setState({
// //        categoryName :nextProps.categoryName
// //      })
// //    }
// //
// //
// //
// //   render() {
// //      const {setFieldsValue } =this.props.form;
// //     return <Form>
// //         <Form.Item>
// //           {
// //          <Input value={ this.state.categoryName} onChange = {this.handleChange}/>
// //
// //       }
// //         </Form.Item>
// //    </Form>
// //   }
// // }
// // export default Form.create()(UpdateCategoryNameForm);