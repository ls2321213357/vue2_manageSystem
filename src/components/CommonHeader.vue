<template>
  <header>
    <div class="l-context">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="changeAside"
      ></el-button>
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item
          v-for="tag in tags"
          :key="tag.path"
          :to="{ path: tag.path }"
        >
          {{ tag.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-context">
      <el-dropdown trigger="click" size="mini">
        <span>
          <img class="user" :src="userImg" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex';
export default {
  data() {
    return {
      userImg: require('../assets/images/user.png'),
    };
  },
  methods: {
    changeAside() {
      this.$store.commit('isCollapseChange');
    },
    logOut() {
      this.$store.commit('clearToken');
      this.$store.commit('clearMenu');
      this.$router.push('/login');
    },
  },
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
};
</script>

<style lang="less" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  .l-context {
    display: flex;
    align-items: center;
    .el-button {
      align-items: center;
      margin-right: 20px;
    }
  }
  .r-context {
    line-height: 100%;
    .user {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
}
</style>
