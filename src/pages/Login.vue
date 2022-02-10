<template>
  <div class="main ">
    <!-- <div class="alert alert-danger" v-if="isAlert">{{alertMessage}}</div>
    <div class="alert alert-success" v-if="isSucc">{{succMessage}}</div> -->
    <div class="login-logo" style="height:100px;margin-top:7rem">
        <a href="#">
            <img class="align-content" src="../assets/images/logo.png" alt="" style="height:80%">
        </a>
    </div>
    <div id="login">

      <div class="wrapper">
          <div class="login mt-5">
              <form action="#" method="post" class="container offset1 loginform">
                  <div id="owl-login">
                      <div class="hand"></div>
                      <div class="hand hand-r"></div>
                      <div class="arms">
                          <div class="arm"></div>
                          <div class="arm arm-r"></div>
                      </div>
                  </div>
                  <div class="pad">
                      <input type="hidden" name="_csrf" value="9IAtUxV2CatyxHiK2LxzOsT6wtBE6h8BpzOmk=">
                      <div class="control-group">
                          <div class="controls">
                              <label for="email" class="control-label fa fa-user"></label>
                              <input id="username" type="text" v-model="userName" name="email" placeholder="用户名" tabindex="1" autofocus="autofocus" class="form-control input-medium">
                          </div>
                      </div>
                      <div class="control-group">
                          <div class="controls">
                              <label for="password" class="control-label fa fa-asterisk"></label>
                              <input id="password" type="password" v-model="passWord" name="password" placeholder="密码" tabindex="2" class="form-control input-medium">
                          </div>
                      </div>
                  </div>
                  <div class="form-actions"><a href="#" tabindex="5" class="btn pull-left btn-link text-muted">忘记密码?</a><a href="#" tabindex="6" class="btn btn-link text-muted">注册</a>
                      <button type="button" tabindex="4" class="btn btn-primary" @click="login()">登录</button>
                  </div>
              </form>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as api from "../request/api.js"
  export default {
    name: 'login',
    data () {
      return {
        userName:"",
        passWord:"",
        isAlert:false,
        isSucc:true,
        alertMessage:"",
        succMessage:"",
      }
    },
    methods:{
      login(){
        var obj={userName:$("#username").val(),passWord:$("#password").val()};
        console.log(obj);
        api.login(obj,"登录失败").then(res=>{
          console.log(res);
          if(res.data.status==0){
            console.log("登录成功")
              this.$store.commit('setUserInfo', {id:res.data.data.id,name:res.data.data.name,shops:res.data.data.shops});
               //this.$router.push("/index/console");
              this.$router.push("/md/consoleView");
          } else {
              this.isAlert = true;
              this.alertMessage = "登录失败";
          }
        })
        /* api.login(this.userName,this.passWord).then( res => {
          console.log(res.data)
          if (res.data.code === 200) {
            console.log("登录成功")
            this.$store.commit('setUserId', res.data.data.id);
            this.$router.push("/index/console");
          } else {
            this.isAlert = true;
            this.alertMessage = "登录失败";
          }
        })
        .catch(failResponse => {
          this.isAlert = true;
          this.alertMessage = "登录失败";
          console.log("登录失败")
          console.error(failResponse);
        }); */

        //test
        //this.$store.commit('GET_CREDID_info', {id:"001",name:"周沛辰"});
        // this.$store.commit('setUserInfo', {id:"001",name:"周沛辰",level:"3"});
        // this.$router.push("/index/console");
        // this.$router.replace({
        //   name: "Console",
        //   // params: {
        //   //   username: this.loginForm.username
        //   // }
        // });
      }
    },
    mounted() {
       $('#login #password').focus(function() {
                  $('#owl-login').addClass('password');
              }).blur(function() {
                  $('#owl-login').removeClass('password');
              });
    },
  }
</script>

<style scoped>
  @import url("../assets/css/jq22.css");

</style>
