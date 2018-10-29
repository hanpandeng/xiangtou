<template>
      <div class="homepage">
         	<div class="title"><img src="../../assets/daohang.png"> 当前位置：后台首页</div>
			<div class="xinxi">
				<span class="span1">小程序信息</span>
				<img src="../../assets/xiangtou.png">
				<span class="span2">享投共享广告</span>
				<span class="span3">Shared advertising</span>
			</div>
			<div class="xinxi">
				<span class="span1">联系信息</span>
				<img src="../../assets/chuanshou.png">
				<span class="span2 span4">传手小程序开发</span>
				<span class="span3 span5">上海申肃网络科技有限公司</span>
			</div>
			<div class="message">
				<span class="m_title">
					<img src="../../assets/xiaoxi.png">
					消息提醒
				</span>
				<div class="message_span m_span1" @click='kehu'>
					 <span>{{buyercount1}}</span>
					 <img src="../../assets/xinzh.png">
					 发广告账号
				</div>
				<div class="message_span m_span2" @click='xiaochengx'>
					 <span>{{appminicount1}}</span>
					 <img src="../../assets/xcxtx.png">
					 开发小程序
				</div>
				<div class="message_span m_span3" @click='maijia'>
					 <span>{{sellercount1}}</span>
					 <img src="../../assets/jieguanggao2.png">
					 接广告账号
				</div>
				<div class="message_span m_span4" @click='dingdan'>
					 <span>{{ordercount1}}</span>
					 <img src="../../assets/yuyue2.png">
					 预约管理
				</div>
			</div>
			<div class="message tel">
				<span class="m_title">
					<img src="../../assets/dianhua.png">
					联系电话
				</span>
				<div>
					021-5763-0970         
				</div>
				<span class="m_title quxiao">
					<img src="../../assets/dizhi.png">         
					联系地址
				</span>
				<div>
					上海市松江区茸兴路407创意园2FA222室
				</div>
			</div>
			<div class="bill">
				<div class="billtitle">
					<img src="../../assets/faguanggao2.png"> 订单概述
				</div>
				<div class="choice">
					<span :class="current == 1 ? 'lanse':'' " @click='choice(1)'>今日</span>
					<span :class="current == 2 ? 'lanse':'' " @click='choice(2)'>昨日</span>
					<span :class="current == 3 ? 'lanse':'' " @click='choice(3)'>近一周</span>
					<span :class="current == 4 ? 'lanse':'' " @click='choice(4)'>近30天</span>
					<span :class="current == 5 ? 'lanse':'' " @click='choice(5)'>所有</span>
					<el-date-picker
					class='riqi'
					v-model="value1"
					value-format='yyyy-MM-dd'
					@change='text'
					type="date"
					>
					</el-date-picker>
				</div>
				<div class="xuanzeriqi" v-if="value1 !='' ">
					选择日期:{{value1}}
				</div>
				<div class="Summary">
					<div class="Launch">
						<strong>{{toufang}}</strong><br>
						<span>投放量</span>
					</div>
					<div class="Launch">
						<strong>{{yinye}}</strong><br>
						<span>营业额</span>
					</div>
					<div class="Launch">
						<strong>{{dingdan1}}</strong><br>
						<span>订单量</span>
					</div>
				</div>
			</div>
      </div>
</template>

