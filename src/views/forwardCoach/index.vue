<template>
  <HeaderWrap>
    <van-skeleton :row="3" :loading="pageLoading">
      <div class="page-wraper">

        <div class="page-sticky" :class="headerHight ? 'fixedHeader': ''" :style="headerHight? {height: `${headerHight}px`} : null">
          <div class="sticky-wrapper" ref="stickyWrapper">
            <div class="coach-card">
              <div class="bg" :style="`background-image:url(${coachData.headImageUrl})`"><div class="filter"></div></div>

              <div class="content">

                <div class="avatar">
                  <img :src="coachData.headImageUrl" alt="">
                </div>
                <h3 class="name">{{coachData.nickName}}</h3>
                <div class="level">{{coachLevelMap[coachData.level]}}教练</div>

                <div class="tag-list">
                  <van-tag
                    v-for="(tag, index) of coachData.tagList"
                    v-if="index < 4"
                    :key="tag"
                    plain>{{tag}}</van-tag>
                </div>

              </div>

            </div>

            <van-tabs class="site-tabs" v-model="activeTabName" @click="handleClick">
              <van-tab title="预约" name="forward"></van-tab>
              <van-tab title="个人履历" name="resume"></van-tab>
              <van-tab title="评价" name="comment"></van-tab>
            </van-tabs>
          </div>
        </div>

        <van-tabs class="site-tabs site-tabs-forward" v-model="activeTabName" @click="handleClick">
          <van-tab title="预约" name="forward">
            <div class="panel-normal">
              <div class="header">
                <h4 class="title">近期预约</h4>
                <div class="extra">已有(99+)人预约</div>
              </div>

              <div class="forward-users" @click="forwardThisCoach">

                <div class="forward-list">
                  <ul>
                    <li v-for="(imgSrc) in appointList" :key="imgSrc"><img :src="imgSrc" alt="客户"></li>
                    <!-- <li v-for="(imgSrc) in appointList" :key="imgSrc"><img src="https://img.zcool.cn/community/0108e95f02e2a3a801215aa054e9d2.jpg@260w_195h_1c_1e_1o_100sh.jpg" alt="客户"></li> -->
                  </ul>
                </div>

                <div class="extra">
                  <van-icon name="arrow" />
                </div>
              </div>

            </div>

            <van-divider />

            <div class="panel-normal">
              <div class="header">
                <h4 class="title">学员评价({{totalComment}})</h4>
                <div class="extra" @click="viewAllComment" style="color: #1bc2b1">查看全部</div>
              </div>

              <div class="comment-list">
                <van-list>
                  <van-cell
                    v-for="(item, index) in simpleCommentList"
                    :key="index">
                    <div class="comment-item">
                      <div class="avatar"><img :src="item.headImage" :alt="item.customNickName"></div>
                      <div class="main-content">
                        <div class="header">
                          <h4 class="name">{{item.customNickName || '**'}}</h4>
                          <van-rate
                            :value="item.evalCoachStar"
                            :size="16"
                            color="#1bc2b1"
                            allow-half
                          />
                        </div>
                        <time>{{item.commentTime}}</time>
                        <div class="content">{{item.evalContext}}</div>
                      </div>
                    </div>
                  </van-cell>
                </van-list>
                <van-button class="btn-view-all" type="primary" block @click="viewAllComment">查看全部评论({{totalComment}})</van-button>

              </div>

            </div>

            <div class="panel-normal">
              <div class="header">
                <h4 class="title">近期动态</h4>
              </div>

              <div class="active-list">

                <div class="active-item"
                  v-for="(item, index) in dynamicList"
                  :key="index">
                  <video controls="controls" @play="onPlay($event)" x5-video-player-type="h5-page">
                    <source :src="item.video" />
                  </video>
                  <div class="meta">
                    <div class="title">{{item.videoName}}</div>
                    <div class="date">{{item.createTime && item.createTime.substr(5, 5)}}</div>
                  </div>
                </div>

              </div>
            </div>

          </van-tab>
          <van-tab title="个人履历" name="resume">
            <div class="panel-normal">
              <section class="resume-item">
                <h4>个人简介</h4>
                <div>{{coachData.introduction}}</div>
              </section>

              <section class="resume-item">
                <h4>奖项/证书</h4>
                <div>{{coachData.award}}</div>
              </section>

              <section class="resume-item">
                <h4>擅长</h4>
                <div>{{coachData.speciality}}</div>
              </section>

              <section class="resume-item">
                <h4>教学经验</h4>
                <div>{{coachData.teachExperience}}</div>
              </section>
            </div>
          </van-tab>
          <van-tab title="评价" name="comment">
            <div class="panel-normal">
              <van-list v-model="commentLoading" :finished="commentFinished" finished-text="" @load="onLoadComments" :immediate-check="false">

                <van-cell
                      v-for="(item, index) in commentList"
                      :key="index">
                      <div class="comment-item">
                        <div class="avatar"><img :src="item.headImage" :alt="item.customNickName"></div>
                        <div class="main-content">
                          <div class="header">
                            <h4 class="name">{{item.customNickName || '**'}}</h4>
                            <van-rate
                              :value="item.evalCoachStar"
                              :size="16"
                              color="#1bc2b1"
                              allow-half
                            />
                          </div>
                          <time>{{item.commentTime}}</time>
                          <div class="content">{{item.evalContext}}</div>
                        </div>
                      </div>
                    </van-cell>

              </van-list>

              <NoDataComponent v-if="!commentLoading && commentList.length === 0" />

            </div>

          </van-tab>
        </van-tabs>

        <van-button type="primary" block class="bottom-btn bottom-btn-primary" @click="forwardThisCoach">¥{{coachData.priceDoubleValue}}预约上课</van-button>
      </div>
    </van-skeleton>
  </HeaderWrap>
