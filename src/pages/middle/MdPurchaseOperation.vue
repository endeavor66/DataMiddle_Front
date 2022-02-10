<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!-- Animated -->
      <!--FirstStep-->
      <div class="animated fadeIn first" :style="{display: step1}">
        <!--步骤导航-->
        <nav class="breadcrumb" style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>智能采购</b></h4>
          <span class="breadcrumb-item isActive"><strong>推荐商品</strong></span>
          <span class="breadcrumb-item noActive" >推荐供应商</span>
          <span class="breadcrumb-item noActive">生成采购单</span>

          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="cancelPurchaseBtn  btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->
        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">推荐商品清单</h3>
                  <div class="col-4 d-flex justify-content-end p-0">
                    <!-- <button type="button" class="btn  mb-1 iconBtn"  data-toggle="modal" data-target="#addModal">
                        <i class="menu-icon fa fa-plus"></i>
                    </button> -->
                    <button v-on:click="modifyCommodity" type="button" class="btn  mb-1 iconBtn" >
                        <i class="menu-icon fa fa-cogs"></i>
                    </button>
                    <div class="d-flex justify-content-between" id="modifyCol" style="display:none!important;">
                      <div>
                        <button type="submit" id="finishModifyBtn" @click="finishModifyingCommodity" class="modifyColItem btn btn-outline-primary btn-sm">
                          <i class="fa fa-dot-circle-o"></i> 完成
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                <!--订单列表-->
                <table class="table ">
                    <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">编号</th>
                          <th scope="col">名称</th>
                          <th scope="col">数量</th>
                          <th scope="col">推荐理由</th>
                          <th scope="col">查看</th>
                          <th scope="col">选择</th>
                          <th id="tbModify" scope="auto" style="width:190px;display: none;">操作</th>

                        </tr>
                    </thead>
                    <tbody v-for="product,index in products">
                      <tr>
                          <th scope="row">{{index+1}}</th>
                          <td>{{product.id}}</td>
                          <td>{{product.name}}</td>
                          <td>{{product.count}}</td>
                          <td>{{product.reason}}</td>
                          <td style="text-align: center;">
                            <button type="button" class="btn btn-link p-0" @click="showSelectedMaterials($event)">查看原料</button>
                          </td>
                          <td class="pl-5">
                            <input type="checkbox" id="checkbox1" name="checkbox1" :value="product.id" class="form-check-input">
                          </td>
                          <td class="tbModifyItem " style="display: none;">
                            <button type="button" @click="product.count>1?product.count--:product.count" class="btn pt-0 pb-0 pl-2 " style="height:fit-content">
                              <i class="menu-icon fa fa-minus"></i>
                            </button>
                            <p class="mb-0" style="display: inline;">数量</p>
                            <button type="button" @click="product.count++" class="btn pt-0 pb-0 pl-2 " style="height:fit-content">
                              <i class="menu-icon fa fa-plus"></i>
                            </button>

                          </td>

                      </tr>
                      <tr style="display:none" class="showMaterialsTr">
                        <td colspan="8">
                          <div class="d-flex row justify-content-around"  v-for="material,index in product.materials">
                            <div  class="d-flex col-11 justify-content-space ">
                               <div class="col-2"><p class="mb-0"><small>#{{index}}</small></p></div>
                               <div class="col-2"><p class="mb-0"><small>编号:&emsp;{{material.id}}</small></p></div>
                               <div class="col-2"><p class="mb-0"><small>名称:&emsp;{{material.name}}</small></p></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                </table>
                <!--/订单列表-->


            </div>

        </div>
        <!--/content-->
        <!--foot-->
        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-end">
              <button type="button" @click="selectCommodity();" class="btn btn-outline-primary btn-lg col-2" >下一步</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>
        <!--/foot-->
      </div>
      <!--/FirstStep-->
      <!--SecondStep-->
      <div class="animated fadeIn second" :style="{display: step2}">
        <!--步骤导航-->
        <nav class="breadcrumb" style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>智能采购</b></h4>
          <span class="breadcrumb-item noActive">推荐商品</span>
          <span class="breadcrumb-item isActive" ><strong>推荐供应商</strong></span>
          <span class="breadcrumb-item noActive">生成采购单</span>
          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="cancelPurchaseBtn  btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->

        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">推荐供应商列表</h3>
                  <div class="col-4 d-flex justify-content-end p-0 mb-2">

                  </div>
                </div>

                <!--订单列表-->
                <table class="table ">
                    <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">编号</th>
                          <th scope="col">名称</th>
                          <th scope="col">数量</th>
                          <th scope="col">推荐理由</th>
                          <th scope="col">查看</th>
                        </tr>
                    </thead>
                    <tbody v-if="product.isSelected" v-for="product,index in products">
                      <tr >
                          <th scope="row">{{index+1}}</th>
                          <td>{{product.id}}</td>
                          <td>{{product.name}}</td>
                          <td>{{product.count}}</td>
                          <td>{{product.reason}}</td>
                          <td style="text-align: center;">
                            <button type="button" class="btn btn-link p-0" @click="showSelectedMaterials2($event)">查看原料</button>
                          </td>
                      </tr>
                      <tr style="display:none" class="showMaterialsTr">
                        <!-- <td colspan="1"></td> -->
                        <td colspan="6" class="p-0">
                          <table class="table">
                            <tbody v-for="material,index in product.materials">
                              <tr >
                                 <!-- <th scope="row"></th> -->

                                  <!-- <th scope="row">{{index+1}})</th> -->
                                  <td colspan="1">{{index+1}})</td>

                                  <td colspan="1">{{material.id}}</td>

                                  <td colspan="1">{{material.name}}</td>

                                  <td style="text-align: center;" class="d-flex">
                                    <div class="col-6"></div>
                                    <button type="button" class="btn btn-link p-0 col-6" @click="showSupplier($event)">选择供应商</button>
                                  </td>
                              </tr>
                              <tr style="display:none" >
                                <td colspan="6">
                                  <div class="d-flex row justify-content-end">
                                    <div  class="d-flex col-11 justify-content-space" v-for="allSupplier,index in material.allSuppliers">
                                       <div col-1><p>({{index+1}})</p></div>
                                       <div class="col-10 d-flex">
                                         <div class="col-2"><p><small>{{allSupplier.name}}</small></p></div>
                                         <div class="col-2"><p><small>位置:{{allSupplier.location}}</small></p></div>
                                         <div class="col-2"><p><small>单价:￥{{allSupplier.price}}</small></p></div>
                                         <div class="col-2"><p><small>合作值:{{allSupplier.star}}</small></p></div>
                                         <div class="col-2"><p><small>运输时间系数:{{allSupplier.time_parameter}}</small></p></div>
                                         <div class="col-2"><p><small>运输价格系数:￥{{allSupplier.fare_parameter}}</small></p></div>
                                       </div>
                                       <div class="col-1">
                                         <input type="radio" id="supplierRadio" :name="product.id+material.id" :data-name="allSupplier.name" :data-location="allSupplier.location" :data-price="allSupplier.price" :data-star="allSupplier.star" :data-time_parameter="allSupplier.time_parameter" :data-fare_parameter="allSupplier.fare_parameter" :class="['form-check-input','ml-0','selectRadio',material.id]">
                                       </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>

                    </tbody>
                </table>
                <!--/订单列表-->

            </div>
        </div>
        <!--/content-->
        <!--foot-->
        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-between">
              <button type="button" @click="step2='none';step1='block'" class="btn btn-outline-primary btn-lg col-2" >上一步</button>
              <button type="button" @click="selectSuppliers();" class="btn btn-outline-primary btn-lg col-2" >下一步</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>
        <!--/foot-->
      </div>
      <!--/SecondStep-->
      <!--ThirdStep-->
      <div class="animated fadeIn second" :style="{display: step3}">
        <!--步骤导航-->
        <nav class="breadcrumb" style="background-color:white">
          <h4 style="width:100%" align="left" class=" mb-4"><b>智能采购</b></h4>
          <span class="breadcrumb-item noActive">推荐商品</span>
          <span class="breadcrumb-item noActive" >推荐供应商</span>
          <span class="breadcrumb-item isActive"><strong>生成采购单</strong></span>
          <div class="col-md-12 d-flex justify-content-end mr-0  "  style="margin-top:-2rem">
            <button type="submit"   class="cancelPurchaseBtn  btn btn-outline-primary btn-sm" style="display: block;" data-toggle="modal" data-target="#cancelPurchaseModal">
              <i class="fa fa-minus-circle"></i> 取消采购
            </button>
          </div>
        </nav>
        <!--/步骤导航-->
        <!--提示toast-->
        <div v-if="submitSuccess" class=" alert with-close alert-primary alert-dismissible fade show">
            <span class="badge badge-pill badge-primary">提交成功！</span>
            3秒后将自动跳转到采购记录...
            <button type="button" class="close" @click="submitSuccess=!submitSuccess;" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div v-if="submitFail" class=" alert with-close alert-danger alert-dismissible fade show">
            <span class="badge badge-pill badge-danger">提交失败！</span>
            请稍后重试...
            <button type="button" class="close" @click="submitFail=!submitFail;" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <!--/提示toast-->
        <!--content-->
        <div class="card d-flex justify-content-center">
            <div class="card-body">
                <div class="d-flex justify-content-between">
                  <div class="col-4"></div>
                  <h3 class="mb-3 col-3">采购清单</h3>
                  <div class="col-4 d-flex justify-content-end pt-2">
                    <p>操作人：{{operator}}</p>
                    <p class="ml-4">时间：{{date}}</p>
                  </div>
                </div>

                <!--订单列表-->
                <div id="page-content">
                <table class="table " id="listTable">
                    <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">编号</th>
                          <th scope="col">名称</th>
                          <th scope="col">数量</th>
                          <th scope="col">推荐理由</th>
                          <th scope="col">查看</th>
                        </tr>
                    </thead>
                    <tbody v-if="product.isSelected" v-for="product,index in products">
                      <tr >
                          <th scope="row">{{index+1}}</th>
                          <td>{{product.id}}</td>
                          <td>{{product.name}}</td>
                          <td>{{product.count}}</td>
                          <td>{{product.reason}}</td>
                          <td style="text-align: center;">
                            <button type="button" class="btn btn-link p-0" @click="showSelectedMaterials2($event)">查看原料</button>
                          </td>
                      </tr>
                      <tr style="display:none" class="showMaterialsTr">
                        <!-- <td colspan="1"></td> -->
                        <td colspan="6" class="p-0">
                          <table class="table">
                            <tbody v-for="material,index in product.materials">
                              <tr >
                                 <!-- <th scope="row"></th> -->

                                  <!-- <th scope="row">{{index+1}})</th> -->
                                  <td colspan="1">{{index+1}})</td>

                                  <td colspan="1">{{material.id}}</td>

                                  <td colspan="1">{{material.name}}</td>

                                  <td style="text-align: center;" class="d-flex">
                                    <div class="col-6"></div>
                                    <button type="button" class="btn btn-link p-0 col-6" @click="showSupplier($event)">查看供应商</button>
                                  </td>
                              </tr>
                              <tr v-if="material.selectedSupplier" style="display:none" >
                                <td colspan="6">
                                  <div class="d-flex row justify-content-end">
                                    <div  class="d-flex col-11 justify-content-space" >
                                       <div col-1><small><p>详情：</p></small></div>
                                       <div class="col-11 d-flex">
                                         <div class="col-2"><p><small>{{material.selectedSupplier.name}}</small></p></div>
                                         <div class="col-2"><p><small>位置:{{material.selectedSupplier.location}}</small></p></div>
                                         <div class="col-2"><p><small>单价:￥{{material.selectedSupplier.price}}</small></p></div>
                                         <div class="col-2"><p><small>合作值:{{material.selectedSupplier.star}}</small></p></div>
                                         <div class="col-2"><p><small>运输时间系数:{{material.selectedSupplier.time_parameter}}</small></p></div>
                                         <div class="col-2"><p><small>运输价格系数:￥{{material.selectedSupplier.fare_parameter}}</small></p></div>
                                       </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    </tbody>
                </table>
                </div>
                <!--/订单列表-->
            </div>
        </div>
        <!--/content-->

        <div class="card d-flex justify-content-center">
          <div class="card-body">
            <!--下一步按钮-->
            <div class="d-flex justify-content-between">
              <button type="button" @click="step3='none';step2='block';showAllSuppliers()" :class="['btn','btn-outline-primary','btn-lg','col-2']" >上一步</button>
              <button type="button"  :class="['btn','btn-outline-primary','btn-lg','col-2']"data-toggle="modal" data-target="#exportModal">导出</button>
            </div>
            <!--/下一步按钮-->
          </div>
        </div>

      </div>
      <!--/ThirdStep-->

      <!--取消采购弹窗-->
      <div  class="modal fade" id="cancelPurchaseModal" tabindex="-1" role="dialog" aria-labelledby="staticModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm" role="document">
                  <div class="modal-content">
                      <div class="modal-header d-flex">
                          <div class="col-1"></div>
                          <h5 class="modal-title col-10" id="staticModalLabel">取消采购</h5>
                          <button type="button" class="close col-1 p-0 m-0" data-dismiss="modal" aria-label="Close">
                              <span aria-hidden="true">&times;</span>
                          </button>
                      </div>
                      <div class="modal-body">
                          <p>
                             确定要取消此次采购操作吗？
                         </p>
                     </div>
                     <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-primary" @click="cancelPurchase()" >确定</button>
                  </div>
              </div>
          </div>
      </div>
      <!--/取消采购弹窗-->
      <!--导出采购单弹窗-->
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
                             确认导出采购单吗？<br><small class=" mt-2"></small>
                         </p>

                     </div>
                     <div class="modal-footer">
                      <button type="button" class="btn btn-secondary" data-dismiss="modal">取消</button>
                      <button type="button" class="btn btn-primary" @click="finishPurchaseOperation()">确定</button>
                  </div>
              </div>
          </div>
      </div>
      <!--/导出采购单弹窗-->
    </consolePanel>
  </div>
