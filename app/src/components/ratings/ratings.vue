<template>
  <div class="ratings-container" ref="rat">
    <div class="ratings-content">
      <div class="score-content">
        <div class="score-left">
          <div class="score">{{seller.score}}</div>
          <div class="text">综合评价</div>
          <div class="rate">高于周边商家{{seller.rankRate}}%</div>
        </div>
        <div class="score-right">
          <div class="stars">
            <span class="title">食物水平：</span>
            <star :size="36" :score="seller.foodScore" class="star" v-if="seller.foodScore"></star>
            <span class="text">{{seller.foodScore}}</span>
          </div>
          <div class="stars">
            <span class="title">服务态度：</span>
            <star :size="36" :score="seller.serviceScore" class="star" v-if="seller.serviceScore"></star>
            <span class="text">{{seller.serviceScore}}</span>
          </div>
          <div class="time">
            <span class="time-text">送达时间:</span>
            <span class="num">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <spilt></spilt>
      <div class="shop-comments-cal">
        <div class="all">
          全部 <span v-if="rating">{{rating.length}}</span>
        </div>
        <div class="good">
          好评
          <span v-if="rating">{{goodRating}}</span>
        </div>
        <div class="bad">
          吐槽 <span v-if="rating">{{rating.length-goodRating}}</span>
        </div>
      </div>
      <div class="choose-comment" v-if="rating" @click="changeRatings($event)">
        <span class="icon-check_circle" :class="{only : onlyText}"></span><span class="text">只看有内容的评价</span>
      </div>
      <div class="seller-rating">
        <ul class="rating-list">
          <li class="rating-item" v-for="item in showWithText">
            <div class="item-header">
              <div class="left">
                <img src="item.avatar" width="28px" height="28px">
                <div class="msg">
                  <p class="user">{{item.username}}</p>
                  <star :size="36" :score="item.score" class="score-star"></star><span class="d-time" v-if="item.deliveryTime">{{item.deliveryTime}}分钟送达</span>
                </div>
              </div>
              <div class="right">{{item.rateTime}}</div>
            </div>
            <p class="content">{{item.text}}</p>
            <div class="foot">
              <i class="icon-thumb_up" v-show="!item.rateType"></i>
              <i class="icon-thumb_down" v-show="item.rateType"></i>
              <span class="rec" v-for="i in item.recommend">{{i}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  import Scroll from 'better-scroll';
  import cart from '../shopcart/shopcart';
  import star from '../star/star';
  import spilt from '../spilt/spilt';

  const errOk = 0;
  export default {
    components: {
      cart,
      star,
      spilt,
    },
    methods: {
      changeRatings(e) {
        if (!e._constructed) return;
        this.onlyText = !this.onlyText;
      },
    },
    computed: {
      goodRating() {
        let num = 0;
        if (this.rating.length > 0) {
          for (const i of this.rating) {
            if (i.rateType === 0) {
              num += 1;
            }
          }
        }
        return num;
      },
      showWithText() {
        if (this.onlyText) {
          if (this.rating.length > 1) {
            const alist = [];
            for (const f of this.rating) {
              if (f.text !== '') {
                alist.push(f);
              }
            }
            return alist;
          }
        }
        return this.rating;
      },
    },
    props: ['seller'],
    data() {
      return {
        rating: {},
        onlyText: false,
      };
    },
    watch: {
      rating() {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new Scroll(this.$refs.rat, {
              click: true,
            });
          });
        } else {
          this.scroll.refresh();
        }
      },
    },
    created() {
      axios.get('/api/ratings')
        .then(response => {
          if (response.data.errno === errOk) {
            this.rating = response.data.data;
          }
        });
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/border.styl"
  .ratings-container
    position absolute
    top 174px
    bottom 0
    width 100%
    overflow hidden
    .ratings-content
      .score-content
        display flex
        .score-left
          flex 0 0 137px
          width 137px
          text-align center
          padding-top 18px
          padding-bottom 18px
          border-right 1px solid rgba(7,17,27,0.1)
          @media only screen and (max-width 320px)
            flex 0 0 120px
            width 120px
          .score
            font-size 24px
            line-height 28px
            color rgb(255,153,0)
          .text
            font-size 10px
            line-height 10px
            color rgb(7,17,27)
            margin-top 6px
          .rate
            font-size 12px
            line-height 12px
            color rgb(7,17,27)
            margin-top 8px
        .score-right
          flex 1
          font-size 0
          padding-right 12px
          padding-left  24px
          padding-top 8px
          @media only screen and (max-width 320px)
            padding-left 6px
            padding-right 0px
          .time
            .time-text
              display inline-block
              margin-right 12px
              vertical-align middle
            .num
              font-size 12px
              line-height 18px
              color rgb(147,153,159)
              vertical-align middle
          .stars,.time
            margin-top 8px
            margin-right 0
            padding-right 0
            color rgb(7,17,27)
            line-height 12px
            span,time-text
              font-size 12px
              vertical-align bottom
            .text
              font-size 12px
              color rgb(255,153,0)
              margin-left 6px
              @media only screen and (max-width 320px)
                margin-left 0
            .star
              display inline-block
      .choose-comment
        padding 12px 0
        .icon-check_circle,.text
          color rgb(147,153,159)
          vertical-align middle
        .icon-check_circle
          font-size 24px
          margin-right 4px
          &.only
            color rgb(0,160,220)
        .text
          font-size 12px
      .shop-comments-cal
        padding 0 0 18px 0
        border-1px(rgba(7,17,27,0.1),90%,0)
        div
          display inline-block
          margin 12px 4px 0 4px
          font-size 12px
          padding 8px 12px
          border-radius 1px
        .all
          background rgb(0,160,220)
          color #fff
          margin-left 0
        .good
          background rgba(0,150,220,0.2)
          color rgb(77,85,93)
        .bad
          background rgba(77,85,93,0.2)
          color rgb(77,85,93)
          span
            font-size 8px
      .seller-rating
        padding 0px 18px 0px 0
        width 100%
        border-1px2(rgba(7,17,27,0.2))
        .rating-list
          .rating-item
            padding 18px
            border-1px(rgba(7,17,27,.1),100%,0)
            .item-header
              margin-bottom 6px
              position relative
              .left
                font-size 0
                img,.msg
                  display inline-block
                  vertical-align top
                img
                  border-radius 50%
                .msg
                  margin-left 12px
                  p
                    font-size 10px
                    line-height 12px
                    color rgb(7,17,27)
                    margin-bottom 4px
                  .score-star
                    display inline-block
                  .d-time
                    display inline-block
                    margin-left 6px
                    font-size 10px
                    line-height 12px
                    color rgb(147,153,159)
                    font-weight 200
              .right
                position absolute
                top 0
                right 0
                font-size 10px
                font-weight 200
                color rgb(143,157,159)
                line-height 12px
            .content
              margin-left 40px
              line-height 18px
              font-size 12px
              color rgb(7,17,27)
            .foot
              margin-top 8px
              font-size 0
              margin-left 40px
              .icon-thumb_up,.icon-thumb_down
                font-size 12px
                line-height 16px
              .icon-thumb_up
                color rgb(0,160,220)
              .icon-thumb_down
                color rgb(183,187,191)
              .rec
                display inline-block
                margin-left 6px
                line-height 16px
                font-size 9px
                padding-left 6px
                padding-right 6px
                color rgb(147,153,159)
                border 1px solid rgba(7,17,27,0.1)
</style>
