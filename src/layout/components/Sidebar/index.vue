<template>
  <div>
    <div class="sidebar">
      <div v-for="item in menuList" class="sidebar-item" @click="goPath(item.path)" :class="{active: item.path === $route.path}">
        {{ item.name }}
        <i class="el-icon-arrow-right"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Sidebar",
  data() {
    return {};
  },
  computed: {
    ...mapState({
      menuList: (state) => state.user.menu,
    }),
  },
  methods: {
    goPath(path) {
      if(this.$route.path === path) {
        return
      }
      this.$router.push(path);
    },
  },
};
</script>
<style lang="scss" scoped>
.sidebar {
  width: 200px;
  border: 1px solid #eee;
  border-radius: 10px;
  margin: 0 50px 0 50px;

  .sidebar-item {
    display: flex;
    justify-content: space-between;
    padding: 10px;
    border-bottom: 1px solid #eee;
  }
  .sidebar-item:last-child {
    border-bottom: none;
  }
}
.active{
  color: #409EFF;
}
</style>
