<template>
	<div class="aboutus">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：关于我们</div>
		<div class="title title1"><img src="../../assets/guanyu2.png"> 关于我们</div>
		<div class="content">
			<div class="tupian">
				<uploadImg class='zujian'  :img='img' number="1" :format='format' v-on:uploadimg="uploadimg"></uploadImg>
			</div>
			<textarea v-model='substance' placeholder="请在此撰写关于我们"></textarea>
		</div>
		<span class="save" @click='save'>保存</span>
	</div>
</template>

<script>
import axios from "axios";
import uploadImg from "./uploading.vue";
export default {
  name: "aboutus",
  data() {
    return {
      files: "",
      format: "img",
      img: [],
      substance: "",
      state: false,
      aboutUsId: ""
    };
  },
  components: {
    uploadImg
  },
  created() {
    this.xianshi();
  },
  methods: {
    uploadimg(val) {
      this.files = val;
    },
    xianshi() {
      var that = this;
      axios({
        url: "AboutUs/showaboutus",
        method: "get"
      }).then(function(res) {
        if (res.data.code == 200) {
          that.img = [];
          that.substance = res.data.data.aboutUsDetails;
          that.img.push(res.data.data.aboutUsImg);
          that.aboutUsId = res.data.data.aboutUsId;
          that.state = false;
        } else {
          that.state = true;
        }
      });
    },
    save() {
      var that = this;
      if (that.state == false) {
        if (that.files) {
          var uri = this.$store.state.http + "Image/imagemultupload";
          var xhr = new XMLHttpRequest();
          var fd = new FormData();
          xhr.open("POST", uri, true);
          for (var x = 0; x < that.files.length; x++) {
            fd.append("files", that.files[x]);
          }
          xhr.send(fd);
          xhr.onreadystatechange = function() {
            if (xhr.readyState == 4 && xhr.status == 200) {
              var data = JSON.parse(xhr.responseText);
              console.log(data);
              axios({
                url: "AboutUs/modifyaboutus",
                method: "post",
                data: {
                  aboutUsId: that.aboutUsId,
                  aboutUsDetails: that.substance,
                  aboutUsImg: JSON.stringify(data.data)
                }
              }).then(function(res) {
                that.xianshi();
              });
            }
          };
        } else {
          axios({
            url: "AboutUs/modifyaboutus",
            method: "post",
            data: {
              aboutUsId: that.aboutUsId,
              aboutUsDetails: that.substance,
              aboutUsImg: that.img[0]
            }
          }).then(function(res) {
            that.xianshi();
          });
        }
      } else if (that.state == true) {
        axios({
          url: "AboutUs/addaboutus",
          method: "post",
          data: {
            aboutUsDetails: "",
            aboutUsImg: ""
          }
        }).then(function(res) {
          that.xianshi();
        });
      }
    }
  }
};
</script>

<style scoped>
.aboutus {
  padding: 1rem;
  font-size: 15px;
}
.title {
  margin-left: 1.5rem;
  position: relative;
  padding-left: 1rem;
  margin-bottom: 1rem;
}
.title img {
  width: 0.75rem;
  height: 0.75rem;
  position: absolute;
  top: 50%;
  margin-top: -0.375rem;
  left: 0;
}
.title1 {
  padding-left: 2.5rem;
  margin-left: 0.5rem;
  padding-top: 0.8rem;
  padding-bottom: 0.8rem;
  margin-top: 2rem;
  background: #ffffff;
  border-radius: 0.3rem;
}
.title1 img {
  left: 1rem;
}
.content {
  margin-left: 0.5rem;
  margin-top: 2rem;
}
.tupian {
  background-color: white;
  margin-bottom: 0.3rem;
  padding-bottom: 0.25rem;
  padding-left: 0.8rem;
}
textarea {
  width: 98%;
  border: 0;
  outline: none;
  min-height: 5rem;
  padding: 1%;
  margin-bottom: 1rem;
}
.save {
  cursor: pointer;
  background-color: #ffcc00;
  padding: 0.4rem 1.5rem;
  border-radius: 1rem;
  color: white;
  float: right;
}
</style>