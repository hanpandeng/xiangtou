<template>
	<div class="advertising">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：广告位管理</div>
		<div class="title title1"><img src="../../assets/faguanggao2.png"> 广告位管理</div>
		<div class="search"> 
			<div class="nicheng ">
				<span>联系人姓名</span>
				<input v-model='user' placeholder="请输入联系人姓名以查询">
			</div>
			<div class="nicheng ">
				<span>联系人电话</span>
				<input  v-model='telphone' placeholder="请输入联系人电话以查询">
			</div>
			<div class="nicheng nicheng1">
				<span>商家名称</span>
				<input  v-model='admin' placeholder="请输入商家名称以查询">
			</div>
			<span class="chaxun shanchu" @click='removeall'>
				批量删除
			</span>
			<span class="chaxun" @click='search'>
				<img src="../../assets/chaxun.png">
				查询
			</span>
			<span class="chaxun" @click='reset'>
				<img src="../../assets/chongzhi.png">
				重置
			</span>
		</div>
		
		<div class="content">
			
			<div class="heads">
				<span class="selection selection1" @click='Totalselection()'>
					<img src="../../assets/kaifaxiaochengx2.png"> {{selection}}</span>
					<span class="xuhao">序号</span>
					<span class="industry">商家名称</span>
					<span class="Contactname">联系人姓名</span>
					<span class="Contacttel">联系人电话</span>
					<span class="number">单价</span>
					<span class="shijian">创建时间</span>
					<span class="kong"></span>
					<span class="region"></span>
					<span class="operation">操作</span>
				</div>
				
				<div v-for='(item,index) in items'>
					
					<div class="heads heads1" >
						<span class="selection selection1">
							<img v-if='item.state == false' @click='item.state = true' src="../../assets/gou2.png">
							<img v-if='item.state == true' @click='item.state = false' src="../../assets/gou1.png">
						</span>
						<span class="xuhao">{{index + 1}}</span>
						<span class="industry">{{item.sellerInfo.sellerName}}</span>
						<span class="Contactname">{{item.sellerInfo.sellerUserName}}</span>
						<span class="Contacttel">{{item.sellerInfo.sellerPhone}}</span>
						<span class="number">{{item.unitPrice}}元/天</span>
						<span class="shijian">{{item.createTime}}</span>
						<span class="kong"></span>
						<span class="region"></span>
						<span class="operation">
							<img class="shoucuo" v-if='item.display == false' @click='display(item.advertId,index)' src="../../assets/shousuo.png">
							<img class="shoucuo" v-if='item.display == true' @click='display1(item.advertId,index)' src="../../assets/zhankai.png">
							<img @click='See(item.advertId,item.sellerAdvertiseId)' src="../../assets/chakan.png">
							<img @click='edit(item.advertId,item.sellerAdvertiseId,item.sellerInfoId)' src="../../assets/bianji.png">
							<img @click='remove(item.advertId,item.sellerInfoId)' src="../../assets/shanchu.png">
						</span>
					</div>
					<div class="heads headtitle" v-if='item.display == true' v-for='(it,id) in itemsell'>
						<span class="selection selection1" @click='Totalselection()'>{{it.advertiseSN}}屏</span>
						<span class="xuhao">{{it.sellerInfo.sellerName}}</span>
						<span class="industry">{{it.sellerInfo.sellerUserName}}</span>
						<span class="Contactname">{{it.sellerInfo.sellerPhone}}</span>
						<span  v-if='it.flag == false' class="Contacttel inputs">单价:{{it.unitPrice}}元/天</span>
						<span   v-if='it.flag == true'class="Contacttel inputs"><input v-model='danjia' placeholder="请输入单价"></span>
						<!-- <span  v-if='it.flag == false' class="number">标签:{{}}</span> -->
						<span  class="number"><el-select v-model='value3' clearable placeholder="请查看标签">
							<el-option
							v-for="item in it.lableList"
							:key="item"
							:label="item"
							disabled
							:value="item">
							</el-option>
							</el-select>
					</span>
					<span  v-if='it.flag == false' class="shijian inputs">销量:{{it.sellerVolume}}</span>
					<span  v-if='it.flag == true' class="shijian inputs"><input v-model='xiaoliang' placeholder="请输入销量" ></span>
					<span class="kong"></span>
					<span class="region" v-if='it.flag == false'>
						<img v-if='it.advertiseState == 1' src="../../assets/shangjia.png"> 
						<img v-if='it.advertiseState == 0' src="../../assets/xiajia.png">
					</span>
					<span class="region" v-if='it.flag == true'>
						<img v-if='Shelf == 1' @click='Shelfstate' src="../../assets/shangjia.png"> 
						<img v-if='Shelf == 0' @click='Shelfstate' src="../../assets/xiajia.png">
					</span>
					<span v-if='it.flag == false' class="operation operation1">
						<img @click='bainji(id)' src="../../assets/bianji.png">
						<img @click='leaveout(it.sellerAdvertiseId,id,item.advertId,item.sellerInfoId)' src="../../assets/shanchu.png">
					</span>
					<span v-if='it.flag == true' class="operation  operation2">
						<!-- <img src="../../assets/shanchu.png">
						<img @click='it.flag = false' src="../../assets/bianji.png"> -->
						<span @click='it.flag = false' class="cancale">取消</span>
						<span @click='baocun(it.sellerAdvertiseId,id)' class="affirm">确认</span>
					</span>
				</div>
			</div>
		</div>
		
		<el-pagination
		@current-change="handleCurrentChange"
		:current-page.sync="currentPage"
		:page-size="1"
		layout="prev, pager, next, jumper"
		:total="totalPage">
		</el-pagination>

		<el-dialog :visible.sync="dialogVisible" width="15%" top='30vh' :close-on-click-modal='false'>  
		<span class="box">
			<img class="tupiao" src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">{{hint}}</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
	</div>
