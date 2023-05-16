import store from "@/store";

export default {
  inserted(el, binding, vnode) {
    const { value } = binding;
    const permissions = store.state.user.role;

    if (value) {
      const hasPermissions = value === permissions;
      if (!hasPermissions) {
        el.parentNode && el.parentNode.removeChild(el);
      }
    } else {
      throw new Error(`请设置操作权限标签值`);
    }
  },
};
