<template>

  <div >
    <h1 align="center"><strong>{{ msg }}</strong></h1>
    <div >


      <el-row>
        <el-col :span="10" :offset="6">

          <!--     表单渲染数据     -->
          <el-form ref="video" :rules="rules" :model="video" label-width="80px">

            <el-form-item label="标题" prop="title">
              <el-input v-model="video.title"></el-input>
            </el-form-item>

            <el-form-item label="描述" prop="description">
              <el-input v-model="video.description"></el-input>
            </el-form-item>

            <el-form-item label="用户ID" prop="userId">
              <el-input v-model="video.userId"></el-input>
            </el-form-item>

            <el-form-item label="视频" prop="headImg">
              <!--<el-input v-model="user.headImg"></el-input>-->

              <el-upload
                class="upload-demo"
                ref="upload"
                name="videoFile"
                :action="action"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <div slot="tip" class="el-upload__tip">只能上传mp4文件，且不超过100MB</div>
              </el-upload>
            </el-form-item>

            <el-form-item label="选择分类" prop="categoryId">
              <el-select v-model="video.categoryId" clearable placeholder="请选择分类">
                <el-option v-for="cate in categoryList" :key="cate.id" :label="cate.cateName" :value="cate.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="updateSubmits('video')">提交修改</el-button>
              <el-button @click="resetForm('video')" type="warning">重置</el-button>
              <router-link :to="{name:'ShowVideo'}" ><el-button type="danger">取消</el-button></router-link>
            </el-form-item>

          </el-form>

        </el-col>
      </el-row>
    </div>
  </div >


</template>

<script>

//import axios from 'axios'
import instance from '../../util/request'

export default {
  name: "UpdateVideo",
  data(){
    return {
      msg: "视频修改",
      video: {
        title: '',
        description: '',
        videoPath:'',
        categoryId:'',
        userId:''
      },
      action:'',
      fileList: [],
      categoryList: [
        {id: '1', cateName: 'java'},
        {id: '2', cateName: 'go'},
        {id: '3', cateName: 'python'},
        {id: '4', cateName: 'c++'},
        {id: '5', cateName: 'c#'}
      ],
      rules: {
        title: [
          {required: true, message: '请输入标题', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        description: [
          {required: true, message: '请输入描述', trigger: 'blur'},
          {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur'}
        ],
        userId: [
          {required: true, message: '请输入用户ID', trigger: 'blur'},
          {min: 1, max: 5, message: '长度在 1 到 5 个字符', trigger: 'blur'}
        ],
      }
    }
  },
  methods:{
    updateSubmits(){
      instance.post("/video/update",this.video).then((res)=>{
        if (res.data.status === 200){
          this.$message({
            message: res.data.message, //提示框提示的信息
            type: 'success',  //提示框颜色样式
          });
        }else {
          this.$message.error(res.data.message);
        }
        //切换到查所有组件
        this.$router.push({name:"ShowVideo"});
      });
    },
    uploadSuccess(response, file, fileList){
      console.log(response)
      /*console.log(file);
      console.log(response.message);*/
      //接收后台文件上传的文件名并赋值给表单文件属性
      if (response.status === 200){
        this.$message({
          message: response.message, //提示框提示的信息
          type: 'success',  //提示框颜色样式
        });
      }else {
        this.$message.error(response.message);
      }
      this.video.videoPath=response.fileName;
    },
    submitUpload() {   //点击文件上传触发
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {   //点击文件列表中已上传的文件时的钩子
      console.log(file, fileList);
    },
    handlePreview(file) {   //文件列表移除文件时的钩子
      console.log(file);
    }
  },
  created() {

    //获取用户修改的id
    let id = this.$route.params.id;
    console.log("修改的id"+id);

    //根据id查询用户信息
    instance.get("/video/queryById?id="+id).then((res)=>{
      this.video=res.data;
      this.action = "http://localhost:8989/yingxue/video/uploadVideo?oldVideo=" + this.video.videoPath.substring(this.video.videoPath.indexOf("yingxue/videos/video/"))
      console.log(this.action);
    });

    //查询类别
    instance.post("/category/queryByLevelsCategory?levels=2",).then((res)=>{

      //将查询到的一级类别赋值
      this.categoryList=res.data;
    });
  }
}

</script>


