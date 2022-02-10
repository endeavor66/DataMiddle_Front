<template>
  <!-- Header-->
  <header id="header" class="header pl-0">
      <div class="top-left">
          <div class="navbar-header">
              <a class="navbar-brand" href="./"><img src="../assets/images/logo.png" alt="Logo"></a>
              <a class="navbar-brand hidden" href="./"><img src="images/logo2.png" alt="Logo"></a>
              <a id="menuToggle" class="menutoggle"><i class="fa fa-bars"></i></a>
          </div>
      </div>
      <div class="top-right">
          <div class="header-menu">
              <div class="header-left pt-3 d-flex justify-content-end" style="width:40%">
                  <div v-if="$store.getters.userInfo.name=='未知人员'">
                    <button type="button" class="btn btn-link p-0" @click="$router.push('/login');">请登录</button>
                  </div>
                  <div v-if="$store.getters.userInfo.name!='未知人员'">
                    <strong  style="font-size:13px">您好，{{$store.getters.userInfo.name}}</strong>
                  </div>
                  <!-- <p class="col-1 p-0 ml-3" style="">门店:</p> -->
                  <div class="col-4" style="">
                    <select name="selectSm" id="typeSelect" class="form-control-sm form-control" style="margin-top:-3px">
                      <option v-for="shop in shops"  :value="shop.id">{{shop.name}}</option>

                    </select>
                  </div>
                  <div>
                    <button type="submit" class="btn btn-outline-primary btn-sm" @click="chooseShop()" style="margin-top:-3px">
                      <i class="fa fa-dot-circle-o"></i>
                    </button>
                  </div>

              </div>

              <div class="user-area dropdown float-right">
                  <a href="#" class="dropdown-toggle active" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      <img class="user-avatar rounded-circle" src="../assets/images/profile.jpg" alt="User Avatar">
                  </a>

                  <div class="user-menu dropdown-menu">
                      <a class="nav-link" href="#"><i class="fa fa- user"></i>My Profile</a>

                      <a class="nav-link" href="#"><i class="fa fa- user"></i>Notifications <span class="count">13</span></a>

                      <a class="nav-link" href="#"><i class="fa fa -cog"></i>Settings</a>

                      <a class="nav-link" href="#"><i class="fa fa-power -off"></i>Logout</a>
                  </div>
              </div>

          </div>
      </div>
  </header>
  <!-- /#header -->
</template>

<script>
  export default {
    name: 'navbar',
    data () {
      return {
        shops:[],


      }
    },
    methods:{
      /**
       * 1. 选择门店
       */
      chooseShop(){
        var shopId=$("#typeSelect").find("option:selected").attr("value");
        this.$store.commit('setShopId',shopId);
        this.$parent.$parent.initial();
      }
    },
    mounted() {
      this.shops=this.$store.getters.userInfo.shops;
      var shopId=this.shops[0].id;
      this.$store.commit('setShopId',shopId);

    }
  }
</script>

<style scoped>
</style>
