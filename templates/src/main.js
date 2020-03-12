import Vue from 'vue';
import App from './App.vue';
import './quasar';
import QRCode from "qrcode2"
import {Quasar, QIcon} from 'quasar';
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

Vue.use(Quasar, {
    components: {
        QIcon
    }
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
