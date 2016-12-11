import seller from 'components/seller/seller';
import ratings from 'components/ratings/ratings';
import goods from 'components/goods/goods';
// import 'common/stylus/index.styl';
import Vue from 'vue';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from './App';

const routes = [
  { path: '/seller', component: seller },
  { path: '/goods', component: goods },
  { path: '/ratings', component: ratings },
];
Vue.use(VueRouter);
const router = new VueRouter({ routes });
const errOk = 0;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App :seller="sellerData" :goods="goodsData"></App>',

  data() {
    return {
      sellerData: '',
      goodsData: '',
      ratingData: '',
    };
  },
  components: { App, seller, ratings, goods },
  created() {
    axios.get('/api/seller')
      .then(response => {
        if (response.data.errno === errOk) {
          this.sellerData = response.data.data;
        }
      });
    axios.get('/api/goods')
      .then(response => {
        if (response.data.errno === errOk) {
          this.goodsData = response.data;
        }
      });
  },
  router,
});
router.push('/goods');
