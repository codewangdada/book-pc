<template>
  <div>
    <div class="menu">
      <div
        v-for="item in menuList"
        class="menu-item"
        @click="goPath(item.path)"
      >
        <div class="item-title">{{ item.name }}</div>
        <div>
          <ul>
            <li v-for="c in item.content">
              {{ c }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "Home",
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
      this.$router.push(path);
    },
  },
};
</script>

<style lang="scss" scoped>
.menu {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  .menu-item {
    margin: 20px;
    box-sizing: border-box;
    width: 40%;
    border: 1px solid #eee;
    border-radius: 8px;
    .item-title {
      background: #eee;
      padding: 10px;
    }
  }
}
</style>
