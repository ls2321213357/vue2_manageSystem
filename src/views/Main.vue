<template>
  <el-container>
    <!-- 左边侧边栏 -->
    <el-aside width="auto">
      <CommonAside></CommonAside>
    </el-aside>
    <!-- 顶部header区域 -->
    <el-container>
      <el-header>
        <CommonHeader></CommonHeader>
      </el-header>
      <!-- 主要内容区域 -->
      <el-main>
        <CommonTags />
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import CommonAside from '@/components/CommonAside.vue';
import CommonHeader from '@/components/CommonHeader.vue';
import CommonTags from '@/components/CommonTags.vue';

export default {
  /* eslint-disable */
  name: 'Home',
  components: { CommonAside, CommonHeader, CommonTags },
};
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
}
.el-header {
  padding-top: 0;
  background-color: #333;
  color: rgb(255, 255, 255);
  text-align: center;
  line-height: 60px;
}
</style>
