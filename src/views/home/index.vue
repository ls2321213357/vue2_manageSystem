<template>
  <el-row class="home" :gutter="20">
    <!-- 左半部分 -->
    <el-col :span="8" style="margin-top: 20px">
      <!-- 用户信息区域 -->
      <el-card shadow="hover">
        <div class="user">
          <img :src="userImg" />
          <div class="userinfo">
            <p class="name">大帅哥</p>
            <p class="access">超级管理员</p>
          </div>
        </div>
        <div class="login-info">
          <p>
            上次登录时间:
            <span>2022-9-8</span>
          </p>
          <p>
            上次登录地点:
            <span>河北唐山</span>
          </p>
        </div>
      </el-card>
      <!-- 用户信息区域完毕 -->

      <!-- 每日购买信息区域 -->
      <el-card shadow="hover" style="margin-top: 20px; height: 476px">
        <el-table :data="tableData">
          <el-table-column
            v-for="(value, index) in tableLable"
            :key="index"
            :prop="index"
            :label="value"
          ></el-table-column>
        </el-table>
      </el-card>
      <!-- 每日购买信息区域完毕 -->
    </el-col>
    <!-- 右半部分 -->
    <!-- 上边区域信息 -->
    <el-col :span="16">
      <div class="num">
        <el-card
          style="margin-top: 20px"
          shadow="hover"
          v-for="item in countData"
          :key="item.name"
          :body-style="{
            display: 'flex',
            padding: 0,
          }"
        >
          <i
            class="icon"
            :class="`el-icon-${item.icon}`"
            :style="{ background: item.color }"
          ></i>
          <div class="detail">
            <p class="num">￥{{ item.value }}</p>
            <p class="txt">{{ item.name }}</p>
          </div>
        </el-card>
      </div>
      <!-- 中间折线图部分 -->
      <el-card style="height: 280px" shadow="hover">
        <Echarts :chartsData="echartData.order" style="height: 280px" />
      </el-card>
      <!-- 底部部分 -->
      <div class="graph">
        <!-- 底部柱状图 -->
        <el-card style="height: 260px" shadow="hover">
          <Echarts :chartsData="echartData.user" style="height: 250px" />
        </el-card>
        <!-- 底部饼状图 -->
        <el-card style="height: 260px" shadow="hover">
          <Echarts
            :chartsData="echartData.video"
            :isAxisCharts="false"
            style="height: 250px"
          />
        </el-card>
      </div>
    </el-col>
  </el-row>
</template>

<script>
import { getDate } from '../../api/data';
import Echarts from '@/components/Echarts.vue';
export default {
  /* eslint-disable */
  name: 'Home',
  data() {
    return {
      userImg: require('@/assets/images/user.png'),
      tableData: [],
      tableLable: {
        name: '品牌',
        todayBuy: '日销量',
        monthBuy: '月销量',
        totalBuy: '总销量',
      },
      countData: [
        {
          name: '今日支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '今日收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '今日未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
        {
          name: '本月支付订单',
          value: 1234,
          icon: 'success',
          color: '#2ec7c9',
        },
        {
          name: '本月收藏订单',
          value: 210,
          icon: 'star-on',
          color: '#ffb980',
        },
        {
          name: '本月未支付订单',
          value: 1234,
          icon: 's-goods',
          color: '#5ab1ef',
        },
      ],
      //echart数据
      echartData: {
        order: {
          xData: [],
          series: [],
        },
        user: {
          xData: [],
          series: [],
        },
        video: {
          series: [],
        },
      },
    };
  },
  mounted() {
    getDate().then((res) => {
      const { code, data } = res.data;
      if (code === 20000) {
        this.tableData = data.tableData;
        const order = data.orderData;
        const xData = order.date;
        //获取order中的key值
        const keyArr = Object.keys(order.data[0]);
        //series是把数据到图形的映射
        const series = [];
        //进行强遍历,往series里面放数据

        //商品折线图
        keyArr.forEach((key) => {
          series.push({
            name: key,
            //遍历其中的每一项 ,并对其中的每一个值都进行返回
            data: order.data.map((item) => item[key]),
            //定义图像类型
            type: 'line',
          });
        });
        //传统写法
        // const option = {
        //   xAxis: {
        //     data: xData,
        //   },
        //   yAxis: {},
        //   //图例
        //   legend: {
        //     data: keyArr,
        //   },
        //   series,
        // };
        //初始化echarts
        // const lineEcharts = echarts.init(this.$refs.line);
        //对echarts进行绘制
        // lineEcharts.setOption(option);
        //------------------------------------------------------
        //组件写法
        //对echarts进行绘制
        this.echartData.order.xData = xData;
        this.echartData.order.series = series;

        //用户柱状图
        //传统写法
        // const userOption = {
        //   legend: {
        //     // 图例文字颜色
        //     textStyle: {
        //       color: '#333',
        //     },
        //   },
        //   grid: {
        //     left: '20%',
        //   },
        //   // 提示框
        //   tooltip: {
        //     trigger: 'axis',
        //   },
        //   xAxis: {
        //     type: 'category',
        //     data: data.userData.date,
        //     axisLine: {
        //       lineStyle: {
        //         color: '#17b3a3',
        //       },
        //     },
        //     axisLabel: {
        //       interval: 0,
        //       color: '#333',
        //     },
        //   },
        //   yAxis: [
        //     {
        //       type: 'value',
        //       axisLine: {
        //         lineStyle: {
        //           color: '#17b3a3',
        //         },
        //       },
        //     },
        //   ],
        //   color: ['#2ec7c9', '#b6a2de'],
        //   series: [
        //     {
        //       name: '新增用户',
        //       data: data.userData.map((item) => item.new),
        //       type: 'bar',
        //     },
        //     {
        //       name: '活跃用户',
        //       data: data.userData.map((item) => item.active),
        //       type: 'bar',
        //     },
        //   ],
        // };
        // const userEcharts = echarts.init(this.$refs.user);
        // userEcharts.setOption(userOption);
        //------------------------------------------------------
        //组件写法
        //对echarts进行绘制
        this.echartData.user.xData = data.userData.map((item) => item.new);
        this.echartData.user.series = [
          {
            name: '新增用户',
            data: data.userData.map((item) => item.new),
            type: 'bar',
          },
          {
            name: '活跃用户',
            data: data.userData.map((item) => item.active),
            type: 'bar',
          },
        ];

        //商品饼状图
        //传统写法
        // const videoOption = {
        //   tooltip: {
        //     trigger: 'item',
        //   },
        //   color: [
        //     '#0f78f4',
        //     '#dd536b',
        //     '#9462e5',
        //     '#a6a6a6',
        //     '#e1bb22',
        //     '#39c362',
        //     '#3ed1cf',
        //   ],
        //   series: [
        //     {
        //       type: 'pie',
        //       data: data.videoData,
        //       radius: '50%',
        //     },
        //   ],
        // };
        // const videoEcharts = echarts.init(this.$refs.video);
        // videoEcharts.setOption(videoOption);
        //------------------------------------------------------
        //组件写法
        //对echarts进行绘制
        this.echartData.video.series = [
          {
            type: 'pie',
            data: data.videoData,
            radius: '50%',
          },
        ];
      }
    });
  },
  components: { Echarts },
};
</script>
