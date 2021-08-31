import Vue from "vue";
import VueMq from "vue-mq";

Vue.use(VueMq, {
  breakpoints: {
    xs: 600,
    sm: 768,
    md: 960,
    lg: 1440,
    xl: Infinity,
  },
});
