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
                      <h4 class=" display-5 pt-1" align="left">导入数据</h4>
                      <div v-if="!isExporting">
                        <button type="submit" :class="['btn','btn-outline-primary','btn-sm',{'disabled':isExporting}]" data-toggle="modal" data-target="#exportModal">
                          <i class="fa fa-dot-circle-o"></i> 导入
                        </button>
                      </div>
                  </div>
              </div>
          </div>
        </div>
        <!--/标题栏-->

        <!--进度条-->
        <div v-if="isExporting" class="row">
          <div class="col-lg-12">
              <div class="card">
                <div class="card-body">
                  <!-- <div class="col-12">导出中...</div> -->
                  <div class="progress">
                      <div class="progress-bar bg-success progress-bar-striped progress-bar-animated" role="progressbar" :style="{width: progressWidth}" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">{{progressWidth}}</div>
                  </div>
                </div>

              </div>
          </div>
        </div>
        <!--/进度条-->
        <!--提醒栏-->
        <div v-if="isExportSuccess" class="sufee-alert alert with-close alert-success alert-dismissible fade show" style="width:100%">
            <span class="badge badge-pill badge-success">通知</span>
            您已成功导入"{{type}}数据"到系统，系统正在计算，请于明天查看最新的决策数据！
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--/提醒栏-->
        <!--content-->
        <div class="row">
          <!--面板-->
          <div class="col-12">
              <div class="card pt-5 pb-5" style="height:auto">
                <div class="row" style="height:100%">
                  <div class="card-body d-flex justify-content-between pt-2 pl-4" style="height:100%">
                    <div class="col-6 ml-5 d-flex">
                        <p class="col-3" style="padding-top:3px">数据类型:</p>
                        <div class="col-6" style="margin-top: -3px;">
                          <select name="selectSm" id="typeSelect2" class="form-control form-control" @click="getDateData()">
                            <option data-type="day" value="salesData">销量数据</option>
                            <option data-type="week" value="returnData">退货数据</option>
                            <option data-type="month" value="commodityData">商品数据</option>
                            <option data-type="month" value="supplierData">供应商数据</option>
                          </select>
                        </div>
                    </div>
                    <div class="col-6 d-flex">
                        <p class="col-3" style="padding-top:3px">选择文件:</p>
                        <div class="col-7">
                            <input type="file" id="file-input" name="file-input" class="form-control-file" @change="">
                        </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>

          <!--/面板-->
          <!--导入数据弹窗-->
          <div  class="modal fade" id="exportModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
                  <div class="modal-dialog modal-md" role="document">
                      <div class="modal-content">
                          <div class="modal-header d-flex">
                              <div class="col-1"></div>
                              <h5 class="modal-title col-10" id="staticModalLabel">导入</h5>
                              <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                                  <span aria-hidden="true">&times;</span>
                              </button>
                          </div>
                          <div class="modal-body">
                             <p >
                                 确认导入数据到系统码？<br><small class=" mt-2"></small>
                             </p>

                         </div>
                         <div class="modal-footer">
                          <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                          <button type="button" class="btn btn-primary" @click="importData()">确定</button>
                          </div>
                  </div>
              </div>
          </div>
          <!--/导入数据弹窗-->
        </div>
        <!--/content-->
      </div>

    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../../components/Sidebar.vue"
  import consolePanel from "../../components/ConsolePanel.vue"
  import * as api from "../../request/api.js"
  var fileContent;
  export default {
    name: 'importData',
    data () {
      return {
        dates:[],
        salesDates:["2020-03-01","2020-02-28","2020-02-27","2020-02-26","2020-02-25"],
        returnDates:["2020-03-01","2020-02-28","2020-02-27"],
        isExporting:false,
        progressWidth:"50%",
        isExportSuccess:false,
        type:"销量",
      }
    },
    methods:{
      /**
       * 1. 根据选择获取相应数据
       */
      getDateData(){
        var type=$("#typeSelect2").find("option:selected").attr("value");
        if(type=="salesData"){
          this.dates=this.salesDates;
        }
        else if(type=="returnData"){
          this.dates=this.returnDates;
        }
        else{
          this.dates=[];
        }
      },
      /**
       * 2. 导入数据
       */
      importData(){
        var type=$("#typeSelect2").find("option:selected").attr("value");
        var file=document.getElementById("file-input");
        //console.log(file.value) //虚拟fake地址
        var fileObj=file.files[0];
        // var url=window.URL.createObjectURL(fileObj); //该文件的blob网络地址
        if(!fileObj){
          alert("请选择文件！")
          return;
        }

        changeProgress(50);
        this.isExporting=true;
        this.isExportSuccess=false;
        //读取文件内容
        var fileString=null; 
        var reader = new FileReader();//新建一个FileReader
        reader.readAsText(fileObj, "UTF-8");
        reader.onload = function (evt) { //读取完文件之后会回来这里
          fileString = evt.target.result;
          var obj={type:type,fileContent:fileString};
          console.log(obj);
           api.importData(obj,"导入数据超时（系统已成功导入，正在计算决策数据）").then(res=>{
             if(res.data.status==0){

             }
             else{
               changeIsExporting();
               alert("上传的文件类型错误")
               return;
             }
           }).catch(failResponse => {
              //显示失败toast
              changeProgress(100);
              if(type=="salesData"){
                changeType("销量")
              }else if(type=="returnData"){
                changeType("退货")
              }else if(type=="commodityData"){
                changeType("商品")
              }else if(type=="supplierData"){
                changeType("供应商")
              }

              setTimeout(() => {
                changeIsExporting();
                changeIsExportSuccess();
              }, 1000);
              return;
          });
          $('#exportModal').modal('hide');
        }


        // const promise = new Promise(() => {
        //   reader.onload = function (evt) { //读取完文件之后会回来这里
        //     fileString = evt.target.result;
        //     this.isExporting=false;
        //     console.log(fileString)
        //   }
        // };
        // promise.then(()=>{
        //   console.log(fileString)
        //   this.isExporting=false;
        // });




        // var formData = new FormData();
        // formData.append("fileTextttttt","ssssddddddd");
        // formData.append("file",fileObj);
        // console.log(formData.get("file"));
        // $.ajax({
        //                     url: "http://localhost:3182/importData",														//后台接收数据地址
        //                     //headers:{'Content-Type':'multipart/form-data'},//加上这个报错
        //                     data:formData,
        //                     type: "POST",
        //                     // dataType: "json",
        //                     cache: false,			//上传文件无需缓存
        //                     processData: false,		//用于对data参数进行序列化处理 这里必须false
        //                     contentType: false,
        //                     success:function(res){
        //                       console.log(res)
        //                         var result=res;
        //                         var code=result.code;
        //                         if (code=='0'){
        //                           alert("图片上传成功！");
        //                         }else{
        //                               alert("图片上传失败！");
        //                         }
        //                     },
        //                     failure: function (res) {

        //                     }
        //                 })

      },
      changeType(type){
        this.type=type;
      },
      changeIsExporting(){
        this.isExporting=!this.isExporting;
      },
      changeIsExportSuccess(){
        this.isExportSuccess=!this.isExportSuccess;
      },
      changeProgress(value){
        this.progressWidth=value+"%";
      },
      uploadFile(file) {    return new Promise(function(resolve, reject) {    let reader = new FileReader()
          reader.readAsArrayBuffer(file)
          reader.onload = function(evt) {
            fileContent=evt.target.result;
              //this.result=evt.target.result
              }
          })
      },
      async sleep() {
        var progress=25;
        for(var i=0;i<3;i++){
          console.log(i)
          progress+=25;
          var now = new Date();
          var exitTime = now.getTime() + 1000;
          while (true) {
            now = new Date();
            if (now.getTime() > exitTime)
              return;
          }
          changeProgress(progress)
          //setTimeout(changeProgress(progress),1000)
        }
        changeIsExportSuccess();

      },

      // /**
      //  * 2. 获取数据
      //  */
      // getData(){
      //   api.getUnExportDate("获取未被导出的销量和退货数据的日期失败").then(res=>{
      //     if(res.data.status==0){
      //       this.salesDates=res.data.data.salesDates;
      //       this.returnDates=res.data.data.returnDates;
      //     }
      //   })

      // },
      // /**
      //  * 3. 导出数据
      //  */
      // exportData(){
      //   var type=$("#typeSelect2").find("option:selected").attr("value");
      //   var dates =[];
      //   $('input[id="checkbox1"]:checked').each(function(){
      //   dates.push($(this).val());
      //   });
      //   if(this.dates.length!=0&&dates.length==0){
      //     alert("请选择日期!")
      //     return
      //   }
      //   var obj={type:type,dates:dates};
      //   console.log(obj)
      //   $('#exportModal').modal('hide');
      //   this.isExporting=true;
      //   //发送请求
      //   api.exportData(obj,"导出数据失败").then(res=>{
      //     if(res.data.status==0){
      //       this.progressWidth="100%";
      //       this.isExportSuccess=true;
      //       this.isExporting=false;
      //     }
      //     else{
      //       alert("导出失败！")
      //       this.isExporting=false;
      //     }
      //   }).catch(failResponse => {
      //        //显示失败toast
      //        alert("导出失败！")
      //        this.isExporting=false;
      //    });

      // }

    },
    components:{
      sidebar,
      consolePanel
    },
    mounted() {

    },
    created() {
      let _this=this;
      window.changeIsExporting=_this.changeIsExporting; //对于使用原生onclick的元素要调用vue的方法，必须用此步骤将vue方法设置成原生
      window.changeIsExportSuccess=_this.changeIsExportSuccess;
      window.changeProgress=_this.changeProgress;
      window.sleep=_this.sleep;
      window.changeType=_this.changeType;
    },
  }
</script>

<style>
</style>
