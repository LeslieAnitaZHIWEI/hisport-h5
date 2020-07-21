<template>
  <div class="wrapper">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text=""
      @load="onLoad"
    >
      <div v-for="(item, index) in infoList" :key="index">
        <NoCircleCardInfo class="order-item" :info="item"></NoCircleCardInfo>
      </div>
    </van-list>

    <van-divider v-show="finished" />

    <NoDataComponent v-if="!pageLoading && infoList.length === 0" tip="还没有任何订单" />

  </div>
</template>
<script>
import NoCircleCardInfo from "@/views/components/NoCircleCardInfo";
import NoDataComponent from "@/views/components/noDataComponent";
import { getMyFormalLessonOrderPage } from "@/api/FormalLessonOrderController";
export default {
  components: {
    NoCircleCardInfo,
    NoDataComponent
  },
  created(){
  },
  data() {
    return {
      pageLoading: true,
      infoList:[],
      finished: false,
      loading: false,
      nextPageNumber: 1
    };
  },
  methods: {
    onLoad() {

      this.loading = false;
      getMyFormalLessonOrderPage({
        current: this.nextPageNumber,
      }).then((res) => {

        const {code , data} = res;
        if(code === 0 && data){
          this.infoList = this.infoList.concat(data.records);

          if(data.current >= data.total){
            this.finished = true;
          }else{
            this.nextPageNumber = this.nextPageNumber + 1;
          }
        }

        this.pageLoading = false;
        this.loading = false;
      });
    },
  }
};
</script>
<style lang="scss" scoped>
.wrapper {
  padding:10px 15px;
}
.order-item{
    margin-bottom: 15px;
}
</style>
