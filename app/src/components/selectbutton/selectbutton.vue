<template>
    <div class='select-button-container'>
      <div class="button-wrapper"></div>
      <transition name="fade1">
        <div class="button-left icon-remove_circle_outline" v-show="food.count > 0"
             @click="decrease"></div>
      </transition>
      <transition name="fade2">
        <div class="button-middle"  v-show="food.count > 0">{{food.count}}</div>
      </transition>
      <div class="button-right icon-add_circle" @click="add($event)"></div>
    </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: ['food'],
    methods: {
      add(e) {
        if (!e._constructed) return;
        this.food.count ? this.food.count += 1 : Vue.set(this.food, 'count', 1);
//        触发小球动画时让购物车组件拿到事件对象用
        this.$emit('foodClick', e.target);
      },
      decrease(e) {
        if (!e._constructed) return;
        if (this.food.count > 0) {
          this.food.count -= 1;
        }
      },
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .select-button-container
    font-size 0
    .button-left,.button-right,.button-middle
      display inline-block
      padding 6px
    .button-left,.button-right
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
      vertical-align middle
    .button-middle
      margin 0 6px
      padding 0
      font-size 10px
      color rgb(147,153,159)
      vertical-align middle
    .button-right
      margin-right 12px
  .fade1-enter,.fade1-leave-active,.fade2-enter,.fade2-leave-active
    opacity 0
  .fade1-enter-active,.fade1-leave-active,.fade2-enter-active,.fade2-leave-active
    transition all .5s linear
</style>
