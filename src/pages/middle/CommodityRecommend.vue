
<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!--标题栏-->
      <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body d-flex justify-content-between">
                    <h4 class=" display-5" align="left">商品推荐</h4>
                    <div>
                      <button type="submit" class="btn btn-outline-primary btn-sm"  data-toggle="modal" data-target="#exportModal">
                        <i class="fa fa-dot-circle-o"></i> 导出
                      </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!--/标题栏-->
      <div class="row d-flex justify-content-center">
        <div class="col-lg-12">
          <div class="card d-flex justify-content-center">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="col-4"></div>
                <h3 class="mb-3 col-3">商品推荐单</h3>
                <div class="col-4 d-flex justify-content-end p-0">
                  <button
                    type="button"
                    class="btn mb-1 iconBtn"
                    data-toggle="modal"
                    data-target="#outputModal"
                    title="导出"
                  >
                    <i class="menu-icon fa fa-share"></i>
                  </button>
                  <button
                    v-on:click="modifyCommodity"
                    type="button"
                    class="btn mb-1 iconBtn"
                    title="修改"
                  >
                    <i class="menu-icon fa fa-cogs"></i>
                  </button>
                  <div
                    class="d-flex justify-content-between"
                    id="modifyCol"
                    style="display: none !important"
                  >
                    <button
                      id="btn-change"
                      type="submit"
                      class="modifyColItem btn btn-sm btn-outline-primary"
                    >
                      <i class="fa fa-refresh"></i> 换一批
                    </button>
                    <button
                      id="btn-remove-all"
                      type="submit"
                      class="modifyColItem btn btn-sm btn-outline-primary"
                    >
                      <i class="fa fa-trash"></i> 全部移除
                    </button>
                    <div>
                      <button
                        type="submit"
                        id="finishModifyBtn"
                        @click="finishModifyingCommodity"
                        class="modifyColItem btn btn-outline-primary btn-sm"
                      >
                        <i class="fa fa-dot-circle-o"></i> 完成
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <!--订单列表-->
              <div id="page-content">
                <table class="table ">
                    <thead class="thead-dark">
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">编号</th>
                          <th scope="col">名称</th>
                          <th scope="col">推荐理由</th>
                          <th scope="col">查看</th>
                        </tr>
                    </thead>
                    <tbody v-for="product,index in products">
                      <tr>
                          <th scope="row">{{index+1}}</th>
                          <td>{{product.id}}</td>
                          <td>{{product.name}}</td>

                          <td>{{product.reason}}</td>
                          <td style="text-align: center;">
                            <button type="button" class="btn btn-link p-0" @click="showSelectedMaterials($event)">查看原料</button>
                          </td>
                      </tr>
                      <tr style="display:none" class="showMaterialsTr">
                        <td colspan="8">
                          <div class="d-flex row justify-content-around"  v-for="material,index in product.materials">
                            <div  class="d-flex col-11 justify-content-space ">
                               <div class="col-2"><p class="mb-0"><small>#{{index+1}}</small></p></div>
                               <div class="col-2"><p class="mb-0"><small>编号:&emsp;{{material.id}}</small></p></div>
                               <div class="col-2"><p class="mb-0"><small>名称:&emsp;{{material.name}}</small></p></div>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                </table>
              </div>
              <!--/订单列表-->
            </div>
          </div>
          <!--导出弹窗-->
          <div
            class="modal fade"
            id="outputModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="mediumModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-md" role="document">
              <div class="modal-content">
                <div class="modal-body">
                  <div class="card">
                    <div class="card-body">
                      <button
                        type="button"
                        class="close"
                        data-dismiss="modal"
                        aria-label="Close"
                      >
                        <span aria-hidden="true">&times;</span>
                      </button>
                      <h3 class="card-title">导出商品单</h3>
                      <p class="card-text">
                        请选择要导出的格式
                      </p>
                    </div>
                    <ul class="list-group list-group-flush">
                      <li class="list-group-item"><a href="#" class="text-primary">导出至pdf</a></li>
                      <li class="list-group-item"><a href="#" class="text-primary">导出至采购操作</a></li>
                    </ul>
                  </div>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    取消
                  </button>
                </div>
              </div>
            </div>
          </div>
          <!--/导出弹窗-->
          <!--删除商品弹窗-->
          <div
            class="modal fade"
            id="deleteModal"
            tabindex="-1"
            role="dialog"
            aria-labelledby="staticModalLabel"
            aria-hidden="true">
            <div class="modal-dialog modal-sm" role="document">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="staticModalLabel">移除商品</h5>
                  <button
                    type="button"
                    class="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div class="modal-body">
                  <p>
                    确定要从商品单中移除该商品吗？<br /><small class="mt-2"
                      >（商品编号：D235244）</small
                    >
                  </p>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-dismiss="modal"
                  >
                    取消
                  </button>
                  <button type="button" class="btn btn-primary">确定</button>
                </div>
              </div>
            </div>
          </div>
          <!--/删除商品弹窗-->
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
                                 确认导出商品推荐单吗？<br><small class=" mt-2"></small>（格式：.xls）
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
      </div>
    </consolePanel>
  </div>
