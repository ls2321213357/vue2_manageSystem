<template>
  <div>
    <h1>这是页面一</h1>
    <div class="test">
      <el-time-picker
        is-range
        v-model="value1"
        :picker-options="{
          selectableRange: '00:00:00 - 23:59:59',
        }"
        range-separator="至"
        start-placeholder="开始时间"
        end-placeholder="结束时间"
        placeholder="选择时间范围"
        @change="change"
        value-format="HH:mm:ss"
      ></el-time-picker>
      <i class="el-icon-plus" @click="click"></i>

      <div v-for="(item, index) in timeData" :key="index">
        <el-time-picker
          style="margin-top: 10px"
          is-range
          :picker-options="{
            selectableRange: '00:00:00 - 23:59:59',
          }"
          v-model="item.time"
          range-separator="至"
          start-placeholder="开始时间"
          end-placeholder="结束时间"
          @change="change1"
          value-format="HH:mm:ss"
          placeholder="选择时间范围"
        ></el-time-picker>
        <i class="el-icon-close" @click="delete1(index)"></i>
      </div>
    </div>
    <el-button type="primary" @click="saveHandler">保存</el-button>
  </div>
</template>

<script>
export default {
  name: 'PageOne',
  data() {
    return {
      value1: '',
      timeData: [],
      allTime: [],
    };
  },
  watch: {
    dataList(newVal) {
      console.log('新的', newVal);
    },
  },
  methods: {
    change(val) {
      this.value1 = val;
      console.log(this.value1);
    },
    change1(value) {
      console.log(value);
      this.allTime.push(value);
      // console.log(this.allTime, 'this.add');
    },
    click() {
      this.timeData.push([new Date(), new Date()]);
    },
    delete1(index) {
      console.log(index);
      this.timeData.splice(index, 1);
      this.allTime.splice(index, 1);
      console.log(this.allTime, 'this.del');
    },
    saveHandler() {
      console.log(this.allTime);
    },
  },
};
</script>

<style>
.test {
  margin-top: 100px;
  margin-left: 200px;
}
.el-range-separator {
  width: 10% !important;
}
</style>
