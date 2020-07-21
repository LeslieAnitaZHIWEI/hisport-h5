<template>
  <div>
    <div class="no-data">
      <img src="../../assets/no-data.png" alt="暂无数据" />
      <p>{{ tip }}</p>
    </div>
  </div>
</template>
<script>
export default {
  name: "NoData",
  props: {
    tip: {
      type: String,
      default: '暂无数据'
    }
  },
  methods: {
  }
};
</script>
<style lang="scss" scope>
.no-data{
  padding: 30px 0;
  text-align: center;

  img{
    width: 45%;
    height: auto;
  }

  p{
    color:#94DAD3;
    font-size: 14px;
  }
}
</style>
