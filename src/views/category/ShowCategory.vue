<template>

  <div >
    <h1 align="center"><strong>{{ msg }}</strong></h1>
    <div ><br>
      <div class="service-center">

        <!--       添加类别  父表格       -->
        <router-link :to="{name:'AddCategory'}"  ><el-button type="primary">添加一级类别</el-button></router-link>
        <router-link :to="{name:'AddCategory',params:{status:2}}"  ><el-button type="success">添加二级类别</el-button></router-link><br><br>

        <!--    父表格  开始    -->
        <el-table border :data="oneCategorys" @expand-change="expandChange" style="width: 100%" >
          <el-table-column type="expand">
            <template slot-scope="scope">

              <!--    子表格  开始    -->
              <el-table border :data="twoCategorys" style="width: calc(100% - 47px)" class="two-list">
                <el-table-column prop="id" label="ID"></el-table-column>
                <el-table-column prop="cateName" label="名字"></el-table-column>
                <el-table-column prop="levels" label="级别"></el-table-column>
                <el-table-column prop="parentId" label="上级别id"></el-table-column>
                <el-table-column prop="cat_id" label="操作">
                  <template slot-scope="scope">
                    <el-button size="mini" type="warning" @click="twoUpdateCategory(scope.row.id)">修改</el-button>
                    <el-button size="mini" type="danger" @click="twoDeleteCategory(scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <!--    子表格  结束    -->

              <!--   子表格 配置分页工具栏   -->
              <div class="block" align="center">
                <el-pagination
                  style="margin: 15px 0px"
                  background
                  :page-sizes="twoPageSizes"
                  :page-size="twoPageSize"
                  :current-page="twoPage"
                  prev-text="上一页"
                  next-text="下一页"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="twoTotal"
                  @size-change="twoPageSizeChange"
                  @current-change="twoCurrentChange"
                >
                </el-pagination>
              </div>
              <!--   子表格 配置分页工具栏   -->
            </template>
          </el-table-column>

          <!--    数据列 父表格   -->
          <el-table-column prop="id" label="ID" width="180" sortable></el-table-column>
          <el-table-column prop="cateName" label="名字"></el-table-column>
          <el-table-column prop="levels" label="级别"></el-table-column>
<!--          <el-table-column prop="parentId" label="上级别id" sortable></el-table-column>-->
          <el-table-column prop="cat_id" label="操作">
            <template slot-scope="scope">
              <el-button size="mini" type="warning" @click="oneUpdateCategory(scope.row.id)">修改</el-button>
              <el-button size="mini" type="danger" @click="oneDeleteCategory(scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!--    父表格  结束    -->

        <!--   父表格 配置分页工具栏   -->
        <div class="block" align="center">
          <el-pagination
            style="margin: 15px 0px"
            background
            :page-sizes="onePageSizes"
            :page-size="onePageSize"
            :current-page="onePage"
            prev-text="上一页"
            next-text="下一页"
            layout="total, sizes, prev, pager, next, jumper"
            :total="oneTotal"
            @size-change="onePageSizeChange"
            @current-change="oneCurrentChange"
          >
          </el-pagination>
        </div>
      </div>

    </div>
  </div >

</template>

<script>

//import axios from 'axios'
import instance from '../../util/request'  //导入asiox 的实例