</template>

<script>
import sidebar from "../../components/Sidebar.vue";
import consolePanel from "../../components/ConsolePanel.vue";
import * as api from "../../request/api.js"
export default {
  name: "productRepository",
  data() {
    return {
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
    };
  },
  methods: {
    /**
     * 1. 修改商品
     */
    modifyCommodity() {
      var tbModify = document.getElementById("tbModify");
      tbModify.style.display = "table-cell";

      var tbModifyItems = document.getElementsByClassName("tbModifyItem");
      var i;
      for (i = 0; i < tbModifyItems.length; i++) {
        tbModifyItems[i].style.display = "table-cell";
      }
      var iconBtns = document.getElementsByClassName("iconBtn");
      for (i = 0; i < iconBtns.length; i++) {
        iconBtns[i].style.display = "none";
      }
      document.getElementById("modifyCol").style.display = "block";
      var items = document.getElementsByClassName("modifyColItem");
      var i;
      for (i = 0; i < items.length; i++) {
        items[i].style.display = "block";
      }
    },
    /**
     * 2. 完成修改商品
     */
    finishModifyingCommodity() {
      document.getElementById("modifyCol").style.display = "none";
      var items = document.getElementsByClassName("modifyColItem");
      var i;
      for (i = 0; i < items.length; i++) {
        items[i].style.display = "none";
      }

      var tbModify = document.getElementById("tbModify");
      tbModify.style.display = "none";

      var tbModifyItems = document.getElementsByClassName("tbModifyItem");
      var i;
      for (i = 0; i < tbModifyItems.length; i++) {
        tbModifyItems[i].style.display = "none";
      }

      var iconBtns = document.getElementsByClassName("iconBtn");
      var i;
      for (i = 0; i < iconBtns.length; i++) {
        iconBtns[i].style.display = "block";
      }
    },
    /**
     * 3.导出数据
     */
    exportData(){
      var data = {
                      fileName: "推荐商品清单",//文档名
                      fileType: ".xls",//文档类型  经测试  可以doc xls html 其他的自己去试
                      isHeader:true,//是否显示页眉  *xls  不要设置页眉页脚  改为false
                      isFooter:true,//是否显示页脚  *xls  不要设置页眉页脚  改为false
                      header: "End",//页眉标题
                      styles: $("#wordExPortCss"),//要导出的内容style
                      updateExportCss:$("#updateExportCss")//需要修改导出的word样式  宽度高度 margin之类的
                  }
                  $("#page-content").wordExport(data);
      $('#exportModal').modal('hide');
    },
    /**
     * 4. 显示已经选好的原料
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
     * 5. 初始
     */
    initial(){

      this.products=[];    //推荐的商品
      this.getRecommendProduct();
    },
    /**
     * 12.获取推荐的商品清单
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
      //this.step1="block"
    },
  },
  components: {
    sidebar,
    consolePanel,
  },
  mounted() {
    this.initial();
  }
};
</script>

<style>
.form-control-label {
  width: 100%;
}

#btn-remove-all {
  margin-right: 1.2rem;
  height: fit-content;
}

#btn-change {
  margin-right: 1.2rem;
  height: fit-content;
}
</style>