<script>
import axios from 'axios'
 export default {
    name: 'homepage',
    data(){
    	return {
    		buyercount1:'',
    		appminicount1:'',
    		sellercount1:'',
    		ordercount1:'',
    		value1:'',
    		current:1,
    		date:'',
    		toufang:'0',
    		yinye:'0',
    		dingdan1:'0'
    	}
    },
    created(){
    	this.buyercount()
    	this.appminicount()
    	this.sellercount()
    	this.ordercount()
    	this.systemtime()
    },
    methods:{
    	//获取系统时间
    	systemtime(){
    		var that = this;
    		axios({
    			url:'Index/showcurrenttime',
    			method:'get'
    		}).then(function(res){
    			if(res.data.code == 200){
    				// console.log(res)
    				var datime = new Date(res.data.data);
    				var month = datime.getMonth() + 1
    				that.date = datime.getFullYear() + '-' + month +'-'+datime.getDate()
    				that.query(that.date,that.date)
    				// console.log(datime,that.date)
    			}
    		})
    	},
    	// 买家账号
    	buyercount(){
    		var that = this;
    		axios({
    			url:'Index/buyercount',
    			method:'get'
    		}).then(function(res){
    			if(res.data.code == 200){
    				if(res.data.data > 99){
    					that.buyercount1 = "99+"
    				}else{
    					that.buyercount1 = res.data.data
    				}
    				// console.log(res.data)
    			}
    		})
    	},
    	// 卖家账号
    	sellercount(){
    		var that = this;
    		axios({
    			url:'Index/sellercount',
    			method:'get'
    		}).then(function(res){
    			if(res.data.code == 200){
    				if(res.data.data > 99){
    					that.sellercount1 = "99+"
    				}else{
    					that.sellercount1 = res.data.data
    				}
    				// console.log(res.data)
    			}
    		})
    	},
    	// 小程序
    	appminicount(){
    		var that = this;
    		axios({
    			url:'Index/appminicount',
    			method:'get'
    		}).then(function(res){
    			if(res.data.code == 200){
    				
    				if(res.data.data > 99){
    					that.appminicount1 = "99+"
    				}else{
    					that.appminicount1 = res.data.data
    				}
    				// console.log(res.data)
    			}
    		})
    	},
    	// 预约  订单
    	ordercount(){
    		 var that = this;
    		axios({
    			url:'Index/ordercount',
    			method:'get'
    		}).then(function(res){
    			if(res.data.code == 200){
    				if(res.data.data > 99){
    					that.ordercount1 = "99+"
    				}else{
    					that.ordercount1 = res.data.data
    				}
    				// console.log(res.data)
    			}
    		})
    	},
    	// 卖家 
    	maijia(){
    		this.$router.push({path:'/advertisement'})
    	}, 
    	// 客户  
    	kehu(){
    		this.$router.push({path:'/buyinfo'})
    	},
    	//小程序  
    	xiaochengx(){
    		this.$router.push({path:'/appmini'})
    	},
    	//订单 
    	dingdan(){
    		this.$router.push({path:'/order'})
    	},
    	choice(index){
    		this.current = index
    		this.value1=''
    		var that = this;
    		if(index == 1){
    			that.systemtime()
    		}else if(index == 2 ){
    			var now = new Date(that.date);
				now.setDate(now.getDate() - 1);  
				var month = now.getMonth() + 1
    			var  data = now.getFullYear() + '-' + month +'-'+now.getDate()
    			that.query(data,that.date)
				// console.log("开始时间" + data + "结束时间" + that.date)
    		}else if(index == 3){
    			var now = new Date(that.date);
				now.setDate(now.getDate() - 7);  
				var month = now.getMonth() + 1
    			var  data = now.getFullYear() + '-' + month +'-'+now.getDate()
    			that.query(data,that.date)
				// console.log("开始时间" + data + "结束时间" + that.date)
    		}else if(index == 4){
    			var now = new Date(that.date);
				now.setDate(now.getDate() - 30);  
				var month = now.getMonth() + 1
    			var  data = now.getFullYear() + '-' + month +'-'+now.getDate()
    			that.query(data,that.date)
				// console.log("开始时间" + data + "结束时间" + that.date)
    		}else if(index == 5){
    			that.query()
    			// console.log("所有")
    		}
    	},
    	query(start,end){
    		var that = this;
    		axios({
    			url:'Index/deliverycount',
    			method:'get',
    			params:{
    				startTime:start,
    				endTime:end
    			}
    		}).then(function(res){
    			if(res.data.code == 200){
    				that.toufang = res.data.data;
    			}
    		})
    		axios({
    			url:'Index/orderamount',
    			method:'get',
    			params:{
    				startTime:start,
    				endTime:end
    			}
    		}).then(function(res){
    			if(res.data.code == 200){
    				that.dingdan1 = res.data.data;
    			}
    		})
    		axios({
    			url:'Index/orderbalance',
    			method:'get',
    			params:{
    				startTime:start,
    				endTime:end
    			}
    		}).then(function(res){
    			if(res.data.code == 200){
    				that.yinye = res.data.data;
    			}
    		})
    	},
    	text(){
    		var that = this;
    		// console.log(this.value1)
    		this.query(that.value1,that.value1)
    	}
    }
  }
</script>

