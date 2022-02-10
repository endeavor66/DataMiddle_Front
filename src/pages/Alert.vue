<template>
  <div id="main" style="height:100%">
    <sidebar></sidebar>
    <consolePanel class="d-flex justify-content-between flex-column" >
      <div class="col-md-12" style="margin:0 auto" >
        <div class="card">
            <div class="card-header">
                <strong class="card-title">智能提醒</strong>
            </div>
            <div class="card-body" >
                  <div class="sufee-alert alert with-close alert-primary alert-dismissible fade show">
                      <span class="badge badge-pill badge-primary">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-secondary alert-dismissible fade show">
                      <span class="badge badge-pill badge-secondary">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-success alert-dismissible fade show">
                      <span class="badge badge-pill badge-success">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-danger alert-dismissible fade show">
                      <span class="badge badge-pill badge-danger">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-warning alert-dismissible fade show">
                      <span class="badge badge-pill badge-warning">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-info alert-dismissible fade show">
                      <span class="badge badge-pill badge-info">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-light alert-dismissible fade show">
                      <span class="badge badge-pill badge-light">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>

                  <div class="sufee-alert alert with-close alert-dark alert-dismissible fade show">
                      <span class="badge badge-pill badge-dark">Success</span>
                      You successfully read this important alert.
                      <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
                  </div>
            </div>
        </div>
      </div>
    </consolePanel>

  </div>
</template>

<script>
  import sidebar from "../components/Sidebar.vue"
  import consolePanel from "../components/ConsolePanel.vue"
  export default {
    name: 'alert',
    data () {
      return {


      }
    },
    components:{
      sidebar,
      consolePanel
    }
  }
</script>

<style>
  .sufee-alert{
    width:90%;
    margin:1.2% auto;
  }
</style>
