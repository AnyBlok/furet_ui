module.exports = {
  runtimeCompiler: true,
  devServer: {
    proxy: {
      "/furet-ui": {
        target: 'http://localhost:5000',
        // "pathRewrite": { '^/api': '' },
        changeOrigin: true,
        secure: false
      }
    }
  }
}
