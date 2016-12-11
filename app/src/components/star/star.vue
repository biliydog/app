<template>
  <div class="star-wrapper">
    <span :class="star.name" v-for="star in starList"></span>
  </div>
</template>

<script>
  export default {
    props: ['score', 'size'],
    data() {
      return {
        starList: [],
      };
    },
    created() {
      const on = Math.floor(this.score);
      const tmp = [];
      for (let i = 0; i < on; i += 1) {
        if (this.size === 48) {
          tmp.push({ name: 'on-48' });
        } else {
          tmp.push({ name: 'on' });
        }
      }
      if (on !== 5) {
        if (this.score - on >= 0.5) {
          if (this.size === 48) {
            tmp.push({ name: 'half-48' });
          } else {
            tmp.push({ name: 'half' });
          }
        }
        if (tmp.length < 9) {
          const len = 5 - tmp.length;
          for (let j = 0; j < len; j += 1) {
            if (this.size === 48) {
              tmp.push({ name: 'off-48' });
            } else {
              tmp.push({ name: 'off' });
            }
          }
        }
      }
      this.starList = tmp;
    },
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/border.styl";
  .star-wrapper
    text-align center
    font-size 0
    .on,.off,.half
      display inline-block
      width 18px
      height 18px
      background-size 18px 18px
      margin-right 5px
      &:last-child
        margin-right 0
    .on
      bg-img('star36_on')
    .off
      bg-img('star36_off')
    .half
      bg-img('star36_half')

    .on-48,.off-48,.half-48
      display inline-block
      width 24px
      height 24px
      background-size 24px 24px
      margin-right 5px
      &:last-child
        margin-right 0
    .on-48
      bg-img('star48_on')
    .off-48
      bg-img('star48_off')
    .half-48
      bg-img('star48_half')
</style>
