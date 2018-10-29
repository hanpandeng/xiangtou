<template>
	<div class="examine">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：账号管理 > <router-link tag='span' to='/buyinfo'>发广告账号</router-link>  > 审核</div>
		
		<div class="title title1"><img src="../../assets/faguanggao2.png"> 审核</div>

		<div class="content" v-for='item in items'>
			<div class="every">
				<span class="name"> 账号</span>
				<span class="value">{{item.buyerAccount.accountName}}</span>
			</div>
			<div class="every">
				<span class="name"> 联系人姓名</span>
				<span class="value">{{item.buyerUserName}}</span>
			</div>
			<div class="every">
				<span class="name"> 联系人电话</span>
				<span class="value">{{item.buyerPhone}}</span>
			</div>
			<div class="every">
				<span class="name"> 商家名称</span>
				<span class="value">{{item.buyerName}}</span>
			</div>
			<div class="every">
				<span class="name"> 联系地址</span>
				<span class="value">{{item.buyerAddress}}</span>
			</div>
			<div class="every logo">
				<span class="name"> LOGO</span>
				<span class="value"><img  :src="item.advertiseLogo"></span>
			</div>
			<div class="every Business">
				<span class="name"> 营业执照</span>
				<span class="value"><img @click='pictures1()' :src="item.businessLicense"></span>
			</div>
			<div v-if='pictures == true'>
				<div class="pictures"></div>
				<img class="picturesimg" :src="item.businessLicense">
				<img @click='closeup()' class="warnimg" src="../../assets/cha.png">
			</div>
		</div>
		<div class="bottom">
			<span class="adopt" @click='adopt()'>通过</span>
			<span class="Notthrough" @click='Notthrough()'>不通过</span>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'examine',
		data(){
			return {
				pictures:false,
				buyerInfoId:'',
				buyerAccountId:'',
				fenye:'',
				items:[]
			}
		},
		created(){
			var that = this;
			// console.log(this.$route.query.buyerInfoId)
			// console.log(this.$route.query.currentPage)
			this.buyerInfoId = this.$route.query.buyerInfoId
			this.buyerAccountId = this.$route.query.buyerAccountId
			this.fenye = this.$route.query.currentPage
			axios({
				url:'Buyinfo/buyerinfo',
				method:"post",
				data:{
					buyerInfoId:that.buyerInfoId,
					buyerAccountId:that.buyerAccountId
				}
			}).then(function(res){
				that.items.push(res.data.data) 
				// console.log(res)
			})
		},
		methods:{
			adopt(){
				var that= this;
				axios({
					url:'Buyinfo/setbuyerconfirmed',
					method:'post',
					data:{
						buyerInfoId:that.buyerInfoId,
						buyerAccountId:that.buyerAccountId
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.$router.push({path: '/buyinfo',params: {fenye: that.fenye}})
					}
				})	
			},
			Notthrough(){
				var that= this;
				axios({
					url:'Buyinfo/setbuyerunpass',
					method:'post',
					data:{
						buyerInfoId:that.buyerInfoId,
						buyerAccountId:that.buyerAccountId
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.$router.push({path: '/buyinfo',params: {fenye: that.fenye}})
					}
				})
			},
			pictures1(){
				this.pictures = true
			},
			closeup(){
				this.pictures = false
			}
		}
	}
</script>

<style scoped>
.examine{
	padding:1rem ;
	font-size: 15px;
}
.title{
	margin-left: 1.5rem;
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
.title1{
	padding-left: 2.5rem;
	margin-left: 0.5rem;
	padding-top: 0.8rem;
	padding-bottom: 0.8rem;
	margin-top: 2rem;
	background:#FFFFFF;
	border-radius: 0.3rem;
}
.title1 img{
	left: 1rem;
}
.content{
	margin-top: 2rem;
	margin-left: 0.5rem;
}
.every{
	background-color: white;
	padding:0.8rem 0;
	display: flex;
	margin-bottom: 0.1rem;
}
.name{
	padding-left:1rem;
}
.value{
	margin-left: 1rem;
	color: #9A9A9A;
}
.logo .name{
	line-height: 3.5rem
}
.logo img{
	margin-left: 1.5rem;
	width:3.5rem;
	height:3.5rem;
	border-radius: 50%;
}
.Business .name{
	line-height: 4rem;
}
.Business img{
	width:4rem;
	height:4rem;
	border-radius: 0.3rem;
	margin-left: 0.6rem
}
.bottom{
	margin-top: 1.5rem;
}
.bottom span{
	cursor: pointer;
	margin-left: 1rem;
	float: right;
	display: inline-block;
	padding:0.5rem 0;
	width:5rem;
	text-align: center;
	border-radius: 2rem;
	color: white;
}
.adopt{
	background-color: #01EFA3;
}
.Notthrough{
	background-color: #FF7189;
}
.pictures{
	position: fixed;
	top: 0;
	left: 0;
	width:100%;
	height:3000px;
	background-color: #333;
	opacity: 0.5;
}
.picturesimg{
	position: fixed;
	width:17rem;
	height:22rem;
	top: 40%;
	left: 50%;
	margin-top: -8.5rem;
	margin-left:-8.5rem; 
}
.warnimg{
	width:1.75rem;
	height:1.75rem;
	position: fixed;
	top: 72%;
	left: 50%;
	margin-left: -0.875rem;
}
</style>