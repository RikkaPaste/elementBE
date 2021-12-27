import req from '@/util/request'
export default {
    namespaced: true,
    //类似vue对象的data
    state: {
        goodsListAttribute: [],
    },
    //类似state属性的getter方法
    getters: {
        getgoodsListAttribute(state) {
            return state.goodsListAttribute;
        }
    },
    //类似state属性的setter方法
    mutations: {
        //方法需要两个参数，第二个参数
        //是传入的值，一般是对象
        setgoodsListAttribute(state, payLoad) {
            state.goodsListAttribute = payLoad;
        }
    },
    actions: {
        async getGoodListAttribute(context, payLoad) {
            try {
                let data = await req.post("/attribute/findbycateidandsel", payLoad);
                //建议通过mutations方法给属性赋值
                if (data.code == 200) {
                    let listdata = { tableData: data.data };
                    listdata.tableData.forEach(element => {
                        element.attrVals = element.attrVals
                            ? element.attrVals.split("_")
                            : [];
                    });
                    context.commit("setgoodsListAttribute", listdata.tableData);
                } else {
                    this._vm.$msg.error(data.msg);
                }
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async goodsadd(content, payLoad) {
            try {
                let data = await req.post('/goods/addgoods', payLoad);
                this._vm.$msg.success(data.msg);

            } catch (error) {
                this._vm.$msg.error(error);
            }
        }
    }
}