</template>

<script>
import axios from "axios";
export default {
  name: "advertising",
  data() {
    return {
      dialogVisible: false,
      hint: "",
      value3: "",
      selection: "全选",
      currentPage: 1,
      totalPage: 1,
      telphone: "",
      admin: "",
      user: "",
      state: "",
      items: [],
      itemsell: [],
      options: [
        {
          value: "1",
          label: "上架"
        },
        {
          value: "2",
          label: "下架"
        }
      ],
      flag: false,
      current: 0,
      labels: [],
      xiaoliang: "",
      danjia: "",
      Shelf: "",
      sellerAdvertiseId: "",
      advertId: "",
      sellerInfoId: "",
      xiabiao: "",
      Difference: ""
    };
  },
  created() {
    // console.log(this.$route.params.fenye)
    if (this.$route.params.fenye) {
      this.currentPage = this.$route.params.fenye;
      this.fenye();
    } else {
      this.fenye();
    }
  },
  methods: {
    baocun(sellerAdvertiseId, index) {
      // console.log(sellerAdvertiseId)
      var that = this;
      axios({
        url: "Selladvterise/editselladvertise",
        method: "post",
        data: {
          sellerAdvertiseId: sellerAdvertiseId,
          unitPrice: that.danjia,
          pedestrianVolume: that.xiaoliang,
          advertiseState: that.Shelf
        }
      }).then(function(res) {
        if (res.data.code == 200) {
          console.log(that.advertiseState);
          that.itemsell[index].pedestrianVolume = that.xiaoliang;
          that.itemsell[index].unitPrice = that.danjia;
          that.itemsell[index].advertiseState = that.Shelf;
          that.itemsell[index].flag = false;
        }
      });
    },

    fenye() {
      var that = this;
      axios({
        url: "Selladvterise/selladvgroupPagelist",
        method: "get",
        params: {
          currentpage: that.currentPage
        }
      }).then(function(res) {
        if (res.data.code == 200) {
          var data = res.data.data.lists;
          data.forEach(function(item, index) {
            item.state = false;
            item.display = false;
          });
          that.items = data;
          that.totalPage = res.data.data.totalPage;
          that.currentPage = res.data.data.currPage;
          // console.log(res)
        }
      });
    },
    search() {
      var that = this;
      axios({
        url: "Selladvterise/selladvgroupPagelist",
        method: "get",
        params: {
          sellerUserName: that.user,
          sellerName: that.admin,
          sellerPhone: that.telphone
        }
      }).then(function(res) {
        if (res.data.code == 200) {
          var data = res.data.data.lists;
          data.forEach(function(item, index) {
            item.state = false;
            item.display = false;
          });
          that.items = data;
          that.totalPage = res.data.data.totalPage;
        }
      });
    },
    reset() {
      this.telphone = "";
      this.admin = "";
      this.user = "";
    },
    handleCurrentChange() {
      this.fenye();
    },
    Totalselection() {
      var data = this.items;
      if (this.selection == "全选") {
        data.forEach(function(item, index) {
          item.state = true;
        });
        this.selection = "取消";
      } else {
        data.forEach(function(item, index) {
          item.state = false;
        });
        this.selection = "全选";
      }
    },
    See(advertId, sellerAdvertiseId) {
      var that = this;
      that.$router.push({
        path: "/advterisedetails",
        query: {
          advertId: advertId,
          sellerAdvertiseId: sellerAdvertiseId,
          currentPage: that.currentPage
        }
      });
    },
    edit(advertId, sellerAdvertiseId, sellerInfoId) {
      var that = this;
      that.$router.push({
        path: "/advterisedetailsmody",
        query: {
          advertId: advertId,
          sellerAdvertiseId: sellerAdvertiseId,
          sellerInfoId: sellerInfoId,
          currentPage: that.currentPage
        }
      });
    },
    display(advertId, index) {
      // console.log(this.itemsell)
      var that = this;
      if (that.flag == false) {
        that.flag = !that.flag;
        that.items[index].display = true;

        axios({
          url: "Selladvterise/selsameadvertise",
          method: "get",
          params: {
            advertId: advertId
          }
        }).then(function(res) {
          // console.log(res)
          if (res.data.code == 200) {
            // that.itemsell = res.data.data
            var data = res.data.data;
            data.forEach(function(item, index) {
              item.flag = false;
            });
            that.itemsell = data;
          }
        });
      }
    },
    display1(advertId, index) {
      var that = this;
      // console.log(this.itemsell)
      if (that.flag == true) {
        that.flag = !that.flag;
        that.items[index].display = false;
        // console.log(that.flag)
      }
    },
    Shelfstate() {
      var that = this;
      if (that.Shelf == 0) {
        that.Shelf = 1;
      } else {
        that.Shelf = 0;
      }
    },
    bainji(index) {
      var that = this;
      that.itemsell.forEach(function(item, index) {
        item.flag = false;
      });
      that.itemsell[index].flag = true;
      that.xiaoliang = that.itemsell[index].pedestrianVolume;
      that.danjia = that.itemsell[index].unitPrice;
      that.Shelf = that.itemsell[index].advertiseState;
    },
    leaveout(sellerAdvertiseId, index, advertId, sellerInfoId) {
      this.sellerAdvertiseId = sellerAdvertiseId;
      this.advertId = advertId;
      this.sellerInfoId = sellerInfoId;
      this.dialogVisible = true;
      this.hint = "确定要删除单个广告屏吗";
      this.xiabiao = index;
      this.Difference = 1;
    },
    remove(advertId, sellerInfoId) {
      this.dialogVisible = true;
      this.hint = "确定要删除该广告屏组吗";
      this.Difference = 2;
      this.advertId = advertId;
      this.sellerInfoId = sellerInfoId;
    },
    removeall() {
      this.dialogVisible = true;
      this.hint = "确定要批量删除该广告屏组吗";
      this.Difference = 3;
      // var that = this;
    },
    dialog() {
      var that = this;
      if (that.Difference == 1) {
        axios({
          url: "Selladvterise/deleteselladvertise",
          method: "post",
          data: {
            sellerAdvertiseId: that.sellerAdvertiseId,
            advertId: that.advertId,
            sellerInfoId: that.sellerInfoId
          }
        }).then(function(res) {
          if (res.data.code == 200) {
            that.dialogVisible = false;
            that.itemsell.splice(that.xiabiao, 1);
          }
        });
      } else if (that.Difference == 2) {
        axios({
          url: "Selladvterise/deletegroupadvertise",
          method: "post",
          data: {
            advertId: that.advertId,
            sellerInfoId: that.sellerInfoId
          }
        }).then(function(res) {
          if (res.data.code == 200) {
            that.dialogVisible = false;
            that.fenye();
          }
        });
      } else if (that.Difference == 3) {
        var jsonid = [];
        that.items.forEach(function(item, index) {
          if (item.state == true) {
            jsonid.push({
              advertId: item.advertId,
              sellerInfoId: item.sellerInfoId
            });
          }
        });

        axios({
          url: "Selladvterise/multdeleteselladvertise",
          method: "post",
          data: {
            jsonId: JSON.stringify(jsonid)
          }
        }).then(function(res) {
          that.dialogVisible = false;
          that.fenye();
        });
      }
    }
  }
};
</script>

