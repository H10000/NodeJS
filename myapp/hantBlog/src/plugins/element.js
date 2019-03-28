import Vue from 'vue'
import ELEMENT from 'element-ui'
if (process.env.NODE_ENV === 'development') {
    require('element-ui/lib/theme-chalk/index.css')
  }

Vue.use(ELEMENT)
