<template>
  <div class="navbar">
    <div style="margin-right: 10px;" @click="$router.push('/home')">首页</div>|<div style="margin-left: 10px;" @click="$router.go(-1)">返回</div>
  </div>
</template>

<script>
export default {
  name: "Navbar",
};
</script>

<style lang="scss" scoped>
.navbar {
  display: flex;
  align-items: center;
  color: #333;
  font-size: 14px;
  height: 40px;
}
</style>
