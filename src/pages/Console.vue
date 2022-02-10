<template>

  <div id="main">
    <sidebar></sidebar>

<!-- Right Panel -->
    <consolePanel>

      <!-- Animated -->
      <div class="animated fadeIn">
          <!--Title-->
          <div class="row">
              <div class="col-lg-12">
                  <div class="card">
                      <div class="card-body">
                          <h2 class="pb-2 display-5">{{data.name}}</h2>
                      </div>
                      <div class="row d-flex justify-content-center">
                        <div class="col-10" >
                          <p align="left">
                            <strong style="color: #000000;">编号：</strong>{{data.id}}
                          </p>
                        </div>
                        <div class="col-10" >
                          <p align="left">
                            <strong style="color: #000000;">类型：</strong>{{data.type}}
                          </p>
                        </div>
                        <div class="col-10" >
                          <p align="left">
                            <strong style="color: #000000;">简介：</strong>{{data.info}}
                          </p>
                        </div>

                      </div>
                      <div class="row d-flex justify-content-around">
                        <div class="col-3">
                          <div class="d-flex flex-column justify-content-center">
                            <p>{{data.managerName}}</p>
                            <strong>负责人</strong>
                          </div>
                        </div>
                        <div class="border-left"></div>
                        <div class="col-3">
                          <div class="d-flex flex-column justify-content-center">
                            <p>{{data.location}}</p>
                            <strong>地理位置</strong>
                          </div>
                        </div>
                        <div class="border-left"></div>
                        <div class="col-3">
                          <div class="d-flex flex-column justify-content-center">
                            <p>{{data.date}}</p>
                            <strong>成立日期</strong>
                          </div>
                        </div>
                      </div> <!-- /.row -->
                      <div class="card-body"></div>
                  </div>
              </div><!-- /# column -->
          </div>
          <!--/Title-->
          <!-- Widgets  -->
          <div class="row">
              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-1">
                                  <i class="pe-7s-cash"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text">￥<span class="count">800，000</span></div>
                                      <div class="stat-heading">注册资本</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-2">
                                  <i class="pe-7s-cart"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text"><span class="count">1，659</span></div>
                                      <div class="stat-heading">商品数量</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-3">
                                  <i class="pe-7s-browser"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text"><span class="count">20，000</span></div>
                                      <div class="stat-heading">订单数量</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>

              <div class="col-lg-3 col-md-6">
                  <div class="card">
                      <div class="card-body">
                          <div class="stat-widget-five">
                              <div class="stat-icon dib flat-color-4">
                                  <i class="pe-7s-users"></i>
                              </div>
                              <div class="stat-content">
                                  <div class="text-left dib">
                                      <div class="stat-text"><span class="count">592</span></div>
                                      <div class="stat-heading">员工数量</div>
                                  </div>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
          <!-- /Widgets -->



      </div>
      <!-- .animated -->
    </consolePanel>
    <!-- /#right-panel -->
  </div>


</template>

<script>
  import Chart from 'chart.js';
  import navbar from "../components/Navbar.vue"
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  import * as api from "../request/api.js"
  var piechart;
  var compareSalesChart;
  export default {
    name: 'console',
    data () {
      return {
        data:{
          // id:"0001",
          // name:"永康路店",
          // location:"上海",
          // type:"餐饮",
          // date:"2020-01-22",
          // info:".......",
          // mangerName:"benson"
        }


      }
    },
    methods:{
      /**
       * 1. 获取门店信息数据
       */
      getData(){
        var obj={id:this.$store.getters.shopId};
        //发送请求
        api.getShopInfo(obj,"获取门店信息失败").then(res=>{
          console.log(res)
          if(res.data.status==0){
            this.data=res.data.data;
          }
        })
      },

      /**
       * 2. 初始
       */
      initial(){
        this.getData();
      },
      },
    components:{
      navbar,
      sidebar,
      consolePanel,
      console,
    },
    created() {
      let _this=this;
      window.getSalesOrderList=_this.getSalesOrderList; //对于使用原生onclick的元素要调用vue的方法，必须用此步骤将vue方法设置成原生
    },
    mounted() {
      console.log("console mount...")
      this.getData();
    }
  }
</script>

<style scoped>


</style>
