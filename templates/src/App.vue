<template>
  <q-layout>
    <div class="background">
      <div class="background-cover">
        <div class="q-gutter">
          <q-bar class="bg-indigo-5 text-white shadow-2 rounded-borders nav">
            <q-btn size="lg" flat :label="blog_name" />
            <q-space/>

            <q-tabs shrink>
              <q-route-tab label="Home" to="/"></q-route-tab>
              <q-route-tab label="专栏列表" to="/tags"></q-route-tab>
            </q-tabs>
          </q-bar>
        </div>

        <div style="min-height: 1080px">
          <router-view></router-view>
        </div>


        <div>
          <q-banner class="bg-indigo-5 rounded-borders text-white">
            <template slot="avatar">
             <h4 class="text-white">About</h4>
            </template>
            <p>
              该网站使用<a class="text-light-blue-2" href="https://github.com/NeilKleistGao/LitShell">LitShell</a>生成
              <br/>
              网站作者：{{author}}
              <br/>
              如有问题请联系 {{contact}}
            </p>
            <hr/>
            <p>
              Powered by <a class="text-light-blue-2" href="https://github.com/NeilKleistGao/LitShell">LitShell</a>
              <br/>
              Author：{{author}}
              <br/>
              If you have any questions, please contact {{contact}}
            </p>
          </q-banner>
        </div>
      </div>
    </div>
  </q-layout>
</template>

<script>
export default {
  name: 'LayoutDefault',
  data(){
    let config_data = require("./assets/config.json");
    return {
      blog_name: config_data["blog_name"],
      author: config_data["author"],
      contact: config_data["contact"]
    };
  },
  created() {
    this.$q.dark.set(true);
  }
}
</script>

<style scoped>
  .background {
    background-image: url("assets/back.jpg");
    background-size: cover;
  }
  .background-cover {
    background: rgba(0, 0, 0, 0.5);
  }
  .background .background-cover {
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 1080px;
  }
  .nav {
    min-height: 80px;
  }
</style>