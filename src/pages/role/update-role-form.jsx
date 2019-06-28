import React, {Component} from 'react';
import {Form, Input, Tree} from 'antd';
import menuList from '../../config/menu-config'
import PropTypes from 'prop-types';

  const Item = Form.Item;
  const { TreeNode } = Tree;

class UpdateRoleForm extends Component {
 // 约束
  static  propTypes ={
    name: PropTypes.string.isRequired
  }
  state = {
    checkedKeys: [],
  };

  onCheck = (checkedKeys) => {
    console.log('onCheck', checkedKeys);
    this.setState({ checkedKeys });
  };
  

  
  renderTreeNodes = data => data.map((item) => {
    if (item.children) {
      return (
        <TreeNode title={item.title} key={item.key} dataRef={item}>
          {
            this.renderTreeNodes(item.children)
          }
        </TreeNode>
      );
    }
    return <TreeNode {...item} />;
  });
  
  render () {
    const { getFieldDecorator } = this.props.form;
    
    return (
            <Form>
            <Item label='角色名称'>
            {
              getFieldDecorator(
                'name',
                {
                //
                // 功能:输入得名字和设置角色权限要一直
                initialValue: this.props.name
              }
            )(
              <Input placeholder='请输入角色名称' disabled/>
            )
          }
        </Item>
        <Item>
          <Tree
            checkable
            onCheck={this.onCheck}
            checkedKeys={this.state.checkedKeys}
            defaultExpandAll={true}
          >
            {this.renderTreeNodes(menuList)}
          </Tree>
        </Item>
      </Form>
    )
  }
}

export default Form.create()(UpdateRoleForm);