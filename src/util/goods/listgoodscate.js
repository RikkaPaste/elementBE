import req from '@/util/request'
export default {
  namespaced: true,
  //类似vue对象的data
  state: {
    goodsListCate: [],
  },
  //类似state属性的getter方法
  getters: {
    getGoodsListcate(state) {
      return state.goodsListCate;
    }
  },
  //类似state属性的setter方法
  mutations: {
    //方法需要两个参数，第二个参数
    //是传入的值，一般是对象
    setGoodsListCate(state, payLoad) {
      state.goodsListCate = payLoad;
    }
  },
  actions: {
    async getGoodsListCate(context, payLoad) {
      try {
        let data = await req.post("/goodscategory/gethaschildren", payLoad);
        //建议通过mutations方法给属性赋值
        if (data.code == 200) {
          let listdata = { tableData: data.data };
          context.commit("setGoodsListCate", listdata.tableData);
        } else {
          this._vm.$msg.error(data.msg);
        }
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async edit(context, payLoad) {
      try {
        let data = await req.post('/goodscategory/updgoodscategory', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async delete(context, payLoad) {
      try {
        let data = await req.post('/goodscategory/delgoodscategory', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async add(context, payLoad) {
      try {
        let data = await req.post('/goodscategory/addgoodscategory', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    }
    ,
    async getLevel(context, payLoad) {
      return await req.post('goodscategory/getlevel', payLoad);
    }
  }
}