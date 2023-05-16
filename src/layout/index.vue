<template>
  <div class="warp">
    <topbar />
    <div class="main">
      <sidebar />
      <div class="right-content">
        <navbar v-if="$route.path !=='/home'" />
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import { Sidebar, Topbar, Navbar } from "./components";
export default {
  name: "Layout",
  components: {
    Sidebar,
    Topbar,
    Navbar,
  }
};
</script>

<style lang="scss" scoped>
.main {
  display: flex;
  margin-top: 50px;
  height: calc(100% - 100px);
  .right-content {
    width: 100%;
  }
}
.warp {
  height: 100%;
}
</style>
