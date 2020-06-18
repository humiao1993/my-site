import Vue from 'vue'

if (process.env.NODE_ENV == 'development') {
  Vue.config.silent = false;
  Vue.config.devtools = true;
  Vue.config.performance = true;
  Vue.config.productionTip = false;
} else {
  Vue.config.silent = true;
  Vue.config.devtools = false;
  Vue.config.performance = false;
  Vue.config.productionTip = true;

}
