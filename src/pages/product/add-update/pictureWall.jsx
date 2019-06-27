
// 照片的功能
import React, { Component } from 'react';
import { Upload, Icon, Modal,message } from 'antd';

import{ reqDeleteProductImg}  from '../../../api'

 export  default class PicturesWall extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
     fileList:this.props.imgs.map((img,index) =>{
       return {
         uid:-index,
         name:img,
         status:'done',
         url:`http://localhost:5000/upload/${img}`,
       }
     })

  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = async file => {

    this.setState({
      previewImage: file.url || file.preview,
      previewVisible: true,
    });
  };

  handleChange = async({ file,fileList }) => {
    if(file.status ==='uploading'){
      // 上传中
    }else if(file.status==='done'){
      // 上传成功~
    }else if(file.status ==='error'){
      message.error('上传图片失败！', 2);
    }else {
      // 发送请求，删除服务器的图片数据
      const id = this.props.id;
      const name=file.name;

      const result = await reqDeleteProductImg(name, id);

      if (result){
     message.success('删除成功')
      }
    }
    //无论做什么功能都要记得更新状态
    this.setState({fileList})
  }

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div className="clearfix">
        <Upload
          action="=/manage/img/upload"
          listType="picture-card"
          fileList={fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          //请求的参数，改了才会请求成功
          data={
            {
             id:this.props.id
            }}
          name="image"
        >
          {fileList.length >= 5 ? null : uploadButton}
        </Upload>


        <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={previewImage} />
        </Modal>
      </div>
    );
  }
}