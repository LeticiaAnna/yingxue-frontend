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
          <el-button type="success" @click="searchVideo()">开始检索</el-button>
        </el-col>

      </el-row>

      <br>
      <br>
      <!--   表单数据展示   -->
      <el-table border style="width: 100%" :row-class-name="tableRowClassName" :data="videos">
        <!--    数据列    -->
        <el-table-column prop="id" label="视频id"  width="200" ></el-table-column>

        <el-table-column label="标题" >
          <template slot-scope="scope">
            <div v-html="scope.row.title"></div>
          </template>
        </el-table-column>

        <el-table-column label="描述" >
          <template slot-scope="scope">
            <div v-html="scope.row.description"></div>
          </template>
        </el-table-column>

        <el-table-column prop="videoPath" label="视频"  width="350" >
          <template slot-scope="scope">
            <video :ref="'videoPlayer' + index" controls="controls" width="300" height="200px" :poster="scope.row.coverPath" >
              <source :src="scope.row.videoPath" type="video/mp4">您的浏览器不支持Video标签。
            </video>
          </template>
        </el-table-column>

        <el-table-column prop="createTime"  width="100" label="创建时间" ></el-table-column>

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
      msg: "视频检索",
      content:"",
      videos:[],  //用户数据展示
    }
  },
  methods:{
    tableRowClassName({row, rowIndex}) {  //加载表格渲染斑马线样式
      if(rowIndex%2==0)return 'warning-row';
      if(rowIndex%2!=0)return 'success-row';
    },
    searchVideo() {   //提交表单触发的方法

      /**1.获取输入框内容*/
      console.log(this.content);

      /**2.提交输入框*/
      instance.get("/video/searchVideo?content="+this.content).then((res)=>{
        /**3.返回数据给表单数据赋值*/
        this.videos=res.data;
      });
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
