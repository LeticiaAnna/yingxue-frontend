<template>
  <div>
    <el-container>
      <el-header style="text-align: right; font-size: 14px">
        <el-row>
          <el-col :span="6" :pull="2" >
              <strong style="margin-right: 800px;" ><span style="font:20px Extra large">应学视频APP后台管理系统统</span></strong>
          </el-col>
          <el-col :span="4" :offset="14">
              <span><span style="font:20px Extra large">{{ admin.username }}</span></span>
              <el-dropdown>
                <i class="el-icon-setting" style="margin-right: 15px"></i>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item v-if="admin.username!=='游客'"><a href="javascript:" @click="logout">退出系统</a>
                  </el-dropdown-item>
                  <el-dropdown-item v-if="admin.username==='游客'"><a href="#/login">点我登录</a></el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
          </el-col>
        </el-row>
      </el-header>
      <el-container>


        <el-aside width="220px" align="center" >
          <el-menu :default-openeds="['1']" background-color="#545c64" text-color="pink" active-text-color="#ffd04b">

            <el-submenu index="1">
              <template slot="title"><i class="el-icon-s-home"></i>主页</template>
              <el-menu-item index="1-1">
                <router-link to="/mainView"><el-button type="success">回到主页</el-button></router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="2">
              <template slot="title"><i class="el-icon-user-solid" ></i>用户管理</template>
              <el-menu-item index="2-1">
                <router-link to="/showUser"><el-button type="success">用户信息</el-button></router-link>
              </el-menu-item>
              <el-menu-item index="2-2">
                <router-link to="/userCount" ><el-button type="warning">用户统计</el-button></router-link>
              </el-menu-item>
              <el-menu-item index="2-3">
                <router-link to="/userMap" ><el-button type="warning">用户分布</el-button></router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="3">
              <template slot="title"><i class="el-icon-ice-tea"></i>类别管理</template>
              <el-menu-item index="3-1">
                <router-link to="/category"><el-button type="warning">类别信息</el-button></router-link>
              </el-menu-item>
            </el-submenu>

            <el-submenu index="4">
              <template slot="title"><i class="el-icon-trophy"></i>视频管理</template>
              <el-menu-item index="4-1">
                <router-link to="/video"><el-button type="warning">视频管理</el-button></router-link>
              </el-menu-item>
              <el-menu-item index="4-2">
                <router-link to="/search"><el-button type="warning">视频搜索</el-button></router-link>
              </el-menu-item>
            </el-submenu>

            <!--
            <el-submenu index="5">
              <template slot="title"><i class="el-icon-video-camera-solid"></i>日志管理</template>
              <el-menu-item index="5-1">
                <router-link to="/log"><el-button type="warning">日志管理</el-button></router-link>
              </el-menu-item>
            </el-submenu>
            <el-submenu index="6">
              <template slot="title"><i class="el-icon-bicycle"></i>管理员管理</template>
              <el-menu-item index="6-1">
                <router-link to="/admin"><el-button type="warning">管理员管理</el-button></router-link>
              </el-menu-item>
            </el-submenu>


            <el-submenu index="7">
              <template slot="title"><i class="el-icon-ship"></i>反馈管理</template>
              <el-menu-item index="7-1">
                <router-link to="/feedback"><el-button type="warning">反馈管理</el-button></router-link>
              </el-menu-item>
            </el-submenu>
            -->

          </el-menu>
        </el-aside>
        <el-main>
          <!-- 中心内容 -->
          <router-view></router-view>
        </el-main>
      </el-container><br>
      <el-footer align="center">love@annna.cn</el-footer>
    </el-container>

  </div>
</template>

<script>

import instance from "../util/request";

export default {
  name: "Main",
  data() {
    return {
      admin:{},
      color: 'rgba(19, 206, 102, 0.8)'
    }
  },
  methods: {
    logout() {  //触发退出方法

      //向后台发起退出请求
      instance.post("/admin/logout")
        .then(res=>{
          //移除登录标记
          localStorage.removeItem("token");

          //给用户名重新赋值
          this.admin = {username:'游客'};
          this.$router.push({name: 'Login'});
        })
        .catch(err => {
          this.$message.error(err.response.data.message);
          let token = localStorage.getItem("token");

          //判断用户是否有登录标记
          if(token==null){
            this.admin = {username:"游客"}
            this.$router.push({name: 'Login'});
          }else{
            instance.get("/admin/getUserInfo")
              .then(res=>{
                this.admin=res.data
              })
              .catch(err => {
                this.$router.push({name: 'Login'});
              });
          }
        });
    },
    /*userInfo() {//获取登录用户信息
      getUser().then(res => {
        this.username = res.data.username;
      })
    }*/
  },
  created(){

    //强制登录
    if(localStorage.getItem("token") == null){
      this.admin = {username:"游客"}
      this.$router.push({name: 'Login'});
    }else{
      instance.get("/admin/getUserInfo")
        .then(res=>{
          this.admin = res.data
        })
        .catch(err => {
        this.$router.push({name: 'Login'});
      });
    }

    /*if (localStorage.getItem('token')) {
      this.userInfo();
    } else {
      this.$router.push({name: 'Login'});
    }*/
  }
}
</script>

<style scoped>
.el-header {
  background-color: paleturquoise;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: bisque;
}

.box {
  display: flex;
  height: 100vh;
}

</style>
