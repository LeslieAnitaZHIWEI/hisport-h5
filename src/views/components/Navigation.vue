<template>
  <div>
    <!-- <el-radio-group class="nav" v-model="radio">
      <el-radio-button @click.native="goLesson" label="课程"></el-radio-button>
      <el-radio-button @click.native="goLesson" label="训练"></el-radio-button> -->
      <!-- <el-radio-button label="我的"></el-radio-button> -->
    <!-- </el-radio-group> -->
  </div>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  created() {
    console.log(this.$store.state.common.radio);
  },
  methods: {

    goLesson(e) {
      console.log(e);
      const {value}=e.target
      this.$store.commit("common/SET_Radio", value);
      switch (value) {
        case "训练":
          this.$router.push({ path: "/training" });
          return;
        case "课程":
          this.$router.push("/dashboard");
      }
    }
  },
  computed: {
    radio: {
      get() {
        return this.$store.state.common.radio;
      },
      set(val) {
        this.$store.commit("common/SET_Radio", val);
      }
    }
  }
};
</script>
<style lang="scss" scoped>
// /deep/.el-radio-button__orig-radio:checked{
//     background-color: #1BC2B1;
//     border-color: #1BC2B1;
// }
::v-deep {
  .el-radio-button__orig-radio:checked+.el-radio-button__inner{
    background: #1bc2b1;
  }
}
</style>
