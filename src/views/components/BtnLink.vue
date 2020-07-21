<template>
  <div>
    <van-button class="primary-btn" type="primary" @click="go">下一步</van-button>
  </div>
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
<style lang="scss" scope>
</style>
