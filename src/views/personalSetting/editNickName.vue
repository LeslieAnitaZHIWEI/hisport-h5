<template>
  <div>
    <van-field
      class="nickname"
      v-model="value"
      placeholder="请输入昵称"
      :border="false"
    />

    <div class="primary-btn-wrap marginT94">
      <van-button
        style="margin:0 auto;width: 73%;"
        class="primary-btn"
        type="info"
        @click="editInfo"
        >确定</van-button
      >
    </div>
  </div>
</template>
<script>
import { editInfo, currentUserInfo } from "@/api/CustomerH5Controller";
export default {
  data() {
    return {
      value: ""
    };
  },
  created() {
    this.currentUserInfo();
  },
  methods: {
    editInfo() {
      if (this.value) {
        editInfo({
          nickName: this.value
        }).then(({ code }) => {
          if (code == 0) {
            this.$router.push("/settingCenter");
          }
        });
      }
    },
    currentUserInfo() {
      currentUserInfo().then(({ data }) => {
        const { nickName } = data;
        this.value = nickName;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.nickname {
  caret-color: #1bc2b1;
  padding: 19px 16px;
  border-bottom: 0.5px solid #1bc2b1;
}
.marginT94 {
  margin-top: 94.5px;
}
</style>
