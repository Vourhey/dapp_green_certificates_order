import 'vuetify/dist/vuetify.min.css'
import Vue from 'vue'
import router from './router';
import VueWait from 'vue-wait';
import Web3Check, { ACTIONS } from 'vue-web3-check';
import Vuetify from 'vuetify';
import App from './App.vue'
import * as config from './config';

Vue.config.productionTip = false

Vue.use(Vuetify);

Web3Check.store.on('update', data => {
  if (
    (data.state.old.account !== null && data.action === ACTIONS.UPD_ACCOUNT) ||
    (data.state.old.networkId !== null &&
      data.action === ACTIONS.UPD_NETWORK_ID)
  ) {
    window.location.reload(false);
  }
});
Vue.use(Web3Check, {
  Web3,
  networks: [config.CHAIN_ID],
  requireAccount: true
});

Vue.use(VueWait);

new Vue({
    router,
    wait: new VueWait(),
    render: h => h(App),
}).$mount('#app')
