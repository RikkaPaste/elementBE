module.exports = {
    publicPath: './',
    chainWebpack: config => {
        //如果当前是运行在开发模式，那么使用main-dev.js
        config.when(process.env.NODE_ENV === 'development', config => {
            config.entry("app").clear().add('./src/main-dev.js')
            //定义一个表示传递到index.html页面上去
            //表示当前处于开发模式
            config.plugin('html').tap(args => {
                args[0].isProd = false;
                return args;
            })
        });
        //如果当前运行在产品模式，那么使用main-prod.js
        config.when(process.env.NODE_ENV === 'production', config => {
            config.entry('app').clear().add('./src/main-prod.js')
            //定义一个表示传递到index.html页面上去
            //表示当前处于产品模式
            config.plugin('html').tap(args => {
                args[0].isProd = true;
                return args;
            })
            //设置产品模式打包的时候哪些不用打包
            config.set("externals", {
                vue: "Vue",//Vue核心库
                "vue-router": "VueRouter",//路由对象
                axios: "axios",
                nprogress: "NProgress",//进度条
                "vue-quill-editor": "VueQuillEditor",//复文本编辑器
                lodash: "_",
                echarts: "echarts"
            });
        })
    }
}