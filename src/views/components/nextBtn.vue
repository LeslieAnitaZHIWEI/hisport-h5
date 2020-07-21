<template>
  <van-button type="primary" block class="bottom-btn" @click="go">下一步</van-button>
</template>
<script>
export default {
  props: ["path"],
  methods: {
    go() {
      this.$router.push({
        path:this.path
      });
    }
  }
};
</script>
<style lang="scss">
</style>
