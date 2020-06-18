const path = require('path')
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const isProduction = process.env.NODE_ENV === 'production'
const cdn = {
  css: [],
  js: [
    '//cdn.bootcss.com/vue/2.6.10/vue.runtime.min.js',
    '//cdn.bootcss.com/vue-router/3.1.3/vue-router.min.js',
    '//cdn.bootcss.com/vuex/3.0.1/vuex.min.js',
    '//cdn.bootcss.com/axios/0.19.0/axios.min.js',
  ]
}
module.exports = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          'primary-color': '#f39502'
        },
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    if (isProduction) {
      config.plugin('html')
        .tap(args => {
          args[0].cdn = cdn;
          return args;
        });
    }
    config.plugins.delete('prefetch')
    config.plugins.delete('preload')
  },
  configureWebpack: config => {
    if (isProduction) {
      config.externals = {
        'vue': 'Vue',
        'vuex': 'Vuex',
        'vue-router': 'VueRouter',
        'axios': 'axios'
      }
    }
    config.plugins.push(
      new PrerenderSPAPlugin({
        // Required - The path to the webpack-outputted app to prerender.
        staticDir: path.join(__dirname, 'dist'),
        // Required - Routes to render.
        routes: [ '/','/home'],
      })
    )
  },
  devServer: {
    proxy: {
      '/api/': {
        target: 'http://api.mysite.com/v1/',
        changeOrigin: true,
        pathRewrite: {
          '^/api/': '/'
        }
      }
    }
  }
}