<style scoped>
.lanse{
	color: #BB66FF;
	border-bottom: 2px solid #BB66FF;
}
.bill{
	overflow:hidden;
	margin-top: 2rem;
	margin-left: 0.5rem;
	width: 44%;
	background:white;
	box-shadow: 0px 0px 15px #ccc;
	border-radius: 1rem;
    display: inline-block;
    height: 11rem;
    background-size: 100% 100%;
    position: relative;
    padding-top: 1rem;
}
.billtitle{
	display: inline-block;
	font-size: 14px;
	padding-left: 1rem;
}
.billtitle img{
	float: left;
	width: 18px;
	height: 18px;
	margin-right: 0.5rem;
}
.choice{
	display: inline-block;
	float: right;
	margin-right: 3rem;
}
.choice span{
	cursor: pointer;
	padding-bottom: 0.1rem;
	margin:0 0.5rem;
}
.riqi{
	position: absolute;
	top: 0.5rem;
	right: -9rem;
	height: 2rem;
}
.xuanzeriqi{
	display: inline-block;
	position: absolute;
	bottom: 1rem;
	right: 2rem;
}
.Summary{
	display: flex;
	margin-top: 3.5rem;
	text-align: center;
}
.Launch{
	width: 33.3%;
}
.Launch strong{
	font-size: 28px;
	color: #FECB00;
	display: inline-block;
	margin-bottom: 0.4rem;
}
.homepage{
	padding:1rem 1.5rem;
	font-size: 15px;
}
.title{
	position: relative;
	padding-left: 1rem;
	margin-bottom: 1rem;
}
.title img{
	width:0.75rem;
	height: 0.75rem;
	position: absolute;
	top: 50%;
	margin-top: -0.375rem;
	left: 0;
}
.xinxi{
	float: left;
	display: inline-block;
	width:22%;
	height: 12rem;
	background:url("../../assets/bg3.png");
	background-size: 100% 100%;
	margin-right: 1rem;
	position: relative;
}
.xinxi .span1{
	display: block;
	margin-top: 1rem;
	padding-left: 1.8rem;
}
.xinxi .span2{
	display: block;
	margin-top: 1rem;
	text-align: center;
	font-size: 0.98rem;
	font-weight: 500;
	color: #333;
}
.xinxi .span3{
	display: block;
	margin-top: 0.2rem;
	text-align: center;
	font-size: 12px;
	color: #FFD800;
	font-weight: 700;
}
.xinxi .span4{
	font-weight: 700;
	font-size:16px;
}
.xinxi .span5{
	color: #333;
	font-size:16px;
	margin-top: 0.2rem;
}
.xinxi img{
	display: block;
	width:4rem;
	height: 4rem;
	margin: 0.5rem auto;
}
.message{
	float: left;
	width:18%;
	height: 12rem;
	position: relative;
	margin-right: 1rem;
	background:url("../../assets/bg5.png");
	background-size:100% 100%;
}
.m_title{
	display: flex;
	margin-top: 1rem;
	padding-left: 1rem;
}
.m_title img{
	margin-right: 0.5rem;
}
.message_span{
	display: inline-block;
	position: relative;
}
.message_span img{
	display: block;
	margin: 0 auto;
}
.message_span span{
	position: absolute;
	top: -0.4rem;
	left: 65%;
	text-align: center;
	line-height: 1rem;
	font-size:12px;
	background:red;
	opacity: 0.6;
	color: white;
	padding:0.1rem;
	min-width:1rem;
	height: 1rem;
	border-radius: 50%;
}

.m_span1{
	position: absolute;
	top: 3rem;
	left: 15%;
}
.m_span2{
	position: absolute;
	top: 3rem;
	left: 55%;
}
.m_span3{
	position: absolute;
	top: 7rem;
	left: 15%;
}
.m_span4{
	position: absolute;
	top: 7rem;
	left: 58%;
}

.tel{
	width:22%;
}
.tel div{
	margin: 1rem 0;
	padding-left: 2rem;
	font-weight: 700;
	font-size:16px;
	padding-right: 1rem
}
.quxiao{
	margin-top: 0
}

</style>

<style>
.choice .el-input__prefix, .el-input__suffix {
    color: blue !important;
}
.choice .el-input__inner{
	display: none !important;
	border:0; 
}
.choice .el-input__prefix {
	top: 0;
	left: 0 !important;
}
</style>
