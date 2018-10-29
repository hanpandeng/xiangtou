<template>
  <div class="login">
    <img class="logo" src="../assets/logo.png">
    <img class="xiangtou" src="../assets/xiangtou1.png">
    <span class="title">登 录 享 投，发 点 惊 艳 的 东 西 吧！</span>
    <div class="log_content">
      
      <div class="log_top">
        <!-- <img src="../assets/yonghu2.png"> -->
        <img :src="touxiang">

      </div>
      
      <div class="accont">
        <img class="yonghu" src="../assets/yonghu.png">
        <input autofocus="autofocus"  onKeyUp="value=value.replace(/[\W]/g,'')"  v-on:input ="inputFunc" placeholder="用户名" v-model="user">
      </div>
      <div class="accont">
        <img class="yonghu" src="../assets/mima.png">
        <input type="password"  @keyup.enter="login" v-on:input ="inputFunc"  placeholder="密码" v-model="pass">
      </div>
      <div class="remenmber">
        <img v-if='flag==false' @click="clickme()" src="../assets/gou1.png">
        <img v-if='flag' @click="clickme()" src="../assets/gou2.png">   是否让计算机记住你的账号？
      </div>
      <div class="denglu" @click='login()' :style="background">
        登录
      </div>
      <span v-if='error' class="error">账号或密码错误</span>
    </div>
  </div>
</template>

<script >
import axios from "axios";

export default {
  name: "login",
  data() {
    return {
      touxiang:
        "https://www.chuanshoucs.com/ServerImg/2018-08-03/8fd248dd-7f38-4f7b-a618-f5f0b207f922.png",
      background: {
        background:
          "url('https://www.chuanshoucs.com/ServerImg/2018-08-03/9cdd36ab-afde-493c-bd76-9d3ca57e426b.png')"
      },
      flag: false,
      user: "",
      pass: "",
      error: false
    };
  },
  created() {
    if (this.get("admin")) {
      this.user = this.get("admin");
      var that = this;
      axios({
        url: "Admin/finduserimage",
        method: "get",
        params: {
          account: that.user
        }
      }).then(function(res) {
        that.touxiang = res.data.data;
      });
    }
  },
  methods: {
    clickme() {
      this.flag = !this.flag;
      if (this.flag == true) {
        this.set("admin", this.user, 7);
      } else {
        this.delete("admin");
      }
    },
    login() {
      var that = this;
      axios({
        url: "Admin/login",
        method: "post",
        data: {
          account: this.user,
          password: this.pass
        }
      }).then(function(response) {
        if (response.data.code == 200) {
          sessionStorage.setItem("access_token", "false");
          sessionStorage.setItem("admin", that.user);
          sessionStorage.setItem("userName", response.data.data.user.userName);
          sessionStorage.setItem("adminId", response.data.data.user.adminId);
          that.clickme();
          that.$router.push("/home");
        } else {
          that.error = true;
        }
      });
    },
    inputFunc() {
      var that = this;
      axios({
        url: "Admin/finduserimage",
        method: "get",
        params: {
          account: that.user
        }
      }).then(function(res) {
        if (res.data.code == 200) {
          that.touxiang = res.data.data;
        } else {
          that.touxiang =
            "https://www.chuanshoucs.com/ServerImg/2018-08-03/8fd248dd-7f38-4f7b-a618-f5f0b207f922.png";
        }
      });
      axios({
        url: "Admin/login",
        method: "post",
        data: {
          account: this.user,
          password: this.pass
        }
      }).then(function(response) {
        if (response.data.code == 200) {
          that.background["background"] =
            "url('https://www.chuanshoucs.com/ServerImg/2018-08-03/9a097b35-1feb-4e0e-9430-7714ef951842.png')";
        } else {
          that.background["background"] =
            "url('https://www.chuanshoucs.com/ServerImg/2018-08-03/9cdd36ab-afde-493c-bd76-9d3ca57e426b.png')";
        }
      });
    },
    set: function(name, value, days) {
      var d = new Date();
      d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days);
      window.document.cookie =
        name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    get: function(name) {
      var v = window.document.cookie.match("(^|;) ?" + name + "=([^;]*)(;|$)");
      return v ? v[2] : null;
    },
    delete: function(name) {
      this.set(name, "", -1);
    }
  }
};
</script>

<style scoped>
.login {
  height: 100%;
  width: 100%;
  background: url("../assets/bg.jpg");
  position: relative;
}
.logo {
  position: absolute;
  top: 2rem;
  left: 3rem;
}
.xiangtou {
  position: absolute;
  left: 50%;
  margin-left: -4rem;
  top: 8rem;
  width: 8rem;
  height: 3rem;
}
.title {
  color: white;
  font-size: 16px;
  position: absolute;
  top: 12rem;
  left: 50%;
  margin-left: -6.78rem;
}
.log_content {
  position: absolute;
  top: 14.5rem;
  left: 50%;
  margin-left: -8.5rem;
  width: 17rem;
  height: 20rem;
  background: white;
  border-radius: 1rem;
}
input {
  display: block;
  margin: 0 auto 1rem;
  font-size: 16px;
  width: 12rem;
  height: 2.8rem;
  border: 0;
  outline: none;
  background: url("../assets/t1.png");
  background-size: 100% 100%;
  padding: 0 1.5rem;
}
.log_top {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  /*background:#CCC;*/
  display: flex;
  margin: 1.5rem auto;
}
.log_top img {
  margin: auto;
  width: 60px;
  height: 60px;
  border-radius: 50%;
}
.denglu {
  cursor: pointer;
  margin: 0 auto;
  color: white;
  text-align: center;
  line-height: 2.5rem;
  width: 15rem;
  height: 2.5rem;
  background-size: 100% 100% !important;
}

.remenmber {
  width: 12rem;
  margin: 0 auto;
  position: relative;
  margin-bottom: 1rem;
  padding-left: 1.5rem;
  font-size: 12px;
  color: #c5c5c5;
}
.remenmber img {
  position: absolute;
  top: 50%;
  margin-top: -0.5rem;
  left: 0;
}
.accont {
  position: relative;
}
.accont img {
  position: absolute;
  right: 2rem;
  top: 50%;
  margin-top: -0.6rem;
  width: 1.2rem;
  height: 1.2rem;
}
.error {
  text-align: center;
  display: block;
  margin-top: 0.8rem;
  color: #ff426a;
  font-size: 12px;
  font-weight: 600;
}
</style>
