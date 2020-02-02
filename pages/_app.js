import App from 'next/app'
import Layout from '../components/Layout'
import { Provider } from 'react-redux'
import hoc from '../lib/with-redux'

// 自定义app
class myApp extends App {
  state = {
    msg: '全局的',
    context: 'value'
  }

  // 这个方法每次页面切换都会调用
  static async getInitialProps(ctx) {
    const { Component } = ctx
    let pageProps
    // 自义定app后,如果页面有用到getInitialProps,则需要手动从这里传过去
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    return { pageProps }
  }

  render() {
    const { Component, pageProps, reduxStore } = this.props // Component对应的是页面

    return (
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps}></Component>
        </Layout>
      </Provider>
    )
  }
}

export default hoc(myApp)
