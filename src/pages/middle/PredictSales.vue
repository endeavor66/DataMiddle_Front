<template>
  <div id="main">
    <sidebar></sidebar>
    <consolePanel>
      <!-- Animated -->
      <div class="animated fadeIn">

        <!--标题栏-->
        <div class="row">
          <div class="col-lg-12">
              <div class="card">
                  <div class="card-body d-flex justify-content-between">
                      <h4 class=" display-5" align="left">销售量预测</h4>
                      <div>
                        <button type="submit" class="btn btn-outline-primary btn-sm" data-toggle="modal" data-target="#exportModal">
                          <i class="fa fa-dot-circle-o"></i> 导出
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <!--/标题栏-->

        <!-- <div class="card"> -->
          <div class="row">
            <!--实际与预测对比折线图-->
            <div class="col-12">
                <div class="card">
                  <div class="row">
                    <div class="card-body d-flex justify-content-between">
                            <h4 align="left" class=" pt-2 display-5 col-4" style="display: inline; float: left;">商品预测销量与实际销量图</h4>
                            <div class="col-8 d-flex p-1 pr-3 justify-content-end">

                              <p class="col-1" style="padding-top:3px">单位:</p>
                              <div class="col-2" style="margin-top: -3px;">
                                <select name="selectSm" id="typeSelect2" class="form-control form-control">
                                  <option data-type="day" value="今日">天</option>
                                  <option data-type="week" value="本周">周</option>
                                  <option data-type="month" value="本月">月</option>
                                </select>
                              </div>
                              <p class="col-2 " style="padding-top:3px">商品编号:</p>
                              <input type="text" id="commodityIdInput" placeholder="id" class="form-control col-3 mr-3" style="margin-top:-3px">
                              <div>
                                <button type="submit" class="btn btn-outline-primary btn-sm" @click="getPredictData()">
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

            <!--导出弹窗-->
            <div  class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
                    <div class="modal-dialog modal-md" role="document">
                        <div class="modal-content">
                            <div class="modal-header d-flex">
                                <div class="col-1"></div>
                                <h5 class="modal-title col-10" id="staticModalLabel">导出</h5>
                                <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div class="modal-body">
                               <p >
                                   确认导出吗？<br><small class=" mt-2"></small>（格式：.json）
                               </p>

                           </div>
                           <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                            <button type="button" class="btn btn-primary" @click="exportData()">确定</button>
                        </div>
                    </div>
                </div>
            </div>
            <!--/导出弹窗-->
          </div>
        <!-- </div> -->


      </div>
    </consolePanel>
  </div>
</template>

<script>
  import Chart from 'chart.js';
  import sidebar from "../../components/Sidebar.vue"
  import consolePanel from "../../components/ConsolePanel.vue"
  import * as api from "../../request/api.js"
  import * as JsonExport from "../../assets/js/export/export2CSV.js"
  var compareChart;
  export default {
    name: 'predictSales',
    data () {
      return {
        type:"天",
        data:{
          // times:["2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6","2/1", "2/2", "2/3", "2/4", "2/5","2/6", ],   // time:[ "2012", "2013", "2014", "2015", "2016", "2017", "2018" ],
          // actual:[10,32,22,44,22,99,104,33,34,10,32,22,44,22,99,104,33,30,32,22,44,22,99,104,33,34,10,32,22,44,22,9],     // actual:[ 0, 30, 15, 110, 50, 63, 120 ],
          // predict:[ 1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 63,1, 30, 15, 110, 50, 63,1, 30, 15, 63,1, 30, 15, 110, 50, 63,1, 30, 15,  ],

        },
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
                    labels: this.data.times,
                    type: 'line',
                    defaultFontFamily: 'Montserrat',
                    datasets: [ {
                        label: "实际销量",
                        data: this.data.actual,
                        backgroundColor: 'transparent',
                        borderColor: 'rgba(220,53,69,0.75)',
                        borderWidth: 3,
                        pointStyle: 'circle',
                        pointRadius: 5,
                        pointBorderColor: 'transparent',
                        pointBackgroundColor: 'rgba(220,53,69,0.75)',
                            }, {
                        label: "预测销量",
                        data: this.data.predict,
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
       * (2)获取数据
       */
      getPredictData(){
        var commodityId=document.getElementById("commodityIdInput").value;
        var type=$("#typeSelect2").find("option:selected").attr("data-type");
        var obj={storeId:this.$store.getters.shopId,commodityId:commodityId,type:type};

        //发送请求
        api.getPredictSales(obj,"获取商品的预测销量失败").then(res=>{
          if(res.data.status==0){
            this.data=res.data.data;
            this.setSalesChart();
          }
        })
      },
      /**
       * (3) 计算准确率和偏差率
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
       * (4) 初始
       */
      initial(){
        this.data={};
        this.correctRate="0%";  //"53.333333333333336%",
        this.faultRate="0%";  //"31.818181818181817%"
        this.setSalesChart();
      },
      /**
       * 5.导出数据
       */
      exportData(){
       JsonExport.saveHandler(this.data,document.getElementById("commodityIdInput").value+"商品的预测销量")
        $('#exportModal').modal('hide');
      },
    },
    components:{
      sidebar,
      consolePanel,
    },
    mounted() {
      this.setSalesChart();
    },
    created() {
      let _this=this;
      window.getCorrectAndFaultRate=_this.getCorrectAndFaultRate; //对于使用原生onclick的元素要调用vue的方法，必须用此步骤将vue方法设置成原生
    },
  }

</script>

<style>
</style>
