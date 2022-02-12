import req from '@/util/request'
export default {
    namespaced: true,
    //类似vue对象的data
    state: {
        OrderList: [],
    },
    //类似state属性的getter方法
    getters: {
        getOrderList(state) {
            return state.OrderList;
        }
    },
    //类似state属性的setter方法
    mutations: {
        //方法需要两个参数，第二个参数
        //是传入的值，一般是对象
        setOrderList(state, payLoad) {
            state.OrderList = payLoad;
        }
    },
    actions: {
        async getorderlist(context, payLoad) {
            try {
                let data = await req.post("/order/listorder", payLoad);
                //建议通过mutations方法给属性赋值
                if (data.code == 200) {
                    let listdata = { tableData: data.data.rows, count: data.data.count };
                    context.commit("setOrderList", listdata);
                } else {
                    this._vm.$msg.error(data.msg);
                }
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async edit(context, payLoad) {
            try {
                let data = await req.post('/menu/updmenu', payLoad);
                this._vm.$msg.success(data.msg);
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async delete(context, payLoad) {
            try {
                let data = await req.post('/menu/delmenu', payLoad);
                this._vm.$msg.success(data.msg);
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async add(context, payLoad) {
            try {
                let data = await req.post('/menu/addmenu', payLoad);
                this._vm.$msg.success(data.msg);
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async getLevel(context, payLoad) {
            return await req.post('menu/findbyparentid', payLoad);
        },
    }
}