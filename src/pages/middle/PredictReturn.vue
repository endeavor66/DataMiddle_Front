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
                      <h4 class=" display-5" align="left">退货预测</h4>
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

        <!--content-->
        <div class="row">
          <!--面板-->
          <div class="col-12">
              <div class="card" style="height:440px">
                <div class="row" style="height:100%">
                  <div class="card-body d-flex justify-content-between">
                          <h4 align="left" class=" pt-2 display-5 col-4" style="display: inline; float: left;">退货预测信息</h4>
                          <div class="col-8 d-flex p-1 pr-3 justify-content-end">


                            <p class="col-2 " style="padding-top:3px">商品编号:</p>
                            <input type="text" id="commodityIdInput" placeholder="id" class="form-control col-3 mr-3" style="margin-top:-3px">
                            <div>
                              <button type="submit" class="btn btn-outline-primary btn-sm" @click="getReturnRate()">
                                <i class="fa fa-dot-circle-o"></i> Submit
                              </button>
                            </div>
                          </div>
                  </div>
                  <div class="col-5 ml-5">
                      <div class="card-body mt-5">
                        <strong>商品名称：{{data.name}}</strong>
                        <p>编号：{{data.id}}</p>
                      </div>

                  </div>
                  <div class="col-6 pt-3">
                      <!-- <div class="card-body mt-3">
                          <div class="progress-box progress-1">
                              <h4 class="por-title">退货率</h4>
                              <div class="por-txt">{{data.rate}}</div>
                              <div class="progress mb-2" style="height: 5px;">
                                  <div class="progress-bar bg-flat-color-1" role="progressbar" :style="{width:data.rate}"  aria-valuenow="25" aria-valuemin="0" aria-valuemax="100}"></div>
                              </div>
                          </div>
                      </div>-->
                      <div class="card-body" style="height: 100%; width: 100%;">
                          <canvas id="sales-chart" class="pb-5"></canvas>
                      </div>
                      <!--/退货预测图-->
                  </div>
                </div>
              </div>
          </div>
          <!--/面板-->
          <!--导出推荐单弹窗-->
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
          <!--/导出推荐单弹窗-->
        </div>
        <!--/content-->
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
  var returnRateChart;
  export default {
    name: 'predictReturn',
    data () {
      return {
        data:{
          id:"-",
          name:"-",
          times:["2/1", "2/2", "2/3"],
          result:[11.12,20.11111,3]
          // times:["2/1","2/2","2/3"],	//该商品2/1的退货量是11.12件，2/2的退货量是20.11111件，...
          // ​result:[11.12,20.11111,3,7.11,5,7,22]
        },
      }
    },
    methods:{
      /**
       * (1)获取退货率
       */
      getReturnRate(){
        var commodityId=document.getElementById("commodityIdInput").value;
        var obj={storeId:this.$store.getters.shopId,commodityId:commodityId}
        console.log(obj)
        //发送请求(todo)
        api.getPredictReturn(obj,"获取预测退货率失败").then(res=>{
          console.log(res)
          if(res.data.status==0){
            this.data=res.data.data;
            this.setReturnRateChart();
          }
        })
      },
      /**
       * 2. 初始
       */
      initial(){
        this.data={};
        //this.getReturnRate();
      },
      /**
       * 3.导出数据
       */
      exportData(){
       JsonExport.saveHandler(this.data,this.data.id+"商品的退货率")
        $('#exportModal').modal('hide');
      },
      /**
       4. 生成退货预测率图（未来3日）
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
                    labels: this.data.times,
                    type: 'line',
                    defaultFontFamily: 'Montserrat',
                    datasets: [ {
                        label: "退货量",
                        data: this.data.result,
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

    },
    components:{
      sidebar,
      consolePanel,
    },
    mounted() {
      this.initial();
      this.setReturnRateChart();
    }
  }
</script>

<style>
</style>
