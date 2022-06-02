<template>

  <div >
    <h1 align="center"><strong>{{ msg }}</strong></h1>
    <div >

      <el-row>
        <el-col :span="10" :offset="6">

          <!--     表单渲染数据     -->
          <el-form ref="category" :rules="rules" :model="categorys" label-width="80px">

            <el-form-item label="类别名" prop="cateName">
              <el-input v-model="categorys.cateName"></el-input>
            </el-form-item>

            <!--    选择一级类别        -->
            <el-form-item v-show="status" label="一级类别" prop="city">
              <el-select v-model="categorys.parentId" clearable placeholder="请选择一级类别">
                <el-option v-for="cate in categoryList" :key="cate.id" :label="cate.cateName" :value="cate.id"></el-option>
              </el-select>
            </el-form-item>

            <el-form-item>
              <el-button type="primary" @click="addSubmit('category')">立即创建</el-button>
              <el-button @click="resetForm('category')" type="warning">重置</el-button>
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
  name: "AddCategory",
  data(){
    return {
      msg: "类别添加",
      categorys: {
        //id: '',
        cateName: '',
        //levels: '',
        //parentId: '',
      },
      categoryList: [],
      rules: {
        cateName: [
          {required: true, message: '请输入类别名', trigger: 'blur'},
          {min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur'}
        ]
      },
      status:0 //根据状态判断是否展示一级类别
    }
  },
  created() {

    //获取状态判断通过状态判断添加页面是否展示一级类别下拉框
    this.status=this.$route.params.status;

    //状态不等于0说明从二级类别添加需要查询所有的一级类别
    if(this.status!=0){

      //添加数据
      instance.post("/category/queryByLevelsCategory?levels=1",).then((res)=>{

        //将查询到的一级类别赋值
        this.categoryList=res.data;
      });
    }

  },
  methods:{
    addSubmit(formName) {   //提交表单触发的方法

      //文件上传
      /*this.$refs.upload.submit();
      console.log("文件上传");
      console.log(this.user);*/

      this.$refs[formName].validate((valid) => {
        if (valid) {

          //添加数据
          instance.post("/category/add",this.categorys).then((res)=>{
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

        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {   //表单验证 重置表单
      this.$refs[formName].resetFields();
    }
  }
}

</script>