<style scoped>
.advertising {
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
.search {
  margin-left: 0.5rem;
  height: 45px;
}
.nicheng {
  margin-right: 2rem;
  display: inline-block;
  font-size: 14px;
  position: relative;
}
.nicheng input {
  width: 9.25rem;
  height: 2.25rem;
  border: 0;
  outline: none;
  padding-left: 5.5rem;
  border-radius: 0.3rem;
}

.nicheng1 input {
  padding-left: 4.5rem;
}

.search1 {
  margin-top: 1.5rem;
}
.search1 span {
  float: left;
  padding: 0.5rem 1.3rem;
  margin: 0 1.5rem 0 0;
}
.nicheng > span {
  position: absolute;
  left: 1rem;
  top: 0.6rem;
}
.nicheng2 {
  position: relative;
}

.chaxun {
  margin-top: 0.15rem;
  cursor: pointer;
  margin-left: 1.5rem;
  float: right;
  background-color: #ffcc00;
  padding: 0.5rem 1.3rem;
  padding-left: 2.5rem;
  border-radius: 1rem;
  color: white;
  position: relative;
}
.chaxun img {
  position: absolute;
  top: 50%;
  margin-top: -0.375rem;
  left: 1.5rem;
  width: 0.75rem;
  height: 0.75rem;
}

.content {
  margin-top: 2rem;
}
.headtitle {
  color: #999;
  line-height: 2rem;
}
.inputs input {
  text-align: center;
  border: 0;
  outline: none;
}
.operation1 {
  line-height: 0;
}
.heads {
  display: flex;
  background-color: white;
  padding: 0.8rem 0;
  margin-bottom: 0.1rem;
}
.region span {
  margin-left: 3%;
}
.selection1 {
  display: flex;
  justify-content: center;
}
.selection1 img {
  margin-right: 0.3rem;
}
.heads .selection,
.heads .xuhao {
  width: 7%;
  text-align: center;
}
.heads .operation,
.heads .industry,
.heads .Contacttel {
  width: 15%;
  text-align: center;
}
.heads .shijian {
  width: 12%;
  text-align: center;
}

.heads .Contactname,
.heads .region {
  width: 10%;
  text-align: center;
}
.heads1 .selection,
.heads1 .number,
.heads1 .Contactname,
.heads1 .Contacttel,
.heads1 .industry,
.heads1 .region,
.heads1 .shijian,
.heads1 .xuhao {
  line-height: 2rem;
}
.selection1 {
  display: flex;
}
.heads1 .selection1 img {
  width: 20px;
  height: 20px;
  margin: auto;
}
.heads1 .operation {
  display: flex;
  justify-content: center;
}
.operation img {
  width: 40px;
  height: 2rem;
  margin: 0 0.1rem;
}
.selection2 {
  position: relative;
}
.kong {
  width: 11%;
}

.heads .number {
  width: 13%;
  text-align: center;
}
.operation2 span {
  cursor: pointer;
  color: white;
  padding: 0.3rem 1rem;
  border-radius: 1rem;
  margin: 0 0.2rem;
}
.cancale {
  background: #ccc;
}
.affirm {
  background: #ffcb00;
}
.selection2 img {
  position: absolute;
  width: 1rem;
  height: 1rem;
  top: 50%;
  left: 50%;
  margin-top: -0.5rem;
  margin-left: -0.5rem;
  cursor: pointer;
}
.shanchu {
  background-color: #ff7189;
  padding: 0.5rem 1.5rem;
}
.shoucuo {
  width: 20px !important;
  height: 20px !important;
  display: block;
  margin: auto 0.7rem auto 0 !important;
}
::-webkit-input-placeholder {
  color: #c0c4cc;
  /*text-align:center;*/
}
:-moz-placeholder {
  color: #c0c4cc;
  /*text-align:center;*/
}
::-moz-placeholder {
  color: #c0c4cc;
  /*text-align:center;*/
}
:-ms-input-placeholder {
  color: #c0c4cc;
  /*text-align:center;*/
}
</style>
<style>
.xanze {
  border: 0;
  outline: none;
  position: absolute;
  top: 0.15rem;
  left: 3rem;
}
.xanze input {
  border: 0;
  outline: none;
}
</style>