<template>
    <div class="header-container">
      <div class="top-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" width="64" height="64">
        </div>
        <div class="header-content">
          <div class="name">
            <span class="icon"></span>
            <span class="text">{{seller.name}}</span>
          </div>
          <p class="des">{{seller.description}}/{{seller.deliveryTime}}分钟送达</p>
          <div class="events" v-if="seller.supports">
            <img :src="eventType" width="12" height="12">
            <p>{{(seller.supports)[0].description}}</p>
          </div>
        </div>
        <div class="more" v-if="seller.supports" @click="showMask">
          <div class="text">{{seller.supports.length}}个</div>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
      </div>
      <div class="board-wrapper " v-if="seller.bulletin" @click="showMask">
        <span class="board-icon"></span><span class="board-text">{{seller.bulletin}}</span><span class="icon-keyboard_arrow_right"></span>
      </div>
      <div class="bg">
        <img :src="seller.avatar">
      </div>
      <div class="mask" v-show="isActive">
        <div class="mask-wrapper clearfix">
          <div class="mask-content">
            <p class="mask-name">{{seller.name}}</p>
            <stars :size="48" :score="seller.score" v-if="seller.score"></stars>
            <div class="part-line" v-if="seller.supports">
              <div class="line"></div>
              <div class="msg">优惠信息</div>
              <div class="line"></div>
            </div>
            <div class="mask-supports" v-if="seller.supports">
              <div class="supports-item" v-for="support in seller.supports" >
                <span :class="classType(support.type)"></span>
                <span class="text">{{support.description}}</span>
              </div>
            </div>
            <div class="part-line" v-if="seller.supports">
              <div class="line"></div>
              <div class="msg">商家公告</div>
              <div class="line"></div>
            </div>
            <p class="mask-board">
              {{seller.bulletin}}
            </p>
          </div>
        </div>
        <div class="mask-close" @click="hideMask">
          <span class="icon-close"></span>
        </div>
      </div>
    </div>
</template>

<script>
  import stars from '../star/star';

  export default {
    props: ['seller'],
    computed: {
      eventType() {
        const urlList = [
          '../../static/img/decrease_1@2x.png',
          '../../static/img/discount_1@2x.png',
          '../../static/img/special_1@2x.png',
          '../../static/img/invoice_1@2x.png',
          '../../static/img/guarantee_1@2x.png',
        ];
        const num = (this.seller.supports)[0].type;
        return urlList[num];
      },
    },
    data() {
      return {
        isActive: false,
      };
    },
    methods: {
      showMask() {
        this.isActive = true;
      },
      hideMask() {
        this.isActive = false;
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
    components: {
      stars,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/border.styl"
  @import "../../../static/icomoon/style.css"
  .header-container
    background-color rgba(7, 17, 27, 0.5)
    width 100%
    height 134px
    position relative
    overflow hidden
    .top-wrapper
      position relative
      top 24px
      left 24px
      height 106px
      font-size 0px
      .avatar
        display inline-block
        img
          border-radius 4px
      .header-content
        display inline-block
        position absolute
        margin-left 16px
        margin-top 2px
        width 200px
        .name
          margin-bottom 0px
          padding-bottom 0px
          .icon
            display inline-block
            bg-img('brand')
            width 30px
            height 18px
            background-size 30px 18px
            background-repeat no-repeat
          .text
            display inline-block
            font-size 16px
            font-weight bold
            color: #fff
            margin-left 6px
            vertical-align top
        .des
          font-size 12px
          font-weight 200
          line-height 12px
          color rgb(255, 255, 255)
          margin-top 8px
        .events
          margin-top 10px
          margin-bottom 2px
          p
            display inline-block
            font-size 10px
            line-height 12px
            color: rgb(255, 255, 255)
            vertical-align top
            margin-left 4px
    .board-wrapper
      position relative
      height 28px
      line-height 28px
      padding 0 22px 0 12px
      color rgb(255,255,255)
      background rgba(7,17,27,0.2)
      .board-icon
        display inline-block
        bg-img('bulletin')
        width 22px
        height 12px
        background-size 22px 12px
        background-repeat no-repeat
        margin-top 8px
      .board-text
        display inline-block
        line-height 28px
        font-size 10px
        font-weight 200
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        vertical-align top
        margin-left 4px
        margin-right 2px
        width 290px
        @media only screen and (min-width: 1024px)
          width 1200px
    .bg
      position absolute
      left 0
      top 0
      width 100%
      height 100%
      z-index -1
      filter blur(10px)
      img
        width 100%
        height 100%
    .more
      position absolute
      bottom 40px
      right  32px
      border-radius 8px
      height 24px
      font-size 0px
      width 45px
      color rgb(255, 255, 255)
      font-weight 200
      line-height 12px
      background rgba(0,0,0,0.2)
      .text
        display: inline-block
        position absolute
        left 8px
        top 7px
        font-size 10px
        margin-right 2px
      i
        display inline-block
        position absolute
        right 2px
        top 3px
        font-size 18px

    .mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 100
      background rgba(7,17,27,0.8)
      overflow auto
      .mask-wrapper
        margin 64px 36px 0px 36px
        min-height 90%
        .mask-content
          padding-bottom 64px
          .mask-name
            font-size 16px
            font-weight 700
            line-height 16px
            color rgb(255,255,255)
            text-align center
            margin-bottom 16px
          .part-line
            display flex
            width 100%
            margin 28px auto 0 auto
            text-align center
            font-size 0
            .msg
              font-size 16px
              font-weight 700
              color rgb(255,255,255)
              margin 0 12px 0 12px
            .line
              flex 1
              position relative
              border-bottom 1px solid rgba(266,255,255,0.2)
              top -6px
          .mask-supports
            margin-top 24px
            margin-left 12px
            .supports-item
              margin-bottom 12px
              font-size 0
              &:last-child
                margin-bottom 0
              .decrease
                display inline-block
                width 16px
                height 16px
                bg-img('decrease_2')
                background-size 16px 16px
                vertical-align middle
              .discount
                display inline-block
                width 16px
                height 16px
                bg-img('discount_2')
                background-size 16px 16px
                vertical-align middle
              .guarantee
                display inline-block
                width 16px
                height 16px
                bg-img('guarantee_2')
                background-size 16px 16px
                vertical-align middle
              .invoice
                display inline-block
                width 16px
                height 16px
                bg-img('invoice_2')
                background-size 16px 16px
                vertical-align middle
              .special
                display inline-block
                width 16px
                height 16px
                bg-img('special_2')
                background-size 16px 16px
                vertical-align middle
              .text
                line-height 12px
                font-size 12px
                font-weight 200
                color rgb(255,255,255)
                vertical-align middle
                margin-left 6px
          .mask-board
            margin 24px 12px 0 12px
            line-height 24px
            font-size 12px
            font-weight 200
            color rgb(255,255,255)

      .mask-close
        position relative
        clear both
        width 32px
        height 64px
        color rgba(255,255,255,0.5)
        font-size 32px
        margin -64px auto 0px auto
  // margin -64px auto 0 auto



</style>

