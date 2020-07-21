<template>
  <div class="app-wrapper">

    <van-nav-bar
      :title="title"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="onBack"
    />
    <app-main />
  </div>
</template>

<script>
import AppMain from "./components/AppMain";

export default {
  name: "Layout",
  components: {
    AppMain
  },
  data() {
    return {

    }
  },
  computed: {
    title() {
      return this.$route.meta.title || '';
    },
  },
  methods: {
    onBack() {
      history.back();
    }
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/variables.scss";

.app-wrapper {
  @include clearfix;
  position: relative;
  height: 100%;
  width: 100%;
  &.mobile.openSidebar {
    position: fixed;
    top: 0;
  }
}
.drawer-bg {
  background: #000;
  opacity: 0.3;
  width: 100%;
  top: 0;
  height: 100%;
  position: absolute;
  z-index: 999;
}

.fixed-header {
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9;
  width: calc(100% - #{$sideBarWidth});
  transition: width 0.28s;
}

.hideSidebar .fixed-header {
  width: calc(100% - 54px);
}

.mobile .fixed-header {
  width: 100%;
}
</style>
