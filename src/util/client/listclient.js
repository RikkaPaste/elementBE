import req from '@/util/request'
export default {
    namespaced: true,
    //类似vue对象的data
    state: {
        ClientList: [],
    },
    //类似state属性的getter方法
    getters: {
        getClientList(state) {
            return state.ClientList;
        }
    },
    //类似state属性的setter方法
    mutations: {
        //方法需要两个参数，第二个参数
        //是传入的值，一般是对象
        setClientList(state, payLoad) {
            state.ClientList = payLoad;
        }
    },
    actions: {
        async getclientlist(context, payLoad) {
            try {
                let data = await req.post("/clients/list", payLoad);
                //建议通过mutations方法给属性赋值
                if (data.code == 200) {
                    let listdata = { tableData: data.data.rows, count: data.data.count };
                    context.commit("setClientList", listdata);
                } else {
                    this._vm.$msg.error(data.msg);
                }
            } catch (error) {
                this._vm.$msg.error(error);
            }
        }
    }
}