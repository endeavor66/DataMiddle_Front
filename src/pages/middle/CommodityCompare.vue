<template>
  <div id="main">
    <sidebar></sidebar>

    <consolePanel>
      <!--标题栏-->
      <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-body d-flex justify-content-between">
                    <h4 class=" display-5" align="left">商品关联</h4>
                    <div>
                      <button type="submit" class="btn btn-outline-primary btn-sm" @click="exportData()">
                        <i class="fa fa-dot-circle-o"></i> 导出
                      </button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <!--/标题栏-->
      <div class="row d-flex justify-content-center">
        <div class="col-lg-12 row container-cards">
          <div class="card d-flex justify-content-center col-7">
            <div class="card-body">
              <div class="d-flex justify-content-between">
                <div class="col-3"></div>
                <h3 class="mb-3 col-6">商品比较</h3>
                <div class="col-3">
                  <button class="btn btn-outline-primary btn-sm">
                    <i class="fa fa-refresh"></i> 换一批
                  </button>
                </div>
              </div>

              <!--订单列表-->
              <table class="table table-commodity">
                <thead class="thead-dark">
                  <tr>
                    <th scope="col">商品1</th>
                    <th scope="col">商品2</th>
                    <th scope="col">关联度</th>
                    <th
                      id="tbModify"
                      scope="auto"
                      style="width: 170px; display: none"
                    >
                      操作
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>蛋黄酥
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>榴莲酥
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="text-success">100%</h4>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>冰糖雪梨
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>可口可乐
                        </h5>
                        <h6 class="card-title text-muted">DZ202220</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="text-warning">55%</h4>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>盐焗腰果
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>花生
                        </h5>
                        <h6 class="card-title text-muted">DZ201921</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="text-success">91%</h4>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>常温酸奶
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>土豆泥
                        </h5>
                        <h6 class="card-title text-muted">OPDD1220</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="text-danger">5%</h4>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>鸭脖
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>香辣鸡块
                        </h5>
                        <h6 class="card-title text-muted">OPDD1220</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="text-danger">5%</h4>
                      </div>
                    </div>
                  </tr>
                  <tr>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>红豆吐司
                        </h5>
                        <h6 class="card-title text-muted">DZ201920</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h5 class="card-title">
                          <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>全麦面包
                        </h5>
                        <h6 class="card-title text-muted">OPDD1220</h6>
                      </div>
                    </div>
                    <div class="card">
                      <div class="card-body">
                        <h4 class="text-danger">5%</h4>
                      </div>
                    </div>
                  </tr>
                </tbody>
              </table>
              <!--/订单列表-->
            </div>
          </div>
          <div class="card d-flex justify-content-center col-4">
            <div class="card-body">
              <div class="card">
                <div
                  style="
                    height: 3rem;
                    padding: 0.5rem;
                    text-align: start;
                    display: flex;
                    justify-content: space-between;
                  "
                  class="bg-dark text-white"
                >
                  <b>商品1</b
                  ><input
                    type="text"
                    placeholder="商品编号/名称"
                    class="form-control col-5 mr-3"
                    style="height: 2rem"
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>蛋黄酥
                  </h5>
                  <h6 class="card-title text-muted">DZ201920</h6>
                </div>
              </div>
              <div class="card">
                <div
                  style="
                    height: 3rem;
                    padding: 0.5rem;
                    text-align: start;
                    display: flex;
                    justify-content: space-between;
                  "
                  class="bg-dark text-white"
                >
                  <b>商品2</b
                  ><input
                    type="text"
                    placeholder="商品编号/名称"
                    class="form-control col-5 mr-3"
                    style="height: 2rem"
                  />
                </div>
                <div class="card-body">
                  <h5 class="card-title">
                    <b>商品名:&nbsp;&nbsp;&nbsp;&nbsp;</b>榴莲酥
                  </h5>
                  <h6 class="card-title text-muted">DZ201820</h6>
                </div>
              </div>
              <div class="card">
                <div
                  style="
                    height: 3rem;
                    padding: 0.5rem;
                    text-align: start;
                    display: flex;
                    justify-content: space-between;
                  "
                  class="bg-dark text-white"
                >
                  <b>关联度</b
                  >
                </div>
                <div class="card-body">
                  <h2 class="text-success">91%</h2>
                </div>
                <div class="card-body">
                  <h4 class="text-muted">支持度</h4>
                  <div style="height:.75rem" class="bg-secondary">
                    <div style="height:100%;width:90%" class="bg-success" title="91%"></div>
                  </div>
                </div>
                <div class="card-body">
                  <h4 class="text-muted">置信度</h4>
                  <div style="height:.75rem" class="bg-secondary">
                    <div style="height:100%;width:98%" class="bg-success" title="98%"></div>
                  </div>
                </div>
                <div class="card-body">
                  <h4 class="text-muted">提升度</h4>
                  <div style="height:.75rem" class="bg-secondary">
                    <div style="height:100%;width:60%" class="bg-warning" title="60%"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </consolePanel>
  </div>
</template>

<script>
import sidebar from "../../components/Sidebar.vue";
import consolePanel from "../../components/ConsolePanel.vue";
export default {
  name: "productRepository",
  data() {
    return {};
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
  },
  components: {
    sidebar,
    consolePanel,
  },
};
</script>

<style>
.form-control-label {
  width: 100%;
}
.container-cards {
  justify-content: space-between;
}

.table-commodity .card {
  display: table-cell;
}
</style>
