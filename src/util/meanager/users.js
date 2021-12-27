import req from '@/util/request'
export default {
  namespaced: true,
  //类似vue对象的data
  state: {
    usersList: [],
    rolesList: []
  },
  //类似state属性的getter方法
  getters: {
    getUsersList(state) {
      return state.usersList;
    },
    getRolesList(state) {
      return state.rolesList;
    }
  },
  //类似state属性的setter方法
  mutations: {
    //方法需要两个参数，第二个参数
    //是传入的值，一般是对象
    setUsersList(state, payLoad) {
      state.usersList = payLoad;
    },
    setRolesList(state, payLoad) {
      state.rolesList = payLoad;
    },
  },
  actions: {
    async getUsersList(context, payLoad) {
      try {
        let data = await req.post("/users/listusers", payLoad);
        //建议通过mutations方法给属性赋值
        if (data.code == 200) {
          let listdata = { tableData: data.data };
          context.commit("setUsersList", listdata.tableData);
        } else {
          this._vm.$msg.error(data.msg);
        }
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async edit(context, payLoad) {
      try {
        let data = await req.post('/users/updusers', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    },
    async delete(context, payLoad) {
      try {
        let data = await req.post('/users/delusers', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    }
    ,
    async getRolesList(context, payLoad) {
      let data = await req.post('/roles/listallroles');
      context.commit("setRolesList", data.data);
    },
    async add(context, payLoad) {
      try {
        let data = await req.post('/users/addusers', payLoad);
        this._vm.$msg.success(data.msg);
      } catch (error) {
        this._vm.$msg.error(error);
      }
    }
  }
}