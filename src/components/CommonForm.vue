<template>
  <div>
    <el-form ref="form" label-width="100px" :model="localForm" :inline="inline">
      <el-form-item
        v-for="item in formLabel"
        :key="item.label"
        :label="item.label"
      >
        <el-input
          v-if="item.type === 'input'"
          :placeholder="'请输入' + item.label"
          v-model="localForm[item.model]"
        ></el-input>

        <el-switch
          v-if="item.type === 'switch'"
          v-model="localForm[item.model]"
        ></el-switch>

        <el-date-picker
          v-if="item.type === 'date'"
          value-format="yyyy-MM-dd"
          type="date"
          placeholder="请选择日期"
          v-model="localForm[item.model]"
        ></el-date-picker>

        <el-select
          v-if="item.type === 'select'"
          placeholder="请选择"
          v-model="localForm[item.model]"
        >
          <el-option
            v-for="item in item.opts"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <!-- 需要拓展时候就使用插槽 -->
      <el-form-item><slot></slot></el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    formLabel: Array,
    form: Object,
    inline: Boolean,
  },
  data() {
    return {
      //这个 prop 用来传递一个初始值；这个子组件接下来希望将其作为一个本地的 prop 数据来使用。
      //在这种情况下，最好定义一个本地的data prop 并将这个本地 prop 当作其初始值：
      localForm: this.form,
    };
  },
  name: 'CommonForm',
};
</script>
