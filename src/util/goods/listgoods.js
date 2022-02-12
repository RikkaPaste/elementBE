import req from '@/util/request'
export default {
  namespaced: true,
  //类似vue对象的data
  state: {
    goodsList: [],
  },
  //类似state属性的getter方法
  getters: {
    getGoodsList(state) {
      return state.goodsList;
    }
  },
  //类似state属性的setter方法
  mutations: {
    //方法需要两个参数，第二个参数
    //是传入的值，一般是对象
    setGoodsList(state, payLoad) {
      state.goodsList = payLoad;
    }
  },
  actions: {
    async getGoodsList(context, payLoad) {
      try {
        let data = await req.post("/goods/listgoods", payLoad);
        //建议通过mutations方法给属性赋值
        if (data.code == 200) {
          let listdata = { tableData: data.data.rows, count: data.data.count };
          context.commit("setGoodsList", listdata);
        } else {
          this._vm.$msg.error(data.msg);
        }
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async edit(context, payLoad) {
      try {
        let data = await req.post('/goods/updgoods', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async listlabel(context,payLoad){
    let data=await req.post('/goodsdesc/findbygoodsid',payLoad);
    return data.data;
    },
    async editlabel(context,payLoad){
      try {
        let data = await req.post('/goodsdesc/updgoodsdesc', payLoad);
        this._vm.$msg.success("修改详情成功");
      } catch (error) {
        
      }
    }
  }
}