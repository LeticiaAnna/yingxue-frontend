<template>

  <div >
    <h1 align="center"><strong>{{ msg }}</strong></h1>
    <div >


      <el-row>
        <el-col :span="10" :offset="6">

          <!--     表单渲染数据     -->
          <el-form ref="user" :rules="rules" :model="user" label-width="80px">

            <el-form-item label="用户名" prop="username">
              <el-input v-model="user.username"></el-input>
            </el-form-item>

            <el-form-item label="密码" prop="password">
              <el-input v-model="user.password"></el-input>
            </el-form-item>

            <el-form-item label="签名" prop="sign">
              <el-input v-model="user.sign"></el-input>
            </el-form-item>

            <el-form-item label="手机号" prop="phone">
              <el-input v-model="user.phone"></el-input>
            </el-form-item>

            <el-form-item label="头像" prop="headImg">
              <!--<el-input v-model="user.headImg"></el-input>-->

              <el-upload
                v-model="user.headImg"
                class="upload-demo"
                ref="upload"
                name="headImg"
                :action="action"
                :on-preview="handlePreview"
                :on-remove="handleRemove"
                :on-success="uploadSuccess"
                :file-list="fileList"
                :auto-upload="false">
                <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
                <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
                <el-button size="small" type="danger" @click="deleteHead">删除头像</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
            </el-form-item>

            <el-form-item label="状态" prop="status">
              <el-radio-group v-model="user.status" >
                <el-radio label="1" border >正常</el-radio>
                <el-radio label="0" border >冻结</el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="性别" prop="sex">
              <el-radio-group v-model="user.sex" >
                <el-radio label="男" border ></el-radio>
                <el-radio label="女" border ></el-radio>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="创建时间" prop="createTime">
              <el-date-picker value-format="yyyy-MM-dd HH:mm:ss" v-model="user.createTime" align="right" type="datetime" placeholder="选择日期" :picker-options="pickerOptions"></el-date-picker>
            </el-form-item>

            <el-form-item label="城市" prop="city">
              <el-select v-model="user.city" clearable placeholder="请选择城市">
                <el-option v-for="city in citys" :key="city.value" :label="city.name" :value="city.value"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="updateSubmits('user')">更新账户</el-button>
              <el-button @click="resetForm('user')" type="warning">重置</el-button>
              <router-link :to="{name:'ShowUser'}" ><el-button type="danger">取消</el-button></router-link>
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
  name: "UpdateUser",
  data(){
    return {
      msg: "用户修改",
      user: {
        username: '',
        password:"",
        sign: '',
        headImg: '',
        phone: '',
        status: '1',
        createTime:'',
        sex: '',
        city: ''
      },
      action:'',
      fileList: [
        /*{
          name: 'food.jpeg',
          url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100'
        }*/
      ],
      citys: [
        {value: '北京', name: '北京'},
        {value: '天津', name: '天津'},
        {value: '上海', name: '上海'},
        {value: '南京', name: '南京'},
        {value: '洛阳', name: '洛阳'}
      ],
      pickerOptions: {
        disabledDate(time) {
          //console.log(time)
          return time.getTime() > Date.now();
        },
        shortcuts: [{
          text: '今天',
          onClick(picker) {
            picker.$emit('pick', new Date());
          }
        }, {
          text: '昨天',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24);
            picker.$emit('pick', date);
          }
        }, {
          text: '一周前',
          onClick(picker) {
            const date = new Date();
            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', date);
          }
        }]
      },
      rules: {
        username: [
          {required: true, message: '请输入用户名', trigger: 'blur'},
          {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', trigger: 'blur'},
          {min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur'}
        ],
        sign: [
          {required: true, message: '请输入签名', trigger: 'blur'}
        ],
        phone: [
          {required: true, message: '请输入手机号', trigger: 'blur'}
        ],
        /*headImg: [
          {required: true, message: '请选择头像', trigger: 'change'}
        ],*/
        status: [
          {required: true, message: '请输入状态', trigger: 'change'}
        ],
        sex: [
          { required: true, message: '请选择性别', trigger: 'change' }
        ],
        createTime: [
          {required: true, message: '请选择日期', trigger: 'blur'}
        ],
        city: [
          {required: true, message: '请选择城市', trigger: 'change'}
        ]
      }
    }
  },
  methods:{
    updateSubmits(){
      instance.post("/user/update",this.user).then((res)=>{
        if (res.data.status === 200){
          this.$message({
            message: res.data.message, //提示框提示的信息
            type: 'success',  //提示框颜色样式
          });
        }else {
          this.$message.error(res.data.message);
        }
        //切换到查所有组件
        this.$router.push({name:"ShowUser"});
      });
    },
    uploadSuccess(response, file, fileList){
      console.log(response);
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
      this.user.headImg=response.fileName;
    },
    submitUpload() {   //点击文件上传触发
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {   //文件列表移除文件时的钩子
      console.log(file, fileList);
    },
    handlePreview(file) {   //点击文件列表中已上传的文件时的钩子
      console.log(file);
    },
    deleteHead(){
      instance.post("/user/deleteHead?oldHeadImg=" + this.user.headImg.substring(this.user.headImg.indexOf("yingxue/images/head/"))).then((res)=>{
        if (res.data.status === 200){
          this.user.headImg = "";
          this.$message({
            message: res.data.message, //提示框提示的信息
            type: 'success',  //提示框颜色样式
          });
        }else {
          this.$message.error(res.data.message);
        }
      });
    }
  },
  created() {

    //获取用户修改的id
    let id = this.$route.params.id;
    console.log("修改的id"+id);

    //根据id查询用户信息
    instance.get("/user/queryById?id="+id).then((res)=>{
      //切换到查所有组件
      //this.$router.push({name:"/ShowEmp"});
      this.user=res.data;
      this.action = "http://localhost:8989/yingxue/user/uploadHeadImg?oldHeadImg=" + this.user.headImg.substring(this.user.headImg.indexOf("yingxue/images/head/"))
      console.log(this.action);
    }).catch(err => {
      this.$message.error(err.response.data.message);
    })
  }

}

</script>


