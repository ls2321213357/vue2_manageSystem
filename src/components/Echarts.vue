<template>
  <div ref="echart"></div>
</template>

<script>
import * as echarts from 'echarts';
export default {
  /* eslint-disable */
  name: 'Echarts',
  data() {
    return {
      //折线图or柱状图数据
      axisOption: {
        // 图例文字颜色
        textStyle: {
          color: '#333',
        },
        grid: {
          left: '20%',
        },
        // 提示框
        tooltip: {
          trigger: 'axis',
        },
        xAxis: {
          type: 'category', // 类目轴
          data: [],
          axisLine: {
            lineStyle: {
              color: '#17b3a3',
            },
          },
          axisLabel: {
            interval: 0,
            color: '#333',
          },
        },
        yAxis: [
          {
            type: 'value',
            axisLine: {
              lineStyle: {
                color: '#17b3a3',
              },
            },
          },
        ],
        color: [
          '#2ec7c9',
          '#b6a2de',
          '#5ab1ef',
          '#ffb980',
          '#d87a80',
          '#8d98b3',
        ],
        series: [],
      },
      //饼状图数据
      normalOption: {
        tooltip: {
          trigger: 'item',
        },
        color: [
          '#0f78f4',
          '#dd536b',
          '#9462e5',
          '#a6a6a6',
          '#e1bb22',
          '#39c362',
          '#3ed1cf',
        ],
        series: [],
      },
      echart: null,
    };
  },
  props: {
    //判断echarts图表的类型
    isAxisCharts: {
      type: Boolean,
      default: true,
    },
    chartsData: {
      type: Object,
      default() {
        return {
          xData: [],
          series: [],
        };
      },
    },
  },
  watch: {
    chartsData: {
      handler() {
        //数据发生变化就调用函数重新绘制echarts
        this.initChart();
      },
      deep: true,
    },
  },
  methods: {
    //对echarts进行绘画渲染
    initChart() {
      this.initChartData();
      if (this.echart) {
        this.echart.setOption(this.options);
      } else {
        this.echart = echarts.init(this.$refs.echart);
        this.echart.setOption(this.options);
      }
    },
    initChartData() {
      if (this.isAxisCharts) {
        this.axisOption.xAxis.data = this.chartsData.xData;
        this.axisOption.series = this.chartsData.series;
      } else {
        this.normalOption.series = this.chartsData.series;
      }
    },
  },
  computed: {
    options() {
      //如果存在,就获取折线图数据,否则是柱状图数据
      return this.isAxisCharts ? this.axisOption : this.normalOption;
    },
  },
};
</script>

<style></style>
