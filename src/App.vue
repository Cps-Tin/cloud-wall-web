<template>
  <div>
        <!-- 头部 -->
        <Header/>
        
        <!-- 主题内容、尾部 -->
        <router-view class="apper" :key="$route.fullPath"/>  
        
        <!-- 返回顶部 -->
        <a-back-top/>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import user from '@/api/user'
import Header from '@/components/Header'

// 引入获取设备JS  cnpm install mobile-detect --save
import MobileDetect from 'mobile-detect'

export default {
  components:{
    Header
  },
  mounted() {
    Array.prototype.contains = function(needle) {
      for (let i in this) {
        if (this[i].indexOf(needle) > 0)
          return i;
      }
      return -1;
    }
    // 请求分类信息
    this.$store.dispatch("getAnaTypeList");
      console.log(this.getDeviceInfo());
      user.visit({"device":this.getDeviceInfo()}).then(res=>{
        if(res.code==200){
          console.log('访问成功!');
        }
      });
    // 解决IE加 '#'号不跳链接
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      window.addEventListener(
        "hashchange",
        () => {
          let currentPath = window.location.hash.slice(1);
          if (this.$route.path !== currentPath) {
            this.$router.push(currentPath);
          }
        },
        false
      );
    }

  },
  methods:{
      getDeviceInfo(){
        var device_type = navigator.userAgent;//获取userAgent信息
        var md = new MobileDetect(device_type);//初始化mobile-detect
        var os = md.os();//获取系统
        var model = "";
        if (os == "iOS") {//ios系统的处理
          os = md.os() + md.version("iPhone");
          model = md.mobile();
        } else if (os == "AndroidOS") {//Android系统的处理
          os = md.os() + md.version("Android");
          var sss = device_type.split(";");
          var i = sss.contains("Build/");
          console.log(i);
          if (i > -1) {
            model = sss[i].substring(1, sss[i].indexOf("Build/"));
          }
        }else{
          let kuoHaoBegin = device_type.indexOf('(');
          let kuoHaoEnd = device_type.indexOf(')');
          let str = device_type.substring(kuoHaoBegin + 1,kuoHaoEnd).split(';');
          os = str[0];
          model = '';
        }
        if(model==''){
          return os;  //电脑返回系统
        }else{
          return model + "---" + os;//手机型号和系统版本
        }
      }
  }
 
};
</script>

<style>
  .apper{
    animation: apper 0.75s;
  }
  @keyframes apper{
    0%   {opacity: 0;transform:translateY(30px);}
    100% {opacity: 1;transform:translateY(0px);}
  }
</style>
