<template>
	<div class="orderediting">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/order'>预约管理</router-link> >编辑</div>
		<div class="title title1"><img src="../../assets/yuyue3.png"> 编辑</div>
		<div class="content" v-for='item in items'>
			<div class="every">
				<span>订单号</span>
				<span class="huise">{{item.orderNumber}}</span>
			</div>
			<div class="every">
				<span>联系人姓名</span>
				<span class="huise">{{item.buyerInfo.buyerUserName}}</span>
			</div>
			<div class="every">
				<span>联系人电话</span>
				<span class="huise">{{item.buyerInfo.buyerPhone}}</span>
			</div>
			<div class="every">
				<span>付款金额</span>
				<span class="hong">￥{{item.orderAmount}}</span>
			</div>
			<div class="every">
				<span>付款时间</span>
				<span class="huise">{{item.createTime}}</span>
			</div>
			<div class="every">
				<span>付款项目</span>
				<span class="huise">上海松江万达广告位</span>
			</div>
			<div class="every">
				<span>广告屏数</span>
				<span class="huise">5</span>
			</div>
			<div class="every">
				<span>所选天数</span>
				<span class="huise">20</span>
			</div>
			<div class="every">
				<span>状态</span>
				<div class="rileft">
					<span style="color: #999" @click='modify(1)'>
						<img v-if='state1 == 1'  src="../../assets/gou1.png">已支付
					</span>
					
					<span  @click='modify(2)' style="color: #FFCC00">
						<img  v-if='state1 == 2' src="../../assets/gou1.png">已投放
					</span>
					
					<span @click='modify(3)' style="color: #6BFDB2">
						<img  v-if='state1 == 3' src="../../assets/gou1.png">已完成
					</span>
				</div>
			</div>
			<span v-if='item.orderState != 0' class="save" @click='save'>保存</span>
			<span class="save" @click='fanhui'>返回</span>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:"orderediting",
		data(){
			return {
				state1:1,
				stete:1,
				items:[]
			}
		},
		created(){
			this.query()
		},
		methods:{
			query(){
				var that = this;
				axios({
					url:'Orders/showorder',
					method:'get',
					params:{
						orderListId:that.$route.query.orderListId
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.stete = res.data.data.orderState
						// console.log(typeof res.data.data.orderState)
						that.state1 = res.data.data.orderState
						that.items.push(res.data.data)
						// console.log(res)
					}
				})
			},
			save(){
				var that = this ;
				axios({
					url:'Orders/editorderlist',
					method:'post',
					data:{
						orderListId:that.$route.query.orderListId,
						orderState:that.state1
					}
				}).then(function(res){
					if(res.data.code == 200){
						// console.log()
						that.$router.push({name:'order',params:{fenye:that.$route.query.currentpage}})
					}
				})
			},
			fanhui(){
				var that = this;
				that.$router.push({name:'order',params:{fenye:that.$route.query.currentpage}})
			},
			modify(index){

				if(this.stete == 1){
					if(index == 1){
						this.state1 = 1
					}
					if(index == 2){
						this.state1 = 2
					}
				}
				if(this.stete == 2){
					if(index == 2){
						this.state1 = 2
					}
					if(index == 3){
						this.state1 = 3
					}
				}
			}
		}
	}
</script>

<style scoped>
.orderediting{
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
	padding:0.8rem 1rem;
	margin-bottom: 0.1rem;
	background:white;
}
.every span{
	margin-right: 1rem;
}
.huise{
	color: #999;
}
.hong{
	color: #FF4B69;
}
.save{
	cursor: pointer;
	padding:0.5rem 1.5rem;
	border-radius: 1rem;
	background:#FFCC00;
	color: white;
	float: right;
	margin-top: 1rem;
	margin-left: 1rem;
}
.rileft{
	float: right;
	display: flex;
}
.rileft span{
	cursor: pointer;
	margin:0 2rem;
	display: flex;
}
.rileft img{
	margin-right: 0.5rem;
}
</style>