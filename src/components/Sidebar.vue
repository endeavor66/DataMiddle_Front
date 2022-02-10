<template>
  <!-- Left Panel -->
      <aside id="left-panel" class="left-panel">
          <nav class="navbar navbar-expand-sm navbar-default">
              <div id="main-menu" class="main-menu collapse navbar-collapse">
                  <ul class="nav navbar-nav" >
                      <li :class="{active:a0}" @click="$router.push('/md/consoleView?num=0');">
                          <a href="#"><i class="menu-icon fa fa-laptop" ></i>控制台 </a>
                      </li>
                      <li :class="{active:a1}" @click="$router.push('/index/console?num=1');">
                          <a href="#"><i class="menu-icon fa  fa-building-o" ></i>门店名 </a>
                      </li>

                      <li class="menu-title">智能决策</li><!-- /.menu-title -->
                      <li :class="{active:a2}" @click="$router.push('/md/console/purchase/purchaseOperation?num=2');">
                          <a href="#"> <i class="menu-icon fa fa-shopping-cart"></i>采购决策</a>
                      </li>
                      <li :class="{active:a3}" @click="$router.push('/md/console/predictSales?num=3');">
                          <a href="#"> <i class="menu-icon fa  fa-sort-amount-desc"></i>销售量预测</a>
                      </li>
                      <li :class="{active:a4}" @click="$router.push('/md/console/predictReturn?num=4')">
                          <a href="#"> <i class="menu-icon fa fa-truck"></i>退货预测</a>
                      </li>
                      <li :class="{active:a5}" @click="$router.push('/md/console/commodity/commodityCompare?num=5');">
                          <a href="#"> <i class="menu-icon fa fa-link"></i>商品关联</a>
                      </li>
                      <li :class="{active:a6}" @click="$router.push('/md/console/commodity/commodityRecommend?num=6');">
                          <a href="#"> <i class="menu-icon fa fa-star-o"></i>商品推荐</a>
                      </li>
                     <!-- <li @click="$router.push('/md/console/pricing');">
                          <a href="#"> <i class="menu-icon fa fa-tasks"></i>智能定价</a>
                      </li> -->
                      <li class="menu-title" style="text-align:left;">其他</li><!-- /.menu-title -->
                      <li :class="{active:a7}" @click="$router.push('/console/alert?num=7');">
                          <a href="#"> <i class="menu-icon fa fa-bell"></i>智能提醒</a>
                      </li>
                      <li :class="{active:a8}" @click="$router.push('/md/console/importData?num=8');">
                          <a href="#"> <i class="menu-icon fa fa-mail-forward"></i>数据导入</a>
                      </li>


                  </ul>
              </div><!-- /.navbar-collapse -->
          </nav>
      </aside>
      <!-- /#left-panel -->
</template>

<script>
  export default {
    name: 'sidebar',
    data () {
      return {
        a0:true,
        a1:false,
        a2:false,
        a3:false,
        a4:false,
        a5:false,
        a6:false,
        a7:false,
        a8:false,
      }
    },
    methods:{
      jumpToPurchaseOperation(){
        this.$router.replace({ path: "/console/purchase/purchaseOperation",query:{refresh:true,}});
      },
      getClick(num){
        // var lis=document.getElementsByClassName("navbar-nav").children;
        // console.log(lis)
        // for(var i=0;i<lis.length;i++){
        //   lis.classList.remove("active")
        // }
        // console.log(e)
        // e.path[1].classList.add("active");
        console.log(num)
        this.a0=false;
        this.a1=false;
        this.a2=false;
        this.a3=false;
        this.a4=false;
        this.a5=false;
        this.a6=false;
        this.a7=false;
        this.a8=false;

        if(num==0){
          console.log("here is 0")
          this.a0=true;
        }
        else if(num==1){
          console.log("here is 1")
          this.a1=true
        }
        else if(num==2){
          this.a2=true
        }
        else if(num==3){
          this.a3=true
        }
        else if(num==4){
          this.a4=true
        }
        else if(num==5){
          this.a5=true
        }
        else if(num==6){
          this.a6=true
        }
        else if(num==7){
          this.a7=true
        }
        else if(num==8){
          this.a8=true
        }
      }
    },
    mounted() {
      console.log(this.$route)
      var num=this.$route.query.num
      console.log(num)
      this.getClick(num)
    }
  }
</script>

<style scoped>

</style>
