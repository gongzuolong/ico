module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      {charset: 'utf-8'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      {hid: 'description', name: 'description', content: 'Nuxt.js project'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'}
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~static/css/main.css',
    'mint-ui/lib/style.css'
  ],
  /*
  ** plugins
  */
  plugins: [
    {src: '~plugins/mintui.js', ssr: true}
  ],
  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#3B8070'},
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLINT on save
     */
    // extend (config, ctx) {
    //   if (ctx.isClient) {
    //     config.module.rules.push({
    //       enforce: 'pre',
    //       test: /\.(js|vue)$/,
    //       loader: 'eslint-loader',
    //       exclude: /(node_modules)/
    //     })
    //   }
    // }
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: 'img/[name].[hash].[ext]'
        }
      }
    ]
  }
}
