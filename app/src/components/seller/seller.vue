<template>
    <div class="seller-container" ref="sella">
      <div class="seller-content">
        <div class="seller-info">
          <div class="top">
            <div class="top-wrapper">
              <div class="left">
                <p class="name">{{seller.name}}</p>
                <star :score="seller.score" :size="36" class="star" v-if="seller.score"></star>
                <span class="rat-count">({{seller.ratingCount}})</span>
                <span class="sell-count">月售{{seller.sellCount}}单</span>
              </div>
              <div class="right">
                <i class="icon-favorite" @click="favorite($event)" :class="{collected:collect}"></i>
                <span>{{favMsg}}</span>
              </div>
            </div>
          </div>
          <div class="bottom">
            <div class="info-item">
              <p>起送价</p>
              <div>
                <span class="data">{{seller.minPrice}}</span><span class="text">元</span>
              </div>
            </div>
            <div class="info-item">
              <p>商家配送</p>
              <div>
                <span class="data">{{seller.deliveryPrice}}</span><span class="text">元</span>
              </div>
            </div>
            <div class="info-item">
              <p>平均配送时间</p>
              <div>
                <span  class="data">{{seller.deliveryTime}}</span><span class="text">元</span>
              </div>
            </div>
          </div>
        </div>
        <spilt></spilt>
        <div class="events">
          <div class="head">公告和活动</div>
          <p class="bulletin">{{seller.bulletin}}</p>
          <ul class="events-list">
            <li v-for="item in seller.supports" class="events-item">
              <span :class="classType(item.type)"></span>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
        </div>
        <spilt></spilt>
        <div class="pics">
          <div class="head">商家实景</div>
          <div class="pics-wrapper" ref="wrapper">
            <ul class="pics-list" ref="picture">
              <li class="pics-item" v-for="item in seller.pics">
                <img :src="item" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <spilt></spilt>
        <div class="seller-msg">
          <div class="head">商家信息</div>
          <ul class="msg-list">
            <li v-for="item in seller.infos" class="msg-item">{{item}}</li>
          </ul>
        </div>
      </div>
    </div>
</template>

<script>
  import CScroll from 'better-scroll';
  import star from '../star/star';
  import spilt from '../spilt/spilt';

  export default {
    props: ['seller'],
    components: {
      star,
      spilt,
    },
    watch: {
      seller() {
        this.initScroll();
        this.initPicScroll();
      },
    },
    mounted() {
//      this.initScroll();
      this.initPicScroll();
      if (typeof (window.localStorage.getItem('collect')) !== 'undefined') {
        this.collect = Boolean(window.localStorage.getItem('collect'));
      }
    },
    methods: {
      favorite(e) {
        if (e._constructed) {
          if (this.collect === true) {
            this.collect = !this.collect;
//            const collect = JSON.stringify(this.collect);
//            window.localStorage.setItem('collect', collect);
            window.localStorage.clear();
          } else {
            this.collect = !this.collect;
            window.localStorage.setItem('collect', this.collect);
          }
        }
      },
      initScroll() {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new CScroll(this.$refs.sella, {
              click: true,
            });
          });
        } else {
          this.scroll.refresh();
        }
      },
      initPicScroll() {
        if (!this.seller.pics) return;
        const width = 120;
        const margin = 6;
        const sum = this.seller.pics.length * (width + margin);
        this.$refs.picture.style.width = `${sum}px`;
        if (!this.picScroll) {
          this.$nextTick(() => {
            this.picScroll = new CScroll(this.$refs.wrapper, {
              scrollX: true,
              eventPassthrough: 'vertical',
            });
          });
        } else {
          this.picScroll.refresh();
        }
      },
      classType(num) {
        const list = [
          'decrease',
          'discount',
          'special',
          'invoice',
          'guarantee',

        ];
        return list[num];
      },
    },
    computed: {
      favMsg() {
        if (this.collect) {
          return '已收藏';
        } else {
          return '收藏';
        }
      },
    },
    data() {
      return {
        collect: false,
      };
    },
    created() {
      this.initScroll();
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/border.styl"
  .seller-container
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .seller-content
      .seller-info
        padding 18px
        .top
          width 100%
          .top-wrapper
            border-1px(rgba(7,17,27,.1),100%,0)
            padding-bottom 18px
            .left
              font-size 0
              .name
                font-size 14px
                color rgb(7,17,27)
                line-height 14px
                margin-bottom 8px
              .star
                display inline-block
                vertical-align middle
              .sell-count,.rat-count
                color rgb(77,85,93)
                font-size 10px
                line-height 18px
                display inline-block
                vertical-align middle
              .sell-count
                margin-left 12px
              .rat-count
                margin-left 8px
            .right
              position absolute
              top 0
              right 0
              text-align center
              width 40px
              i
                font-size 24px
                line-height 24px
                color #d4d6d9
              .collected
                font-size 24px
                line-height 24px
                color rgb(240,20,20)
              span
                display block
                font-size 10px
                margin-top 4px
                line-height 10px
                color rgb(77,85,93)
        .bottom
          padding 18px 18px 0 18px
          display flex
          .info-item
            flex 1
            border-right 1px solid rgba(7,17,27,.1)
            text-align center
            &:last-child
              border none
            p
              line-height 10px
              font-size 10px
              color rgb(147,153,159)
            div
              margin-top 4px
              .data,.text
                line-height 24px
                font-weight 200
                color rgb(7,17,27)
              .data
                font-size 24px
              .text
                font-size 10px

      .events
        padding 18px 18px 0px 18px
        .head
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .bulletin
          padding 8px 12px 0px 12px
          font-size 12px
          line-height 24px
          font-weight 200
          color rgb(240,20,20)
        .events-list
          border-1px2(rgba(7,17,27,.1))
          &:last-child
            border-none()
          .events-item
            border-1px(rgba(7,17,27,.1),100%,0)
            font-size 0
            padding 16px 12px
            .text
              line-height 16px
              font-size 12px
              font-weight 200
              color rgb(7,17,27)
              vertical-align middle
            .decrease,.discount,.invoice,.special,.guarantee
              display inline-block
              width 16px
              height 16px
              background-size 16px 16px
              vertical-align middle
              margin-right 8px
            .discount
              bg-img('discount_3')
            .special
              bg-img('special_3')
            .invoice
              bg-img('invoice_3')
            .decrease
              bg-img('decrease_3')
            .guarantee
              bg-img('guarantee_3')


      .pics
        padding 18px
        .head
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
        .pics-wrapper
          margin-top 12px
          width 100%
          overflow hidden
          white-space nowrap
          .pics-list
            font-size 0
            .pics-item
              display inline-block
              margin-right 6px
              &:last-child
                margin 0
              img
                width 120px
                height 90px

      .seller-msg
        padding 18px
        .head
          line-height 14px
          font-size 14px
          color rgb(7,17,27)
          margin-bottom 12px
        .msg-list
          bg-1px2(rgba(7,17,27.0.1))
          .msg-item
            font-size 12px
            line-height 16px
            font-weight 200
            color rgb(7,17,27)
            padding 16px 12px
            border-1px2(rgba(7,17,27,0.1))

</style>
