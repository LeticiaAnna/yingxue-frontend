<template>
  <div align="center">
    <template>
      <el-carousel indicator-position="outside">
        <el-carousel-item v-for="photo in photos" :key="photo">
          <el-image style="height: 100%" :src="photo" fit="fill"></el-image>
        </el-carousel-item>
      </el-carousel>
    </template>
  </div>
</template>

<script>

import img1 from '../../assets/1.jpeg';
import img2 from '../../assets/2.jpeg';
import img3 from '../../assets/3.jpeg';
import img4 from '../../assets/4.jpeg';
import img5 from '../../assets/5.jpeg';
import img6 from '../../assets/6.jpeg';
import img7 from '../../assets/7.jpeg';
import img8 from '../../assets/8.jpeg';

export default {
  name: "MainView",
  data(){
    return{
      photos:[img1,img2,img3,img4,img5,img6,img7,img8]
    }
  }
}
</script>

<style >
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__container{
  height: 600px;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}
</style>