export default {
  name: "ShowCategory",
  data(){  //数据
    return {
      msg:"类别管理",
      oneCategorys:[],  //用户数据展示
      onePage:1,  //指定当前页
      oneTotal:0, //指定总条数
      onePageSizes:[2,3,5,10,15,20],  //配置每页展示数据数选项
      onePageSize:2,   //选择每页展示条数  必须在pageSizes中
      //search:"",  //搜索数据

      twoCategorys:[],  //用户数据展示
      twoPage:1,  //指定当前页
      twoTotal:0, //指定总条数
      twoPageSizes:[2,3,5,10,15,20],  //配置每页展示数据数选项
      twoPageSize:3,   //选择每页展示条数  必须在pageSizes中
      oneCategoryId:"",
    }
  },
  created() {  //初始化页面触发函数

    //查询所有数据
    this.oneQueryCategory(this.onePage,this.onePageSize);


  },
  methods:{  //自定函数
    tableRowClassName({row, rowIndex}) {  //加载表格渲染斑马线样式
      if(rowIndex%2==0)return 'warning-row';
      if(rowIndex%2!=0)return 'success-row';
    },
    onePageSizeChange(size) {  //修改每页展示条数触发  参数：每页条数
      console.log(`每页 ${size} 条` );
      //查询所有数据
      this.oneQueryCategory(1,size);
      //从新为每页展示条数赋值
      this.onePageSize=size;
    },
    oneCurrentChange(page) {  //修改当前页触发  参数：当前页
      console.log(`修改----当前页: ${page}`);
      console.log(`修改----每页展示条数: ${this.onePageSize}`);
      //查询所有数据
      this.oneQueryCategory(page,this.onePageSize);
    },
    oneQueryCategory(onePage,onePageSize){
      //查询所有数据的方法
      instance.post("/category/queryOnePage?page="+onePage+"&pageSize="+onePageSize).then((res)=>{

        //数据赋值
        this.oneCategorys=res.data.rows;
        this.onePage=res.data.page;
        this.oneTotal=res.data.total;


        //console.log(res);
      })
    },
    oneDeleteCategory(row){

      console.log("删除id："+row.id);

      /**1.删除确认提示框*/
      if(window.confirm("您确定要删除该数据吗?")){
        /**2.发送请求删除数据*/
        instance.post("/category/delete",{"id":row.id}).then((res)=>{

          /**3.查询所有数据*/
          this.oneQueryCategory(1,this.onePageSize);

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
    oneUpdateCategory(id){  //修改数据的方法
      this.$router.push({name:"UpdateCategory",params:{id:id}});

      //console.log("修改id："+id);
    },
    twoPageSizeChange(size) {  //修改每页展示条数触发  参数：每页条数
      console.log(`每页 ${size} 条` );
      //查询所有数据
      this.twoQueryCategory(1,size,this.oneCategoryId);
      //从新为每页展示条数赋值
      this.twoPageSize=size;
    },
    twoCurrentChange(page) {  //修改当前页触发  参数：当前页
      console.log(`修改----当前页: ${page}`);
      console.log(`修改----每页展示条数: ${this.twoPageSize}`);
      //查询所有数据
      this.twoQueryCategory(page,this.twoPageSize,this.oneCategoryId);
    },
    twoQueryCategory(twoPage,twoPageSize,categoryId){
      //查询所有数据的方法
      instance.post("/category/queryTwoPage?page="+twoPage+"&pageSize="+twoPageSize+"&categoryId="+categoryId).then((res)=>{

        //数据赋值
        this.twoCategorys=res.data.rows;
        this.twoPage=res.data.page;
        this.twoTotal=res.data.total;
        //保存一级类别id
        this.oneCategoryId=categoryId;
      });
    },
    twoDeleteCategory(row){

      console.log("二级类别删除id："+row.id);

      /**1.删除确认提示框*/
      if(window.confirm("您确定要删除该数据吗?")){
        /**2.发送请求删除数据*/
        instance.post("/category/delete",{"id":row.id,"parentId":row.parentId}).then((res)=>{
          /**3.查询所有数据*/
          //this.twoQueryCategory(1,this.twoPageSize);
          this.oneQueryCategory(1,this.onePageSize);

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
    twoUpdateCategory(id){  //修改数据的方法
      this.$router.push({name:"UpdateCategory",params:{id:id}});

      //console.log("修改id："+id);
    },
    expandChange(row){  //点击展开子表格触发的方法

      //console.log("子表格修改id："+row.id);
      //查询所有数据
      this.twoQueryCategory(this.twoPage,this.twoPageSize,row.id);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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


