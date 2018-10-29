<template>
	<div class="personal">
		<img class="img1" src="../../assets/gerenzhongxin.png">
		<div class="user">
			<img class="img2" :src="img">
			<span>{{name}}</span>
			<img  @click="clickme()" class="img3" src="../../assets/gengduo.png">
			<div class="Popup" v-if="flag">
				<router-link tag='div' to='/personal' @click.native="geren"><img src="../../assets/gerenzhongxin2.png">个人中心</router-link>
				<router-link tag='div' to='' class='tuichu' > <img src="../../assets/tuichu.png">退出登录</router-link>
			</div>
			<span v-if="flag" class="triangle"></span>
		</div>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: "personal",
  created() {
    this.admin = sessionStorage.getItem("admin");
    this.query();
  },
  data: function() {
    return {
      flag: false,
      name: sessionStorage.getItem("userName"),
      img: "",
      admin: ""
    };
  },
  methods: {
    clickme() {
      this.flag = !this.flag;
    },
    geren() {
      this.flag = !this.flag;
    },
    query() {
      var that = this;
      axios({
        url: "Admin/finduserimage",
        method: "get",
        params: {
          account: that.admin
        }
      }).then(function(res) {
        if (res.data.code === 200) {
          that.img = res.data.data;
        }
      });
    }
  }
};
</script>

<style scoped>
.personal {
  height: 3rem;
  background: url("../../assets/tou.png");
  background-size: 100% 100%;
}
.img1 {
  margin-left: 1.8rem;
  margin-top: 0.8rem;
}

.user {
  float: right;
  line-height: 3rem;
  margin-right: 4rem;
  color: white;
  position: relative;
  padding-left: 2.5rem;
  padding-right: 1.5rem;
}

.img2 {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  margin-top: -1rem;
  left: 0;
}
.img3 {
  position: absolute;
  top: 50%;
  margin-top: -0.5rem;
  right: 0;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
}
.Popup {
  color: #ffd800;
  line-height: 1.5rem;
  position: absolute;
  bottom: -3.8rem;
  right: -0.5rem;
  width: 6rem;
  height: 4rem;
  border-radius: 0.4rem;
  background: white;
  box-shadow: 0px 0px 5px #888888;
  padding-left: 1rem;
}
.Popup div {
  margin-top: 0.3rem;
  font-size: 14px;
  position: relative;
  padding-left: 1.5rem;
}
.Popup img {
  position: absolute;
  left: 0.2rem;
  top: 50%;
  margin-top: -0.375rem;
  width: 0.75rem;
  height: 0.75rem;
}
.tuichu {
  color: #fe0631;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.triangle {
  position: absolute;
  bottom: 0.2rem;
  right: 0.1rem;
  width: 0;
  height: 0;
  border-left: 0.4rem solid transparent;
  border-right: 0.4rem solid transparent;
  border-bottom: 0.5rem solid white;
}
</style>
