<template>
  <div class="login-container">
    <el-form :model="admin" :rules="checkForm" status-icon ref="admin" label-position="left" label-width="0px" class="demo-ruleForm login-page">

      <h3 class="title">系统登录</h3>

      <el-form-item prop="username">
        <el-input type="text" v-model="admin.username" auto-complete="off" placeholder="用户名" ></el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input type="password" v-model="admin.password" auto-complete="off" placeholder="密码" ></el-input>
      </el-form-item>

      <el-form-item prop="enCode">
        <el-row>
          <el-col :span="12">
            <el-input type="text" v-model="admin.enCode" auto-complete="off" placeholder="验证码" ></el-input>
          </el-col>
          <el-col :span="10" :offset="2">
            <el-image @click="switchImg" :src="imgCode" fit="fill"></el-image>
          </el-col>
        </el-row>

      </el-form-item>

      <h3 style="color: red" hidden>{{loginMsg}}</h3>

      <el-form-item style="width:100%;">
        <el-button type="primary" style="width:100%;" @click="submitLogin" :loading="logining">登录</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>

import instance from "../../util/request";

export default {
  data(){
    return {
      logining: false,
      imgCode:"",  //验证码路径
      token:"",
      loginMsg:"",
      admin: {
        username: "smart_cattt",
        password: "peiqi1314",
        enCode:"",
      },
      checkForm: {
        username: [
          {required: true, message: '请正确填写用户名', trigger: 'blur'},
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' }
        ],
        password: [
          {required: true, message: '请正确填写密码', trigger: 'blur'},
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        enCode: [
          {required: true, message: '请正确填写验证码', trigger: 'blur'},
          { min: 4, max: 4, message: '长度在 4 个字符', trigger: 'blur' }
        ]
      },
      checked: false
    }
  },
  methods: {
    submitLogin(event){

      //表单验证
      this.$refs.admin.validate((valid) => {
        if(valid){

          //发送登陆请求
          instance.post("/admin/login?token="+this.token, this.admin)
            .then((res)=>{

                if(res.data.state==="success"){
                  this.$message({
                    message: this.admin.username + " 登录成功",
                    type: 'success'
                  });

                  //存储用户标记
                  localStorage.setItem("token",res.data.message);

                  //登录成功路由切换至首页
                  this.$router.push({name:"MainView"});
                }else{
                  //登录失败展示错误信息
                  this.loginMsg=res.data.message;
                  this.$message.error(res.data.message);
                  this.admin.password = "";
                  this.admin.enCode = "";
                  this.switchImg();
                  this.logining=false;
                }
              }
            );
        }else{
          console.log('error submit!');
          return false;
        }
      })
    },
    switchImg(){  //点击切换验证码方法
      //调用获取验证码方法获取验证码
      instance.post("/admin/getImageCodes",{
        d:new Date().getTime()
      })
        .then((res)=>{
			this.token = res.data.token;
            this.imgCode=res.data.imgCode
          }
        );
    }
  },
  created() {
    let token = localStorage.getItem("token");

    //判断用户是否有登录标记
    if(token != null){
      instance.get("/admin/getUserInfo")
        .then(res=>{
          this.$router.push({name: 'MainView'});
        })
        .catch(err => {
          this.$router.push({name: 'Login'});
        });

    }

    //调用获取验证码方法获取验证码
    instance.post("/admin/getImageCodes",{
      d:new Date().getTime()
    })
      .then((res)=>{

          //存储用户标记
          this.token = res.data.token;

          //获取验证码并赋值
          this.imgCode = res.data.imgCode
        }
      );
  },
  computed:{}
};
</script>

<style scoped>
.login-container {
  width: 100%;
  height: 100%;

}
.login-page {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  margin: 180px auto;
  width: 350px;
  padding: 35px 35px 15px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
label.el-checkbox.rememberme {
  margin: 0px 0px 15px;
  text-align: left;
}
</style>
