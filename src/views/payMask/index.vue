<template>
  <div class="mask">
    <!-- 提示在浏览器打开弹框 -->
    
    <div v-if="isWeiXi" style="float:right">
      
        <img :src="yhindao" alt="">
    </div>
    
  </div>
</template>
<script type="text/ecmascript-6">
import {  pay,getCache } from "@/api/FormalLessonOrderController";
/*
解决在微信浏览器中无法调用支付宝支付：
1.拿到从支付页传递过来的参数重组成自己需要的数据
2.清除旧的缓存数据（防止出现意外bug）
3.验证是否是微信浏览器（不是就把拿到的key和token存进本地缓存中，用于其他接口调用）
4.请求数据接口拿到支付宝的支付表单装进页面中完成支付
*/
import yhindao from '@/assets/yindao.png'
export default {
name: 'payMask',
data () {
return {
    isWeiXi: true,
    theRequest: {},
      yhindao

}
},
methods: {

// 监控微信浏览器
isWeiXin() {
        let ua = window.navigator.userAgent.toLowerCase();
        if (ua.match(/MicroMessenger/i) != "micromessenger") {
        this.isWeiXi = false
        // 重新存储新的token（在外部浏览器打开支付完成后是没有token这些数据的所以需要在浏览器一打开的时候就去存一次数据）
        //  pay({
        //               orderId: this.$route.query.orderId
        //             }).then(({ code, data, msg }) => {
        //               if (code == 0) {
          getCache({
rid:this.$route.query.rid

          }).then(res=>{
  let divForm = document.getElementsByTagName("divform");
                if (divForm.length) {
                  document.body.removeChild(divForm[0]);
                }
                const div = document.createElement("divform");
                div.innerHTML = res.data; // data就是接口返回的form 表单字符串
                document.body.appendChild(div);
                // document.forms[0].setAttribute("target", "_blank"); // 新开窗口跳转
                document.forms[0].submit();
          })

          
                        
//               }
// });

} else {
        this.isWeiXi = true
}
},


},
created() {
    this.isWeiXin()

},

}
</script>
<style scoped lang="less">
.mask{
  background:#999;
  width:100%;
  height:100%;
  overflow:auto;
  position:absolute;
  img{
    width: 300px;
    margin-left: 20px;
  }
}
</style>
