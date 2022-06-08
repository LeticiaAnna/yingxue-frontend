<template>
  <div>
    <div id="main" style="width: 800px;height:600px;"></div>
  </div>

</template>

<script>
import * as echarts from 'echarts';
import instance from "../../util/request";

export default {
  name: "UserEcharts",
  data(){
    return {
      userCount:{
        months:[],
        boyCount:[],
        girlCount:[]
      }
    }
  },
  mounted() {
    instance.get("/user/userCount")
      .then(response => {
        console.log(response.data.months,response.data.boyCount,response.data.girlCount);
        //this.userCount = response.data;
        this.userCount.months = response.data.months;
        this.userCount.boyCount = response.data.boyCount;
        this.userCount.girlCount = response.data.girlCount;
        if (response.data.status === 200){
          this.$message({
            message: response.data.message, //提示框提示的信息
            type: 'success',  //提示框颜色样式
          });
        }else {
          this.$message.error(response.data.message);
        }

        let myChart = echarts.init(document.getElementById('main'));

        let option = {
          title: {
            text: new Date().getFullYear() + '用户注册人数统计'
          },
          tooltip: {},
          legend:{
            data:['男','女']
          },
          xAxis: {
            data: this.userCount.months
          },
          yAxis: {},
          series: [
            {
              name: '男',
              type: 'bar',
              data: this.userCount.boyCount
            },
            {
              name: '女',
              type: 'bar',
              data: this.userCount.girlCount
            }
          ]
        }
        // 绘制图表
        myChart.setOption(option);
      });


  }
}
</script>

<style scoped>

</style>
