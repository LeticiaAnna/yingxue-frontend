<template>

  <div >
    <h1 align="center"><strong>{{ msg }}</strong></h1>
    <div >


      <el-row>
        <el-col :span="10" :offset="6">

          <!--     表单渲染数据     -->
          <el-form ref="category" :rules="rules" :model="categorys" label-width="80px">

            <el-form-item label="类别名称" prop="username">
              <el-input v-model="categorys.cateName"></el-input>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="updateSubmits('category')">立即修改</el-button>
              <router-link :to="{name:'ShowCategory'}" ><el-button type="danger">取消</el-button></router-link>
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
  name: "UpdateCategory",
  data(){
    return {
      msg: "类别修改",
      categorys: {
        cateName: '',
        /*id: '',
        levels: '',
        parentId: '',*/
      },
      rules: {
        cateName: [
          {required: true, message: '请输入类别名', trigger: 'blur'},
          {min: 3, max: 50, message: '长度在 3 到 50 个字符', trigger: 'blur'}
        ]
      }
    }
  },
  methods:{
    updateSubmits(){
      instance.post("/category/update",this.categorys).then((res)=>{
        if (res.data.status === 200){
          this.$message({
            message: res.data.message, //提示框提示的信息
            type: 'success',  //提示框颜色样式
          });
        }else {
          this.$message.error(res.data.message);
        }

        //切换到查所有组件
        this.$router.push({name:"ShowCategory"});
      });
    }
  },
  created() {

    //获取用户修改的id
    let id = this.$route.params.id;
    console.log("修改的id"+id);

    //根据id查询用户信息
    instance.get("/category/queryById?id="+id).then((res)=>{
      //切换到查所有组件
      //this.$router.push({name:"/ShowEmp"});
      this.categorys=res.data;
    });
  }

}

</script>


