import router from './router.js'
import Navbar from './components/Navbar.js'

new Vue({
  el:'#app',
  template:`<div>
  <router-view /></div>`,
  router,
//  components:{
//  Navbar,
//  },
})