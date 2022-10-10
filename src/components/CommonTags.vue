<template>
  <div>
    <el-tag
      v-for="(tag, index) in tags"
      :key="tag.name"
      size="small"
      :closable="tag.name !== 'home'"
      :effect="$route.name === tag.name ? 'dark' : 'plain'"
      @click="changeMenu(tag)"
      @close="closeMenu(tag, index)"
    >
      {{ tag.label }}
    </el-tag>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
export default {
  name: 'CommonTags',
  computed: {
    ...mapState({
      tags: (state) => state.tab.tabsList,
    }),
  },
  methods: {
    ...mapMutations({
      close: 'closeTag',
    }),
    changeMenu(item) {
      this.$router.push({ name: item.name });
    },
    closeMenu(item, index) {
      const length = this.item - 1;
      this.close(item);
      //如果关闭的不是当前高亮的选项
      if (this.$router.name !== item.name) {
        return;
      }
      //如果关闭的是当前高亮的选项(此时在最后)
      if (length === index) {
        return this.$router.push({
          name: this.tags[index - 1].name,
        });
      }
      //如果关闭的是当前高亮的选项(此时在中间)
      else {
        return this.$router.push({
          name: this.tags[index].name,
        });
      }
    },
  },
};
</script>

<style>
.el-tag {
  margin-right: 10px;
}
</style>
