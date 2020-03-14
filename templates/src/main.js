import Vue from 'vue';
import App from './App.vue';
import './quasar';
import QRCode from "qrcode2"
import {Quasar, QIcon} from 'quasar';
import router from "./router";
import mathjax from "./mathjax";

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
Vue.prototype.$mathjax = mathjax;

Vue.use(Quasar, {
    components: {
        QIcon
    }
});

new Vue({
  render: h => h(App),
  router: router
}).$mount('#app');
