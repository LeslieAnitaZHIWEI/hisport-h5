<template>
  <div>
    <van-nav-bar v-if="isPC" :title="title"></van-nav-bar>
    <slot></slot>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {isPC} from '@/utils/index'

export default {
  created() {
  },
  data() {
    return {
      isPC,
      title: this.$route.meta.title,
    };
  },
  computed: {},
  methods: {
    goBack(){
      if(this.$route.name=='lessons'){
        this.$router.push('/')
      }else{
        this.$router.go(-1)

      }
    }
  }
};
</script>

<style lang="scss" scoped>
.headWrap {
  padding-top: 40px;
}
.head {
  height: 40px;
  width: 100%;
  position: fixed;
  padding: 10px;
  top: 0;
  text-align: center;
  font-weight: 700;
}
.iButton {
  position: absolute;
  left: 0px;
  top: 0;
  font-size: 20px;
  padding: 10px;
  i {
    font-weight: 700;
  }
}
</style>
