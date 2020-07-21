<template>
  <van-tabbar class="site-tabbar" v-model="active" active-color="#443c48" inactive-color="#c3c6cd" @change="onChange">
    <van-tabbar-item name="dashboard">课程
      <template #icon="props">
        <svg-icon icon-class="course" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item name="training">训练
      <template #icon="props">
        <svg-icon icon-class="training" />
      </template>
    </van-tabbar-item>

    <van-tabbar-item class="my-item" name="my">我的
      <template #icon="props">
        <svg-icon icon-class="user" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import TrainingSvg from '@/icons/svg/training.svg';

export default {
  name: "BottomNavBar",
  components: {
  },
  props: {
    index: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      active: this.index
    }
  },
  computed: {
  },
  methods: {
    onChange(index) {
      let path = '';
      switch (index) {
        case 'dashboard':
          path = '/dashboard'
          break;
        case 'training':
          path = '/training'
          break;
        case 'my':
          path = '/personalSetting';
          break;
        default:
          break;
      }

      if (path !== '') {
        this.$router.push({ path });
      }

    },
  }
};
</script>

<style lang="scss" scoped>

</style>
