<template>
  <div class="wrapper">
    <div class='shop-container'>
      <div class="left-wrapper" @click="show">
        <div class="icon-wrapper">
          <div class="icon" :class="{'highlight':foodCount > 0}">
            <i class="icon-shopping_cart" :class="{highlight:foodCount > 0}"></i>
          </div>
          <div class="count" v-show="foodCount > 0">{{foodCount}}</div>
        </div>
        <div class="total-price" :class="{'highlight':foodCount > 0}">￥{{totalPrice}}</div>
        <div class="del-price">另需配送费￥{{seller.deliveryPrice}}元</div>
      </div >
      <div class="right-wrapper" :class="{'highlight':totalPrice >= seller.minPrice}">{{pay}}</div>
      <div class="ball-container">
        <div class="ball" v-for="ball in balls" v-show="ball.show"></div>
        <div class="inner"></div>
      </div>
      <transition name="list">
        <div class="shop-detail" v-show="showDetail&&selected.length>0" >
          <div class="header">
            <div class="left">购物车</div>
            <div class="right" @click="clear">清空</div>
          </div>
          <div class="detail-list" ref="detail">
            <ul class="list">
              <li v-for="item in selected" class="item">
                <div class="left">{{item.name}}</div>
                <div class="right">
                  <div class="price">￥{{item.price * item.count}}</div>
                  <selected :food="item" class="counter"></selected>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
    <transition name="fade">
      <div class="mask" v-show="showDetail && selected.length > 0" @click="hide"></div>
    </transition>
  </div>

</template>

<script>
  import BScroll from 'better-scroll';
  import axios from 'axios';
  import selected from '../selectbutton/selectbutton';


  const errOk = 0;
  export default {
    props: {
      selected: {
        type: Array,
        default() {
          return [];
        },
      },
    },
    components: {
      selected,
    },
    methods: {
      //      做动画的函数
      drop(e) {
        for (const i of this.balls) {
          if (!i.show) {
            i.show = true;
            i.el = e;
            this.dropBall.push(i);
          }
        }
      },
      show() {
        if (this.selected.length > 0) {
          this.showDetail = !this.showDetail;
        }
      },
      hide() {
        this.showDetail = false;
      },
      clear() {
        for (const i of this.selected) {
          i.count = 0;
        }
      },
//      做动画的函数
//      be(e) {
//        let count = this.balls.length;
//        while (count -= 1) {
//          let ball = this.balls[count];
//          if (ball.show) {
//            const rect = ball.el.getBoundingClientRect();
//            const x = rect.left - 32;
//            const y = -(window.innerHeight - rect.top - 22);
//            e.style.display = '';
//            e.style.webkitTransform = `translate3D(0, ${y}, 0)`;
//
//          }
//        }
//      },
//      en(e) {},
//      ae(e) {},
    },
    computed: {
      totalPrice() {
        let sum = 0;
        if (this.selected.length > 0) {
          for (const i of this.selected) {
            sum += i.price * i.count;
          }
        }
        return sum;
      },
      foodCount() {
        let sum = 0;
        for (const i of this.selected) {
          sum += i.count;
        }
        return sum;
      },
      pay() {
        if (this.totalPrice === 0) {
          return `￥${this.seller.minPrice}元起送`;
        } else if (this.totalPrice > 0 && this.totalPrice < this.seller.minPrice) {
          return `还差￥${this.seller.minPrice - this.totalPrice}元起送`;
        } else {
          return '去结算';
        }
      },
    },
    created() {
      axios.get('/api/seller')
        .then(response => {
          if (response.data.errno === errOk) {
            this.seller = response.data.data;
            this.$nextTick(() => {
              this.listScroll = new BScroll(this.$refs.detail, {
                click: true,
              });
            });
          }
        });
    },
    data() {
      return {
        seller: '',
        dropBall: [],
        balls: [
          { show: false },
          { show: false },
          { show: false },
          { show: false },
          { show: false },
          { show: false },
        ],
        showDetail: false,
      };
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '../../../static/icomoon/style.css'
  @import "../../common/stylus/border.styl"
  .wrapper
    width 100%
    height 100%
    .shop-container
      display flex
      position fixed
      bottom 0
      left 0
      z-index 50
      height 48px
      width 100%
      background #141d27
      .left-wrapper
        flex 1
        font-size 0
        .icon-wrapper
          display inline-block
          position relative
          top -10px
          padding 6px
          margin 0 12px
          height 56px
          width 56px
          box-sizing border-box
          background #141d27
          border-radius 50%
          .icon
            width 100%
            height 100%
            border-radius 50%
            background #2b343c
            color rgba(255,255,255,0.4)
            text-align center
            &.highlight
              background rgb(0,160,220)
              color #fff
            .icon-shopping_cart
              font-size 24px
              color #80858a
              line-height 44px
              &.highlight
                color #fff
          .count
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            border-radius 16px
            box-shadow 0 4px 8px 0 rgba(0,0,0,0.4)
            background rgb(240,20,20)
            line-height 16px
            font-size 9px
            font-weight 700
            color rgb(255,255,255)
            text-align center
        .total-price
          display inline-block
          font-size 16px
          color rgba(255,255,255,0.4)
          line-height 24px
          vertical-align top
          margin-top 12px
          padding-right 12px
          border-right 1px solid rgba(255,255,255.0.1)
          -webkit-box-sizing: border-box
          -moz-box-sizing: border-box
          box-sizing: border-box
          &.highlight
            color #fff
        .del-price
          display inline-block
          line-height 24px
          font-size 10px
          color rgba(255,255,255,0.4)
          vertical-align top
          margin-top 12px
          padding-left 12px
      .right-wrapper
        position relative
        width 105px
        height 100%
        background #2b333b
        line-height 48px
        font-size 12px
        font-weight 700
        color rgba(255,255,255,0.4)
        vertical-align top
        text-align center
        &.highlight
          background #00b43c
          color #fff
      .ball-container
        .ball
          position fixed
          left 32px
          bottom 22px
          z-index 200
          .inner
            width 16px
            height 16px
            border-radius 50%
            background rgb(0,160,220)
      .shop-detail
        position absolute
        left 0
        bottom 48px
        width 100%
        max-height 257px
        z-index -1
        overflow hidden
        .header
          display flex
          justify-content space-between
          height 40px
          line-height 40px
          width 100%
          background #f3f5f7
          color rgb(7,17,27)
          font-size 14px
          font-weight 200
          border-1px(rgba(7,17,27,0.1),100%,0)
          .left
            margin-left 18px
          .right
            margin-right 18px
            &.active
              color rgb(0,160,260)
        .detail-list
          background #fff
          max-height 217px
          .list
            .item
              display flex
              justify-content space-between
              height 48px
              line-height 48px
              border-1px(rgba(7,17,27,0.1),90%,20px)
              .left
                font-size 14px
                color rgb(7,17,27)
                margin-left 18px
              .right
                display flex
                .price
                  font-size 14px
                  font-weight 700
                  color rgb(240,20,20)
                .counter
                  font-size 24px

    .mask
      position fixed
      top 0
      left 0
      width 100%
      height 100%
      z-index 30
      background rgba(7,17,27,0.6)
      -webkit-backdrop-filter blur(10px)
  .list-enter-active,.list-leave-active,.fade-leave-active,.fade-enter-active
    transition all 0.5s
  .list-enter-active
    transform translate3d(0,0,0)
    opacity 1
  .list-enter
    transform translate3d(0,48px,0)
    opacity 0
  .list-leave-active,.fade-leave-active
    opacity 0
  .fade-enter,fade-leave
    background rgba(7,17,27,0.6)
</style>
