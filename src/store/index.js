import Vue from 'vue'
import Vuex from 'vuex'
import users from '../util/meanager/users'
import listgoods from '../util/goods/listgoods'
import listgoodscate from '../util/goods/listgoodscate'
import listgoodsattr from '../util/goods/listgoodsattr'
import listswiper from '../util/goods/listswiper'
import listrole from '../util/power/listrole'
import listmenu from '../util/power/listmenu'
import listorder from '../util/order/listorder'
import listclient from '../util/client/listclient'
import goodsadd from '../util/goods/goodsadd'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    users, listgoods, listgoodsattr, listgoodscate, listswiper, listrole, listmenu, listorder,listclient,goodsadd
  }
})
