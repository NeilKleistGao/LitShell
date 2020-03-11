import Vue from 'vue';
import App from './App.vue';
import './quasar';
import QRCode from "qrcode2"

import router from "./router";

Vue.config.productionTip = false;

const QRCodeShow = (url) => {
  let qrcode = new QRCode("qrcode", {
      width: 64,
      height: 64,
      text: url
  });

  return qrcode;
};

Vue.prototype.$QRCodeShow = QRCodeShow;

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
