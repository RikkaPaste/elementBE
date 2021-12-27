import req from '@/util/request'
export default {
    namespaced: true,
    //类似vue对象的data
    state: {
        RoleList: [],
    },
    //类似state属性的getter方法
    getters: {
        getrolelist(state) {
            return state.RoleList;
        }
    },
    //类似state属性的setter方法
    mutations: {
        //方法需要两个参数，第二个参数
        //是传入的值，一般是对象
        setrolelist(state, payLoad) {
            state.RoleList = payLoad;
        }
    },
    actions: {
        async getrolelist(context, payLoad) {
            try {
                let data = await req.post("/roles/listroles", payLoad);
                //建议通过mutations方法给属性赋值
                if (data.code == 200) {
                    let listdata = { tableData: data.data.rows, count: data.data.count };
                    context.commit("setrolelist", listdata);
                } else {
                    this._vm.$msg.error(data.msg);
                }
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async edit(context, payLoad) {
            try {
                let data = await req.post('/roles/updroles', payLoad);
                this._vm.$msg.success(data.msg);
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async delete(context, payLoad) {
            try {
                let data = await req.post('/roles/delroles', payLoad);
                this._vm.$msg.success(data.msg);
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async add(context, payLoad) {
            try {
                let data = await req.post('/roles/addroles', payLoad);
                this._vm.$msg.success(data.msg);
            } catch (error) {
                this._vm.$msg.error(error);
            }
        },
        async getpowerlist(context, payLoad) {
            return await req.post('/menu/listmenu');
        },
        async rolesandmenu(context, payLoad) {
            try {
                let data = await req.post('/roles_and_menu/addroles_and_menu', payLoad);
                this._vm.$msg.success("修改权限成功");
            } catch (error) {
                this._vm.$msg.error("修改权限失败", error);
            }
        }
    }
}