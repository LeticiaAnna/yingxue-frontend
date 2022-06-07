<template>

  <div >
    <h1 align="center"><strong>{{ msg }}</strong></h1>
    <div >

      <el-row>
        <hr><br>

        <el-col :span="6" :offset="6" >
          <!-- 输入框 -->
          <el-input v-model="content"></el-input>
        </el-col>

        <el-col :span="10" :offset="1">
          <!-- 发送按钮 -->
          <el-button type="success" @click="searchUser()">开始检索</el-button>
        </el-col>

      </el-row>

      <br>
      <br>
      <!--   表单数据展示   -->
      <el-table border style="width: 100%" :row-class-name="tableRowClassName" :data="users">

        <!--    复选框列    -->
        <el-table-column type="selection" width="55"></el-table-column>
        <!--    数据列    -->
        <el-table-column prop="id" label="用户id" width="90" sortable></el-table-column>
        <el-table-column label="用户名" width="100">
          <template slot-scope="scope">
            <div v-html="scope.row.username"></div>
          </template>
        </el-table-column>
        <el-table-column prop="password" label="密码" width="120"></el-table-column>
        <el-table-column prop="headImg" label="头像" width="80">
          <template slot-scope="scope">
            <el-image :src="scope.row.headImg" style="height: 50px"></el-image>
          </template>
        </el-table-column>
        <el-table-column prop="phone" label="手机号" width="120"></el-table-column>
        <el-table-column label="签名" width="210">
          <template slot-scope="scope">
            <div v-html="scope.row.sign"></div>
          </template>
        </el-table-column>
        <el-table-column prop="score" label="学分" width="90" sortable></el-table-column>
        <el-table-column prop="status" label="状态" width="100">
          <template slot-scope="scope">
            <el-button type="warning" v-if="scope.row.status==0" @click="changeStatus(scope.row)" >冻结</el-button>
            <el-button type="success" v-else @click="changeStatus(scope.row)" >正常</el-button>
            <!--        {{aa(scope.row.status)+scope.$index}}-->
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="注册时间" sortable width="110"></el-table-column>

        <!--    操作列    -->
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="updateUser(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>

      </el-table><br>

    </div>
  </div >

</template>

<script>

import instance from '../../util/request'

export default {
  name: "SearchVideo",
  data(){
    return {
      msg: "用户检索",
      content:"",
      users:[],  //用户数据展示
    }
  },
  methods:{
    tableRowClassName({row, rowIndex}) {  //加载表格渲染斑马线样式
      if(rowIndex%2==0)return 'warning-row';
      if(rowIndex%2!=0)return 'success-row';
    },
    searchUser() {   //提交表单触发的方法

      /**1.获取输入框内容*/
      console.log(this.content);

      /**2.提交输入框*/
      instance.get("/user/searchUser?content="+this.content).then((res)=>{
        /**3.返回数据给表单数据赋值*/
        this.users=res.data;
        console.log(this.users)
      });
    },
    deleteUser(id){
      console.log(id)
      /**1.删除确认提示框*/
      if(window.confirm("您确定要删除该数据吗?")){
        /**2.发送请求删除数据*/
        instance.post("/user/delete",{"id":id}).then((res)=>{

          /**4.删除提示框*/
          if (res.data.status === 200){
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
    changeStatus(row){

      /**1.判断用户状态*/
      if(row.status=="1"){
        /**2.发送修改请求*/
        instance.post("/user/update",{"id":row.id,"status":"0"}).then((res)=>{
          console.log(res)

          /**4.修改提示框*/
          if (res.data.status === 200){
            this.$message({
              message: res.data.message, //提示框提示的信息
              type: 'success',  //提示框颜色样式
            });
          }else {
            this.$message.error(res.data.message);
          }

        });
      }else{
        /**2.发送修改请求*/
        instance.post("/user/update",{"id":row.id,"status":"1"}).then((res)=>{

          /**4.修改提示框*/
          if (res.data.status === 200){
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
    updateUser(id){  //修改数据的方法
      this.$router.push({name:"UpdateUser",params:{id:id}});
    }
  }
}

</script>
<style>

.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}

h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  /*display: inline-block;*/
  margin: 0 10px;
}
a {
  color: #42b983;
}
.aa{
  background-color: #ccaadd
}
.bb{
  background-color: aquamarine;
}
</style>
