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
                      <h4 class=" display-5" align="left">智能定价</h4>
                  </div>
              </div>
          </div>
        </div>
        <!--/标题栏-->
        
        <!--content-->
        <div class="row">
          
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
  export default {
    name: 'pricing',
    data () {
      return {


      }
    },
    methods:{

    },
    components:{
      sidebar,
      consolePanel,
    },
    mounted() {
      
    }
  }
</script>

<style>
</style>
