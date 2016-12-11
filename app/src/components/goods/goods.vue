<template>
    <div class="goods-container" >
      <div class="goods-wrapper">
        <div class="side-wrapper" ref="bar" >
          <ul class="side-bar" >
            <li class="side-item"
                v-for="(side,index) in goods.data"
                @click="changeArea(index,$event)"
                :class="{ act:changeBar===index }">
              <span class="text"  >{{side.name}}</span>
            </li>
          </ul>
        </div>
        <div class="list-wrapper" ref="list">
          <ul class="goods-list">
            <li class="goods-item"
                v-if="goods"
                v-for="(side,index) in goods.data" >
              <div class="item-name">{{side.name}}</div>
              <ul class="item-food">
                <li class="food" v-for="food in side.foods">
                  <div class="food-wrapper" @click="oneFood($event,food)">
                    <img :src="food.icon" class="food-icon" width="57" height="57">
                    <div class="food-content">
                      <div class="food-name">{{food.name}}</div>
                      <div v-if="food.description" class="food-des">{{food.description}}</div>
                      <span class="sell">月售{{food.sellCount}}份</span>
                      <span class="rat">好评率{{food.rating}}%</span>
                      <div class="price">
                        <span class="food-price">￥{{food.price}}元</span>
                        <span class="old-price" v-if="food.oldPrice">￥{{food.oldPrice}}元</span>
                      </div>
                    </div>
                  </div>
                  <div class="button-wrapper">
                    <selectButton :food="food" @foodClick="clicked($event)"></selectButton>
                  </div>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
      <transition name="fadeOne">
        <oneFood
          v-show="showOneFood"
          :foodMsg="oneFoodMsg"
          :show="showOneFood"
          @hideOneFood="hideFood"
        ></oneFood>
      </transition>
      <shopCart :selected="countedFood()" ref="cart"></shopCart>
    </div>

</template>

<script>
//  import axios from 'axios';
  import Scroll from 'better-scroll';
  import shopCart from '../shopcart/shopcart';
  import selectButton from '../selectbutton/selectbutton';
  import oneFood from '../food/food';

//  const errOk = 0;
  export default{
    data() {
      return {
        listHeight: [],
        scrollY: 0,
        showOneFood: false,
        oneFoodMsg: {},
//        goods: [],
      };
    },
    props: ['goods'],
    computed: {
      changeBar() {
        for (let i = 0; i <= this.listHeight.length; i += 1) {
          const high1 = this.listHeight[i];
          const high2 = this.listHeight[i + 1];
          if (!high2 || (this.scrollY >= high1 && this.scrollY < high2)) {
            return i;
          }
        }
        return 0;
      },
    },
    methods: {
      changeArea(index, event) {
        if (!event._constructed) return;
        const foodList = this.$refs.list.getElementsByClassName('goods-item');
        const element = foodList[index];
        this.listScroll.scrollToElement(element, 300);
      },
      computeHeight() {
        const foodList = this.$refs.list.getElementsByClassName('goods-item');
        let height = 0;
        this.listHeight.push(height);
        for (const i of foodList) {
          height += i.clientHeight;
          this.listHeight.push(height);
        }
      },
      countedFood() {
        const list = [];
        if (this.goods.data) {
          for (const i of this.goods.data) {
            for (const j of i.foods) {
              if (j.count) {
                list.push(j);
              }
            }
          }
        }
        return list;
      },
      hideFood() {
        this.showOneFood = false;
      },
//      接收子组件的事件同时传递给购物车组件，动画使用的
      _drop(e) {
        this.$refs.cart.drop(e);
      },
      clicked(e) {
        this._drop(e);
      },
      _initScroll() {
        this.$nextTick(() => {
          this.barScroll = new Scroll(this.$refs.bar, {
            click: true,
          });
          this.listScroll = new Scroll(this.$refs.list, {
            probeType: 3,
            click: true,
          });
          this.computeHeight();
          this.listScroll.on('scroll', (poi) => {
            this.scrollY = Math.abs(Math.round(poi.y));
          });
        });
      },
      oneFood(e, food) {
        if (!e._constructed) return;
        this.showOneFood = !this.showOneFood;
        this.oneFoodMsg = food;
      },
    },
    watch: {
      goods() {
        this._initScroll();
      },
    },
//    mounted() {
//      this._initScroll();
//    },
//    created() {
//      this._initScroll();
//    },
    components: {
      shopCart,
      selectButton,
      oneFood,
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/border.styl"
  .goods-wrapper
    display flex
    position absolute
    top 174px
    bottom 52px
    overflow hidden
    .side-bar
      flex 0
      width 80px
      background #d9dde1
      .side-item
        display inline-block
        width 80px
        text-align center
        font-weight 200
        height 54px
        border-1px(rgba(7,17,27,0.1),56px,13px)
        &.act
          position relative
          margin-top -1px
          z-index 10
          background #fff
          border none
          &.text
            font-weight 700
        .text
          display block
          font-size 12px
          line-height 14px
          color rgb(77,85,93)
          padding-top 25px
    .goods-list
      flex 1
      width 100%
      .goods-item
        font-size 0
        width 100%
        .item-name
          width:100%
          height 26px
          background #f3f5f7
          border-left 2px solid #d9dde1
          padding-left 14px
          font-size 12px
          color rgb(147,163,159)
          line-height 26px
        .item-food
          .food
            margin-top 18px
            margin-left 18px
            border-1px(rgba(7,17,27,0.1),100%,0)
            .food-icon
              display inline-block
            .food-content
              vertical-align top
              display inline-block
              padding 2px 18px 18px 10px
            .button-wrapper
              position absolute
              right 0
              bottom 12px
            .food-name
              font-size 14px
              color rgb(7,17,27)
              margin-bottom 8px
            .food-des
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

  .fadeOne-enter-active,.fadeOne-leave-active
    transition all .5s
  .fadeOne-enter-active
    transform translate3d(0,0,0)
  .fadeOne-enter,.fadeOne-leave-active
    transform translate3d(100%,0,0)
</style>
