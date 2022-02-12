import req from '@/util/request'
export default {
  namespaced: true,
  //类似vue对象的data
  state: {
    listSwiper: [],
  },
  //类似state属性的getter方法
  getters: {
    getlistSwiper(state) {
      return state.listSwiper;
    }
  },
  //类似state属性的setter方法
  mutations: {
    //方法需要两个参数，第二个参数
    //是传入的值，一般是对象
    setlistSwiper(state, payLoad) {
      state.listSwiper = payLoad;
    }
  },
  actions: {
    async getListSwiper(context, payLoad) {
      try {
        let data = await req.post("/swiper/listswiper", payLoad);
        //建议通过mutations方法给属性赋值
        if (data.code == 200) {
          let listdata = { tableData: data.data.rows, count: data.data.count };
          context.commit("setlistSwiper", listdata);
        } else {
          this._vm.$msg.error(data.msg);
        }
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async edit(context, payLoad) {
      try {
        let data = await req.post('/swiper/updswiper', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async delete(context, payLoad) {
      try {
        let data = await req.post('/swiper/delswiper', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },

    async addItem(context, payLoad) {
      try {
        let data = await req.post('/swiper/addswiper', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    }
  }
}