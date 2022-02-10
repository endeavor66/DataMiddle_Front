import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {  // 初始状态或更新后的状态，读取方式：this.$store.state.userInfo.id;
    userInfo:{   //!!!
      id:"0",
      name:"未知人员",
      level:"0",
      shops:[],//[{id:"",name:""},...]
    },
    shopId:"0", //选中的门店id
  },
  mutations: {// 更新状态内容：this.$store.commit('GET_CREDID_info', businessInfo);
    GET_BUSINESS_INFO (state, newInfo) {
      state.businessInfo = newInfo
    },

    setUserInfo(state, user) { //!!!
      state.userInfo=user;
      localStorage.userInfo = user;
    },
    setShopId(state,id){ 
      state.shopId=id;
      localStorage.shopId = id;
    }

  },
  actions: {//触发状态更新，当需要更新多个状态的时候使用，如this.$store.commit('getBusinessInfo', newInfo);
    getBusinesInfo({ commit, state }, newInfo) {
      // commit('GET_USER_INFO', newInfo.userInfo)
　　　 commit('GET_BUSINESS_INFO',newInfo.businessInfo)
    }
  },
  modules: {
    //userInfo:{}, // 用户信息:读取方式this.$store.state.userInfo.xxxx.xx
  },
  getters: {
    userInfo(state) {  //!!!
      // if (!state.userId || state.userId == "0") {
      //   state.userId = localStorage.getItem('userId');
      // }
      return state.userInfo;
    },
    shopId(state){
      return state.shopId;
    }

  }
})