</template>

<script>
  import sidebar from "../../components/Sidebar.vue"
  import consolePanel from "../../components/ConsolePanel.vue"
   import * as api from "../../request/api.js"
   import * as csv from "../../assets/js/export/export2CSV.js"
  //  import * as word from "../../assets/js/export/jquery.wordexport.js"
  // import
  export default {
    name: 'mdPurchaseOperation',
    data () {
      return {
        id:"",      //采购id
        operator:"未知人员",
        date:"",
        products:[    //推荐的商品
          // {//count:1, //isSelected:false, //是否被选择
          //   id:"001",
          //   name:"商品1",
          //   reason:"推荐的",
          //   materials:[
          //     { //selectedSupplier:{},
          //       id:"0001",
          //       name:"原料1",
          //       allSuppliers:[
          //         {
          //           id:"00001",
          //           name:"阿里巴巴",
          //           location:"浙江",
          //           price:"23",   //todo
          //           star:"23",     //合作分值
          //           time_parameter:"33",    //运输时间系数
          //           fare_parameter:"44", //运输价格系数
          //         },
          //       ]
          //     },
          //   ]
          // },

        ],


        step1:"none",
        step2:"none",
        step3:"none",
        submitSuccess:false,
        submitFail:false,


      }
    },
    methods:{
      /**
       * 1. 修改商品
       */
      modifyCommodity(){
        var tbModify=document.getElementById( "tbModify" );
        tbModify.style.display="table-cell";

        var tbModifyItems=document.getElementsByClassName("tbModifyItem");
        var i;
        for (i = 0; i < tbModifyItems.length; i++) {
            tbModifyItems[i].style.display = "table-cell";
        }
        var iconBtns=document.getElementsByClassName("iconBtn");
        for (i = 0; i < iconBtns.length; i++) {
            iconBtns[i].style.display = "none";
        }
        document.getElementById("modifyCol").style.display="block";
        var items=document.getElementsByClassName("modifyColItem");
        var i;
        for (i = 0; i < items.length; i++) {
            items[i].style.display = "block";
        }
      },
      /**
       * 2. 完成修改商品
       */
      finishModifyingCommodity(){
        document.getElementById("modifyCol").style.display="none";
        var items=document.getElementsByClassName("modifyColItem");
        var i;
        for (i = 0; i < items.length; i++) {
            items[i].style.display = "none";
        }

        var tbModify=document.getElementById( "tbModify" );
        tbModify.style.display="none";

        var tbModifyItems=document.getElementsByClassName("tbModifyItem");
        var i;
        for (i = 0; i < tbModifyItems.length; i++) {
            tbModifyItems[i].style.display = "none";
        }

        var iconBtns=document.getElementsByClassName("iconBtn");
        var i;
        for (i = 0; i < iconBtns.length; i++) {
            iconBtns[i].style.display = "block";
        }
      },
      /**
       * 3. 取消此次采购操作
       */
      cancelPurchase(){

         $('#cancelPurchaseModal').modal('hide');

      },
      /**
       * 4. 选择商品并加入采购单
       */
      selectCommodity(){
        var selectedCommodityId =[];
        $('input[id="checkbox1"]:checked').each(function(){
        selectedCommodityId.push($(this).val());
        });
        console.log(selectedCommodityId)
        if(selectedCommodityId.length==0){
            alert('请至少选择一件以上的推荐商品');
            return;
        }

        for(var j=0;j<this.products.length;j++){
          this.products[j].isSelected=false;
          for(var i=0;i<selectedCommodityId.length;i++){
            if(this.products[j].id==selectedCommodityId[i]){
              this.products[j].isSelected=true;
              break;
            }
          }
        }
        this.step1='none';this.step2='block';
        console.log(this.products)
      },
      /**
       * 5.显示供应商详情
       */
      showSupplier(e){
        console.log(e.target.parentNode.parentNode);
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
        // console.log(e.target.parentNode.parentNode.nextElementSibling);
      },
      /**
       * 6. 选择原料商品对应的供应商
       */
      selectSuppliers(){
        for(var j=0;j<this.products.length;j++){
          if(!this.products[j].isSelected){
            continue;
          }
          let materialList=this.products[j].materials;
          //检查是否存在未选择供应商的商品
          for(var i=0;i<materialList.length;i++){ //遍历每个Material原料，获取对应选中的供应商
            var material=materialList[i];
            if(material.allSuppliers.length==0){
              alert("该商品（编号："+this.products[j].id+"）存在暂且没有被供应商提供的原料，请重新选择商品！");
              return;
            }
            var selectedRadio=$("input[name='"+this.products[j].id+material.id+"']:checked")
            //var selectedRadio=$("."+material.id+":checked")   //该原料里选中的供应商放入该对象里，最多只有一个，因为是radio
            if(selectedRadio.length==0){
              alert("存在未选中供应商的原料，请选择供应商！");
              return;
            }
            this.products[j].materials[i].selectedSupplier={      //该商品的该原料选择的供应商
              name:selectedRadio.attr("data-name"),
              location:selectedRadio.attr("data-location"),
              price:selectedRadio.attr("data-price"),
              star:selectedRadio.attr("data-star"),
              time_parameter:selectedRadio.attr("data-time_parameter"),
              fare_parameter:selectedRadio.attr("data-fare_parameter"),
            }

          }
        }
        console.log(this.products)
        this.date=this.getDateTime();
        this.step2='none';this.step3='block';
      },
      /**
       * 7. 获取当前时间
       */
      getDateTime(){
        var myDate= new Date();
            var realYear = myDate.getFullYear();
            var myMonth = myDate.getMonth()+1;
            var realMonth=myMonth;
            var myDay = myDate.getDate();
            var realDay = myDay;
            var myHour = myDate.getHours();
            var realHours =myHour;
            var myMinute =myDate.getMinutes();
            var realMinute = myMinute;
            var mySecond =myDate.getSeconds();
            var realSecond = mySecond;
            if(myMonth<10){
                realMonth="0"+myMonth;
            }
            if(myDay<10){
                realDay= "0"+myDay;
            }
            if(myMinute<10){
                realMinute="0"+myMinute;
            }
            if(myHour<10){
                realHours="0"+myHour;
            }
            if(mySecond<10){
                realSecond="0"+mySecond;
            }
            var realDate = realYear +'-'+realMonth+'-'+realDay+' '+realHours+':'+realMinute+':'+realSecond;
            return realDate;
      },
      /**
       * 8. 显示已经选好的原料
       */
      showSelectedMaterials(e){
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
      },
      /**
       * 9. 显示已经选好的原料
       */
      showSelectedMaterials2(e){
        var detail=e.target.parentNode.parentNode.nextElementSibling;
        if(detail.style.display=="none"){
          detail.style.display="table-row";
        }
        else{
          detail.style.display="none";
        }
      },
      /**
       * 10.导出数据
       */
      finishPurchaseOperation(){
        console.log(this.products)
       // csv.JSONToExcelConvertor(this.products,"PurchaseLists","purchase",false,10);
      // var head=["id","name","reason","material"]
        //csv.saveHandler(this.products); //直接
        var data = {
                        fileName: "智能采购清单",//文档名
                        fileType: ".xls",//文档类型  经测试  可以doc xls html 其他的自己去试
                        isHeader:false,//是否显示页眉  *xls  不要设置页眉页脚  改为false
                        isFooter:true,//是否显示页脚  *xls  不要设置页眉页脚  改为false
                        //header: "End",//页眉标题
                        styles: $("#wordExPortCss"),//要导出的内容style
                        updateExportCss:$("#updateExportCss")//需要修改导出的word样式  宽度高度 margin之类的
                    }
                    $("#page-content").wordExport(data);
        $('#exportModal').modal('hide');
      },
      /**
       * 11.获取推荐的商品清单
       */
      getRecommendProduct(){
        var obj={storeId:this.$store.getters.shopId};
        //发送请求
        api.getRecommendProduct(obj,"获取推荐的商品清单失败").then(res=>{
          if(res.data.status==0){
            this.products=res.data.data;
            for(var i=0;i<this.products.length;i++){
              this.products[i].count=1;
            }
          }
        })
        this.step1="block"
      },
      /**
       * 12. 初始
       */
      initial(){
        this.operator=this.$store.getters.userInfo.name;
        this.id="" ;    //采购id
        this.date="";
        this.products=[];    //推荐的商品
        this.step1="block";
        this.step2="none";
        this.step3="none";
        this.getRecommendProduct();
      },
    },
    components:{
      sidebar,
      consolePanel
    },
    mounted() {
      this.operator=this.$store.getters.userInfo.name;
      if(!this.operator||this.operator=="未知人员"){
        alert("请重新登录！")
        this.$router.push('/login');
      }

      this.getRecommendProduct();
    }
  }
</script>

<style>
  .breadcrumb-item + .breadcrumb-item::before {
    content: ">";
  }
  .isActive{
    color:#007bff!important;
  }
  .noActive{
    color: #6c757d!important;
  }
  #map {
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
  }

  .mytitle {
      z-index: 1000;
      color: #fff;
      font-size: 16px;
      text-align: center;
      position: absolute;
      top: 10px;
      left: 40%;
      width: 20%;
  }
</style>