</template>

<script>
import HeaderWrap from "../components/HeaderWrap";
import NoDataComponent from "../components/noDataComponent";
import { coachLevelMap } from '@/const/coach';
import { getCoachInfo, getCommentPage, getCoachRecentDynamic, getAppointments } from '@/api/coach';
import { apiCatchHandler } from '@/utils';
export default {
  data() {

    const {coachId} = this.$route.query;

    return {
      pageLoading: true,
      coachId,
      coachData: {},
      coachLevelMap,
      activeTabName: 'resume',
      commentNextPage: 1,
      commentLoading: false,
      commentFinished: false,
      commentList: [],
      totalComment: 0,
      simpleCommentList: [],
      dynamicList: [],
      appointList: [],
      headerHight: 0,
    };
  },
  created(){

    if(this.coachId){
      getCoachInfo({
        coachId: this.coachId,
      }).then(res => {

        const {code ,data } = res;

        if(code === 0){

          const {tag} = data;

          data.tagList = tag ? tag.split(' ') : [];

          this.coachData = data;
          this.pageLoading = false;
        }

      });

      /** 动态 */
      getCoachRecentDynamic({
        coachId: this.coachId
      }).then((res) => {
        const {code ,data } = res;

        if(code === 0){
          this.dynamicList = data;
        }
      });

      this.onLoadComments();

    }

    getAppointments({
      coachId: this.coachId,
      size: 10,
    }).then((res) => {

      const {code ,data } = res;

      if(code === 0){
        this.appointList = data.records;
      }

    });

  },
  mounted(){
    setTimeout(() => {
      const stickyWrapper = this.$refs.stickyWrapper;
      if(stickyWrapper && stickyWrapper.scrollHeight){
        this.headerHight = stickyWrapper.scrollHeight;
      }
    }, 300);
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event);
    },

    viewAllComment() {
      this.activeTabName = 'comment';
    },

    onLoadComments() {

      /** 数量大于10 */

      this.getComments().then((res) => {
        const {code ,data } = res;

        if(code === 0 && data){

          if(data.records && data.records.length !== 0){
            this.commentList = this.commentList.concat(data.records);

            if(this.commentNextPage === 1){
              const l = Math.min(2, data.records.length);
              const list = [];

              for(let i = 0; i< l;i++){
                list.push(data.records[i]);
              }

              this.simpleCommentList = list;
              this.totalComment = data.total;
            }
          }

          this.checkLastPage(data.pages);

        }
        this.commentLoading = false;
      }).catch(e => {
        apiCatchHandler(e);
        this.commentLoading = false;
      });


    },

    getComments(params){
      this.commentLoading = true;
      return getCommentPage({
        coachId: this.coachId,
        current: this.commentNextPage,
        size: 10,
        ...params,
      });

    },

    checkLastPage(pages){
      if(pages <= this.commentNextPage){
        this.commentFinished = true;
      }else{
        this.commentNextPage = this.commentNextPage + 1;
      }
    },

    onPlay(e){
      console.log(e);
    },

    forwardThisCoach(){
      this.$router.push({
        path:'/selectTime',
        query:{ coachId: this.coachId }
      });
    }
  },
  components: {
    HeaderWrap,
    NoDataComponent,
  }
};
</script>

<style lang="scss" scoped>
.page-sticky{
  ::v-deep{
    .van-sticky{
      background: #fff;
    }
  }
}
.fixedHeader{
  .sticky-wrapper{
    position: fixed;
    top:0;
    left:0;
    right: 0;

    z-index: 100;
  }
}
.sticky-wrapper{
  padding-top: 10px;
  background: #fff;
}
.page-wraper{
  padding:0 0 60px 0;
}
.coach-card{
  margin: 0 10px 10px 10px;
}
.panel-normal{
  margin: 0 10px 10px 10px;
}

.forward-users{
  display: flex;
  align-items:center;

  padding: 13px 5px;
  border-radius: 5px;
  box-shadow: 0 1px 6px rgba(0,0,0,.12);

  .extra{
    width: 25px;
    font-size: 25px;
    color:#999999;
  }
}

.forward-list{
  flex:1;

  overflow-x: auto;
  overflow-y: hidden;

  ul{

    display: flex;
    flex-wrap: nowrap;
    text-align: center;
  }

  li{
    margin-right: 20px;
    flex: 0 0 auto;
  }

  img{
    display: block;
    width: 64px;
    height: 64px;

    margin: 0 auto;
    border-radius: 50%;
    background: #F2F2F2;
    overflow: hidden;
  }
}

.resume-item{
  margin-bottom: 5px;
  color:#433B47;
  line-height: 1.6;
  font-size: 12px;

  h4{
    margin: 10px 0;
    font-size: 16px;
  }
}

.active-item{
  position: relative;

  margin-bottom: 10px;

  border-radius: 5px;

  line-height: 1.6;
  font-size: 16px;
  color:#fff;
  overflow: hidden;

  video{
    width: 100%;
    height: auto;
  }

  .meta{
    position: absolute;
    right:0;
    bottom:0;
    left:0;

    display: flex;
    justify-content: space-between;
    align-items: center;

    width: 100%;

    padding: 10px 10px;

    background-image: linear-gradient( rgba(0,0,0,0.14), rgba(0,0,0,1));

    pointer-events: none;

    .title{
      flex: 1;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .date{
      width: 60px;
      text-align: right;
    }
  }

}
.site-tabs-forward{
  ::v-deep{
    .van-tabs__wrap{
      display: none;
    }
  }
}
</style>
