<template>
  <div id="main" >

    <sidebar></sidebar>
    <consolePanel >
      <!-- Animated -->
      <div class="animated fadeIn ">
        <!--提醒栏-->
        <div class="sufee-alert alert with-close alert-success alert-dismissible fade show" style="width:100%">
            <span class="badge badge-pill badge-success">通知</span>
            您好，检测到您管理的门店有<label v-if="shopList.name!='所有门店'" v-for="shopList in shopLists">"{{shopList.name}}"、</label>.<br>以下是所有门店的信息总览
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--/提醒栏-->
        <!--标题栏-->
        <div class="row">
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-body d-flex justify-content-between">
                      <h4 class=" display-5" align="left"><b>控制台</b></h4>
                  </div>
              </div>
          </div>
        </div>
        <!--/标题栏-->

        <div class="row">
          <!--实际与预测对比折线图-->
          <div class="col-12">
              <div class="card">
                <div class="row">
                  <div class="card-body d-flex justify-content-between">
                          <h4 align="left" class=" pt-2 display-5 col-4" style="display: inline; float: left;">预测总销量与实际总销量图</h4>
                          <div class="col-8 d-flex p-1 pr-3 justify-content-end">

                            <p class="col-1" style="padding-top:3px">单位:</p>
                            <div class="col-2" style="margin-top: -3px;">
                              <select name="selectSm4" id="typeSelect4" class="form-control form-control">
                                <option data-type="day" value="今日">天</option>
                                <option data-type="week" value="本周">周</option>
                                <option data-type="month" value="本月">月</option>
                              </select>
                            </div>
                            <p class="col-1 " style="padding-top:3px">门店:</p>
                            <div class="col-3" style="margin-top: -3px;">
                              <select name="selectSm2" id="typeSelect2" class="form-control form-control">
                                <option v-for="shopList in shopLists"  :value="shopList.id">{{shopList.name}}</option>
                              </select>
                            </div>
                            <div>
                              <button type="submit" class="btn btn-outline-primary btn-sm" @click="getData1()">
                                <i class="fa fa-dot-circle-o"></i> Submit
                              </button>
                            </div>
                          </div>
                  </div>
                  <div class="col-9" >
                      <div class="card-body" style="height: 50vh; width: 100%;">
                         <canvas id="predictSalesChart" ></canvas>
                      </div>
                  </div>
                  <div class="col-3 pt-3">
                      <div class="card-body mt-1">
                          <div class="progress-box progress-1">
                              <h4 class="por-title">准确率</h4>
                              <div id="correctRate" class="por-txt">{{correctRate}}</div>
                              <div class="progress mb-2" style="height: 5px;">
                                  <div class="progress-bar bg-flat-color-1" role="progressbar" :style="{width:correctRate}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                          </div>


                          <div class="progress-box progress-2">
                              <h4 class="por-title">偏差率</h4>
                              <div class="por-txt">{{faultRate}}</div>
                              <div class="progress mb-2" style="height: 5px;">
                                  <div class="progress-bar bg-flat-color-4" role="progressbar" :style="{width:faultRate}" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100"></div>
                              </div>
                          </div>
                      </div> <!-- /.card-body -->
                  </div>
                </div>
              </div>
          </div>
          <!--/实际与预测对比折线图-->
          <!--退货预测图-->
          <div class="col-12">
              <div class="card">
                <div class="card-body d-flex justify-content-between pl-1 pr-1">
                        <h4 align="left" class=" pt-2 display-5 col-4" style="display: inline; float: left;">总退货预测图</h4>
                        <div class="col-8 d-flex p-1 pr-3 justify-content-end">


                          <p class="col-1 " style="padding-top:3px">门店:</p>
                          <div class="col-3" style="margin-top: -3px;">
                            <select name="selectSm3" id="typeSelect3" class="form-control form-control">
                              <option v-for="shopList in shopLists"  :value="shopList.id">{{shopList.name}}</option>
                            </select>
                          </div>
                          <div>
                            <button type="submit" class="btn btn-outline-primary btn-sm" @click="getData2()">
                              <i class="fa fa-dot-circle-o"></i> Submit
                            </button>
                          </div>
                        </div>
                </div>
                <div class="card-body" style="height: 47vh; width: 100%;">
                    <canvas id="sales-chart"></canvas>
                </div>
              </div>
          </div>
          <!--/退货预测图-->
          <!--门店列表-->
          <div class="col-12">
            <div class="card">
              <div class="col-lg-12 p-0">
                    <div class="card-header d-flex pt-4">
                      <div class="col-5"></div>
                      <strong class="card-title col-2">门店列表</strong>
                      <div class="col-5 d-flex justify-content-end p-0">

                      </div>
                    </div>
                    <div class="table-stats order-table ov-h container-table">
                        <table class="table " id="salesListTable">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th data-sortable="true">门店名</th>
                                    <th data-sortable="true">位置</th>
                                    <th data-sortable="true">今日销量</th>
                                    <!-- <th>今日退货率</th>
                                    <th>单价</th> -->
                                    <th style="text-align:center">今日退货量</th>
                                </tr>
                            </thead>
                            <tbody  id="dataBody">
                                <tr v-for="shop,index in shops">
                                    <td>{{index+1}}</td>
                                    <td>
                                        {{shop.name}}
                                    </td>
                                    <td>{{shop.location}}</td>
                                    <td>  <span class="name">{{shop.sales}}<label v-if="shop.salesTrend" class="fa fa-arrow-up ml-2" style="color:#00BB25"></label><label v-if="!shop.salesTrend" class="fa fa-arrow-down ml-2" style="color:#F70909"></label></span> </td>
                                    <td style="text-align:center"> <span class="product">{{shop.returnRate}}<label v-if="shop.salesTrend" class="fa fa-arrow-up ml-2" style="color:#F70909"></label><label v-if="!shop.salesTrend" class="fa fa-arrow-down ml-2" style="color:#00BB25"></label></span> </td>
                                </tr>

                            </tbody>
                        </table>
                    </div> <!-- /.table-stats -->

                <!-- </div> -->
              </div>
              <!--分页栏-->
              <nav aria-label="...">
                <ul class="pagination d-flex justify-content-center mt-5" id="pagination">

                </ul>
              </nav>
              <!--/分页栏-->

            </div>
          </div>
          <!--/门店列表-->
        </div>
      </div>
    </consolePanel>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import sidebar from "../../components/Sidebar.vue"
  import consolePanel from "../../components/ConsolePanel.vue"
  import * as api from "../../request/api.js"
  import navbar from "../../components/Navbar.vue"
  var compareChart;
  var returnRateChart;
  export default {
    name: 'consoleView',
    data () {
      return {
        shopLists:[],
        data1:{ //存放预测总销量与实际总销量图的数据
          times:["2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6", ],   // time:[ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
          actual:[10,32,22,44,22,99,104,33,34,10,32,22,44,22,99,104,33,30,32,22,44,22,99,104,33,34,10,32,22,44,22,9],     // actual:[ 0, 30, 15, 110, 50, 63, 120 ],
          predict:[ 1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 63,1, 30, 15, 110, 50, 63,1, 30, 15,  ],

        },
        data2:{ //存放未来7日总退货预测图的数据
          times:["2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1"],
          result:[11.12,20.11111,3,7.11,5,7,22]
        },
        shops:[ //存放所有门店的总览
          {
            id:"001",
            name:"淮海路店",
            location:"上海",
            sales:10,   //今日销量
            salesTrend:true,  //较前一天的销量，true为增长，false为下降
            returnRate:"15" ,//今日退货率
            returnRateTrend:false,  //较前一天的退货率，true为增长，false为下降
          },
        ],
        correctRate:"0%",    //"53.333333333333336%",
        faultRate:"0%",  //"31.818181818181817%"


      }
    },
    methods:{
      /**
       1. 生成预测与实际销量对比折线图
       */
      setSalesChart(){
        if (compareChart) {
          compareChart.destroy();
        }
        //Sales chart
            var ctx = document.getElementById( "predictSalesChart" );
            //ctx.height = 290;
            compareChart = new Chart( ctx, {
                type: 'line',
                data: {
                    labels: this.data1.times,
                    type: 'line',
                    defaultFontFamily: 'Montserrat',
                    datasets: [ {
                        label: "实际销量",
                        data: this.data1.actual,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(220,53,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
                            }, {
                        label: "预测销量",
                        data: this.data1.predict,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(40,167,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(40,167,69,0.75)',
                            } ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#000',
                        bodyFontColor: '#000',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Montserrat',
                        bodyFontFamily: 'Montserrat',
                        cornerRadius: 3,
                        intersect: false,
                        custom: function(tooltipModel) {      //todo
                          if (tooltipModel.body) {
                            getCorrectAndFaultRate(tooltipModel);
                                  // Event when user hover on a bar
                              } else {
                                  // Event when mouse leave
                              }
                        }
                    },
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: true,
                            fontFamily: 'Montserrat',
                        },
                    },
                    scales: {
                        xAxes: [ {
                            display: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                                } ],
                        yAxes: [ {
                            display: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                                } ]
                    },
                    title: {
                        display: false,
                        text: 'Normal Legend'
                    }
                }
            } );
      },
      /**
       * (2) 计算准确率和偏差率
       * @param {Object} tooltipModel
       */
      getCorrectAndFaultRate(tooltipModel){
        try{
          var actual = tooltipModel.dataPoints[0].yLabel;
          var predict = tooltipModel.dataPoints[1].yLabel;
          //console.log(Math.abs(actual-predict)/actual)*100+"%");
          this.faultRate=(Math.abs(actual-predict)/actual)*100+"%";
          this.correctRate=100-(Math.abs(actual-predict)/predict)*100+"%";
         // this.correctRate=((1-Math.abs(actual-predict)/actual)*100+"%");
        }
        catch(err){
          console.log("不存在预测数据")
        }
      },
      /**
       3. 生成退货预测率图（未来7日）
       */
      setReturnRateChart(){
        if(returnRateChart){
          returnRateChart.destroy();
        }
        //Sales chart
            var ctx = document.getElementById( "sales-chart" );
            //ctx.height = 290;
            returnRateChart = new Chart( ctx, {
                type: 'line',
                data: {
                    labels: this.data2.times,
                    type: 'line',
                    defaultFontFamily: 'Montserrat',
                    datasets: [ {
                        label: "退货量",
                        data: this.data2.result,
                        backgroundColor: 'transparent',
                        borderColor: '#5800DD',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
                            }, ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        mode: 'index',
                        titleFontSize: 12,
                        titleFontColor: '#000',
                        bodyFontColor: '#000',
                        backgroundColor: '#fff',
                        titleFontFamily: 'Montserrat',
                        bodyFontFamily: 'Montserrat',
                        cornerRadius: 3,
                        intersect: false,
                    },
                    legend: {
                        display: false,
                        labels: {
                            usePointStyle: true,
                            fontFamily: 'Montserrat',
                        },
                    },
                    scales: {
                        xAxes: [ {
                            display: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            scaleLabel: {
                                display: false,
                                labelString: 'Month'
                            }
                                } ],
                        yAxes: [ {
                            display: true,
                            gridLines: {
                                display: false,
                                drawBorder: false
                            },
                            scaleLabel: {
                                display: true,
                                labelString: 'Value'
                            }
                                } ]
                    },
                    title: {
                        display: false,
                        text: 'Normal Legend'
                    }
                }
            } );
      },
      /**
       * 4. 获取门店的预测总销量与实际总销量
       */
      getData1(){
        var type=$("#typeSelect4").find("option:selected").attr("data-type");
        var storeId=[];
        var id=$("#typeSelect2").find("option:selected").attr("value");
        if(id==null)
          id="all";
        if(id=="all"){
          let shops=this.$store.getters.userInfo.shops;
          for(let i=0;i<shops.length;i++){
            storeId.push(shops[i].id)
          }
        }else{
          storeId.push(id);
        }
        var obj={storeId:storeId,type:type};
        console.log(obj)
        //请求获取所有门店的预测总销量与实际总销量
        api.getAllPredictSales(obj,"获取门店的预测总销量与实际总销量失败").then(res=>{
          if(res.data.status==0){
            this.data1=res.data.data;
          }
        })
      },
      /**
       * 5. 获取未来7日总的预测退货率
       */
      getData2(){
        var storeId=[];
        var id=$("#typeSelect3").find("option:selected").attr("value");
        if(id==null)
          id="all";
        if(id=="all"){
          let shops=this.$store.getters.userInfo.shops;
          for(let i=0;i<shops.length;i++){
            storeId.push(shops[i].id)
          }
        }else{
          storeId.push(id);
        }
        var obj={storeId:storeId};
        console.log(obj)
        //请求获取未来7日总的预测退货率
        api.getAllPredictReturn(obj,"获取未来7日总的预测退货率失败").then(res=>{
          if(res.data.status==0){
            this.data2=res.data.data;
          }
        })
      },
      /**
       * 8.获取所有门店的总览信息
       */
      getShops(){
        var storeId=[];
        let shops=this.$store.getters.userInfo.shops;
        for(let i=0;i<shops.length;i++){
          storeId.push(shops[i].id)
        }
        var obj={storeId:storeId};
        console.log(obj)
        //请求获取所有门店的总览信息
        api.getAllShopInfo(obj,"获取所有门店的总览信息失败").then(res=>{
          if(res.data.status==0){
            this.shops=res.data.data;
          }
        })
      }
    },
    components:{
      sidebar,
      consolePanel,
      navbar
    },
    created() {
      let _this=this;
      window.getCorrectAndFaultRate=_this.getCorrectAndFaultRate; //对于使用原生onclick的元素要调用vue的方法，必须用此步骤将vue方法设置成原生
    },
    mounted() {
      this.shopLists.push({id:"all",name:"所有门店"})
      var shops=this.$store.getters.userInfo.shops;
      for(let i=0;i<shops.length;i++){
        this.shopLists.push(shops[i])
      }

      this.getData1();
      this.getData2();
      this.getShops();
      this.setSalesChart();
      this.setReturnRateChart();
    }
  }
</script>

<style>
</style>
