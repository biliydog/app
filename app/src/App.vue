<template>
  <div id="app">
    <div class="header">
      <header-com :seller="seller"></header-com>
    </div>
    <div class="nav border-1px">
      <div class="nav-items">
        <router-link to="/goods" class="link">商品</router-link>
      </div>
      <div class="nav-items" >
        <router-link to="/ratings" class="link">评价</router-link>
      </div>
      <div class="nav-items">
        <router-link to="/seller" class="link">商家</router-link>
      </div>
    </div>
    <div class="content">
      <keep-alive>
        <router-view :goods="goods" :seller="seller" ></router-view>
      </keep-alive>
    </div>
    <!--<div class="footer">-->
      <!--<cart :selected="selectedList"></cart>-->
    <!--</div>-->
  </div>
</template>

<script>
  import appHeader from 'components/header/header';
  import goods from 'components/goods/goods';
  import seller from 'components/seller/seller';
  import ratings from 'components/ratings/ratings';
  import cart from 'components/shopcart/shopcart';

  export default {
    components: {
      'header-com': appHeader,
      goods,
      seller,
      ratings,
      cart,
    },
    data() {
      return {
        selectedList: [],
      };
    },
//    computed: {
//      countList() {
//        const list = [];
//        for (const i of this.goods.data) {
//          for (const j of i.foods) {
//            if (j.count) {
//              list.push(j);
//            }
//          }
//        }
//        this.selectedList = list;
//      },
//    },
    props: ['seller', 'goods', 'ratings'],
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "common/stylus/index.styl"
  /*@import "../static/siyuan.css"*/
  #app
    .nav
      display: flex
      width: 100%
      height: 40px
      line-height: 40px
      align-items: center
      border-1px(rgba(7, 17, 27, 0.1),100%,0)
      .nav-items
        font-size: 14px
        color: rgb(77, 85, 93)
        line-height :14px
        flex :1
        text-align :center
        .link
          display :block
          &.router-link-active
            color :rgb(240, 20, 20)

    .footer
      z-index -100
</style>
