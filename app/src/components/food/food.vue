<template>
  <div class="one-container" ref="foodOne">
    <div class='one-food' >
        <div class="img">
          <img :src="foodMsg.image">
          <div class="back icon-arrow_lift" @click="hide">
          </div>
        </div>
        <div class="food-msg" >
          <div class="name">{{foodMsg.name}}</div>
          <div v-if="foodMsg.description" class="des">{{foodMsg.description}}</div>
          <span class="sell" >月售{{foodMsg.sellCount}}份</span>
          <span class="rat">好评率{{foodMsg.rating}}%</span>
          <div class="price">
            <span class="food-price">￥{{foodMsg.price}}元</span>
            <span class="old-price" v-if="foodMsg.oldPrice">￥{{foodMsg.oldPrice}}元</span>
          </div>
          <div class="buttons" v-show="foodMsg.count>0">
            <selected :food="foodMsg"></selected>
          </div>
          <transition name="foodButton">
            <div
              class="buy"
              v-show="!foodMsg.count||foodMsg.count===0"
              @click="plus($event)"
            >加入购物车</div>
          </transition>
        </div>
        <spilt></spilt>
        <div class="intro" v-if="foodMsg.info">
          <div class="title">商品介绍</div>
          <p>{{foodMsg.info}}</p>
        </div>
        <spilt v-if="foodMsg.info"></spilt>
        <div class="comments">
          <div class="comments-front">
            <p class="title">商品评价</p>
            <div class="comments-cal">
              <div class="all">
                全部 <span v-if="foodMsg.ratings">{{foodMsg.ratings.length}}</span>
              </div>
              <div class="good">
                好评
                <span v-if="foodMsg.ratings">{{goodRating}}</span>
              </div>
              <div class="bad">
                吐槽 <span v-if="foodMsg.ratings">{{foodMsg.ratings.length-goodRating}}</span>
              </div>
            </div>
            <div class="choose-comment" v-if="foodMsg.ratings" @click="changeRatings($event)">
              <span class="icon-check_circle" :class="{only : onlyText}"></span><span class="text">只看有内容的评价</span>
            </div>
          </div>
          <div class="comments-content" v-if="foodMsg.ratings">
            <ul class="comments-list" >
              <li class="comment" v-for="(item,index) in showWithText" v-if="foodMsg.ratings">
                <div class="msg">
                  <div class="left">{{item.rateTime}}</div>
                  <div class="right">
                    <span class="user">{{item.username}}</span>
                    <img :src="item.avatar" width="12" height="12">
                  </div>
                </div>
                <div class="text">
                  <i class="icon-thumb_up" v-show="item.rateType===0"></i>
                  <i class="icon-thumb_down" v-show="item.rateType===1"></i>
                  <p>{{item.text}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
  import AScroll from 'better-scroll';
  import Vue from 'vue';
  import selected from '../selectbutton/selectbutton';
  import spilt from '../spilt/spilt';

  export default {
    props: {
      foodMsg: {
        type: Object,
      },
    },
    data() {
      return {
        realShow: this.show,
        onlyText: false,
      };
    },
    computed: {
      goodRating() {
        let num = 0;
        for (const i of this.foodMsg.ratings) {
          if (i.rateType === 0) {
            num += 1;
          }
        }
        return num;
      },
      showWithText() {
        if (this.onlyText) {
          const list = [];
          for (const i of this.foodMsg.ratings) {
            if (i.text !== '') {
              list.push(i);
            }
            return list;
          }
        }
        return this.foodMsg.ratings;
      },
    },
    components: {
      selected,
      spilt,
    },
    watch: {
      foodMsg() {
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new AScroll(this.$refs.foodOne, {
              click: true,
            });
          });
        } else {
          this.scroll.refresh();
        }
      },
    },
    methods: {
      hide() {
        this.$emit('hideOneFood');
      },
      plus(e) {
        if (!e._constructed) return;
        Vue.set(this.foodMsg, 'count', 1);
      },
      changeRatings(e) {
        if (!e._constructed) return;
        this.onlyText = !this.onlyText;
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/border.styl"
  .one-container
    position fixed
    top 0
    left 0
    bottom 48px
    width 100%
    background #fff
    overflow hidden
    .img
      position relative
      width 100%
      height 0
      padding-top 100%
      img
        position absolute
        top 0
        left 0
        width 100%
        height 100%
      .back
        position absolute
        left 5px
        top 5px
        padding 10px
        color rgba(255,255,255,0.4)
        font-size 20px
    .food-msg
      padding 18px
      position relative
      .name
        font-size 14px
        color rgb(7,17,27)
        margin-bottom 8px
        font-weight 700
      .des
        font-size 10px
        line-height 10px
        height 10px
        widows 100%
        color rgb(147, 153, 159)
        margin-bottom 8px
      .sell,.rat
        display inline-block
        font-size 10px
        line-height 10px
        color rgb(147, 153, 159)
      .sell
        margin-right 6px
      .price
        margin-top 6px
        .food-price
          font-size 14px
          font-weight 700
          color rgb(240,20,20)
          line-height 24px
        .old-price
          font-size 10px
          line-height 24px
          font-weight normal
          color rgb(147, 153, 159)
          margin-left 8px
          position relative
          &:after
            display block
            content  "   "
            position absolute
            left 0
            bottom 6px
            width 100%
            border-top 1px solid #7e8c8d
      .buy
        position absolute
        right 18px
        bottom 18px
        width 74px
        height 24px
        background rgb(0,160,220)
        color #fff
        font-size 10px
        line-height 24px
        border-radius 12px
        box-sizing border-box
        text-align center
      .buttons
        position absolute
        right 18px
        bottom 18px

    .intro
      padding 18px
      width 100%
      .title
        font-size 24px
      p
        padding 8px 8px 8px 0
        color rgb(77,85,93)
        font-size 12px
        font-weight 200
        line-height 24px

    .comments
      width 100%
      .comments-front
        padding 16px 16px 0 16px
        width 100%
        font-size 0
        .title
          padding-bottom 6px
          font-size 24px
        .comments-cal
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
      .comments-content
        border-1px2(rgba(7,17,27,0.1))
        width 100%
        padding 0 18px 0 18px
        .comments-list
          .comment
            padding-bottom 16px
            padding-top 16px
            border-1px(rgba(7,17,27,0.1),90%,0)
            .msg
              .left,.right
                display inline-block
              .left
                font-size 10px
                line-height 12px
                color rgb(147,153,159)
              .right
                float right
                margin-right 36px
                font-size 0
                .user
                  font-size 10px
                  line-height 12px
                  color rgb(147,153,159)
                  vertical-align middle
                  margin-right 4px
                img
                  border-radius 50%
                  box-sizing border-box
                  vertical-align middle
            .text
              font-size 0
              margin-top 6px
              i,p
                display inline-block
              p
                font-size 12px
                color rgb(7,17,27)
                line-height 16px
                margin-left 4px
              i
                font-size 12px
                color rgb(147,153,159)
              .icon-thumb_up
                color rgb(0,160,220)
  .foodButton-enter-active,.foodButton-leave-active
    transition all .5s
  .foodButton-enter-active
    transform translate3d(0,0,0)
  .foodButton-enter,.foodButton-leave-active
    transform translate3d(100%,0,0)
    opacity 0

</style>
