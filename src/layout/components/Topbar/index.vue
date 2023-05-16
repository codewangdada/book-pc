<template>
  <div class="topbar">
    <el-dropdown trigger="click" @command="handleCommand">
      <span class="dropdown-link">
        {{ userInfo.studentNumber
        }}<i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Topbar",
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
  },
  methods: {
    handleCommand() {
      this.$store.dispatch("user/logout").then(() => {
        this.$router.push({
          path: "/login",
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.topbar {
  height: 50px;
  background: #333;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 10px;
  .dropdown-link {
    color: #fff;
  }
}
</style>
