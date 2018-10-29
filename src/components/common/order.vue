<template>
	<div class="order">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：预约管理</div>
		<div class="title title1"><img src="../../assets/yuyue3.png"> 预约管理</div>
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
				<span>订单号</span>
				<input  v-model='order' placeholder="请输入订单号以查询">
			</div>
			<span class=" chaxun1" @click='Launch'>
				<img src="../../assets/chaxun.png">
				已投放
			</span>
			<span class="chaxun1" @click='complete'>
				<img src="../../assets/chaxun.png">
				已完成
			</span>
			<span class="chaxun" @click='search'>
				<img src="../../assets/chaxun.png">
				查询
			</span>
			<span class="chaxun" @click='reset'>
				<img src="../../assets/chongzhi.png">
				重置
			</span>
			<span class="chaxun chaxun2" @click='removeall'>
				批量删除
			</span>
		</div>
		
		<div class="content">
				<div class="heads">
					<span class="selection selection1" @click='Totalselection()'>
					<img src="../../assets/kaifaxiaochengx2.png"> {{selection}}</span>
					<span class="xuhao">序号</span>
					<span class="industry">订单号</span>
					<span class="Contactname">联系人姓名</span>
					<span class="Contacttel">联系人电话</span>
					<span class="number">付款金额</span>
					<span class="shijian">付款时间</span>
					<span class="kong"></span>
					<span class="region">状态</span>
					<span class="operation">操作</span>
				</div>
				
				<div class="heads heads1" v-for='(item,index) in items'>
					<span class="selection selection1" @click='Totalselection()'>
							<img v-if='item.state == false' src="../../assets/gou2.png">
							<img v-if='item.state == true' src="../../assets/gou1.png">
					</span>
					<span class="xuhao">{{index + 1}}</span>
					<span class="industry">{{ item.orderNumber}}</span>
					<span class="Contactname">{{item.buyerInfo.buyerUserName}}</span>
					<span class="Contacttel">{{item.buyerInfo.buyerPhone}}</span>
					<span class="number">{{item.orderAmount}}</span>
					<span class="shijian">{{item.createTime}}</span>
					<span class="kong"></span>
					<span class="region">
						{{ item.orderState == 0 ? '待支付' : item.orderState == 1 ? '已支付' : item.orderState == 2 ? '已投放' :  item.orderState ==3 ? '已完成' : '' }} 
					</span>	
					<span class="operation">
							<img v-if='item.orderState == 0' @click='edit(item.orderListId)' src="../../assets/chakan.png">
							<img v-if='item.orderState != 0' @click='edit(item.orderListId)' src="../../assets/bianji.png">
							<img @click='remove(item.orderListId)' src="../../assets/shanchu.png">
					</span>
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
				<span class="span3 btn_que"  @click="dialog()">确认</span>
				<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
			</span>
		</el-dialog>
	</div>

</template>

<script>
	import axios from 'axios'
	export default{
		name:'order',
		data(){
			return {
				dialogVisible:false,
				hint:'',
				selection:'全选',
				user:'',
				telphone:'',
				order:'',
				currentPage:1,
				totalPage:1,
				items:[],
				orderListId:'',
				Difference:false
			}
		},
		created(){
			
			if(this.$route.params.fenye){
				// this.currentPage = this.$route.params.fenye 
				// console.log(this.currentPage)
				this.fenye(this.$route.params.fenye)
				// this.currentPage = this.$route.params.fenye
			}else{
				this.fenye(1)
			}
			
		},
		methods:{
			fenye(index){
				var that= this;
				axios({
					url:"Orders/orderpagelist",
					method:'get',
					params:{
						currentpage:index
					}
				}).then(function(res){
					if(res.data.code == 200){
						// console.log(res)
						var data = res.data.data.lists;
						data.forEach(function(item,index){
							item.state = false
						})
						that.items = data
						that.totalPage = res.data.data.totalPage
						that.currentPage = res.data.data.currPage
					}
				})
			},
			handleCurrentChange(val){
				// console.log(val)
				this.fenye(val)
			},
			search(){
				var that= this;
				axios({
					url:"Orders/orderpagelist",
					method:'get',
					params:{
						orderNumber:that.order,
						buyerUserName:that.user,
						buyerPhone:that.telphone
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						var data = res.data.data.lists;
						data.forEach(function(item,index){
							item.state = false
						})
						that.items = data
						that.totalPage = res.data.data.totalPage
					}
				})

			},
			reset(){
				this.user=''
				this.telphone=''
				this.order=''
			},
			Totalselection(){
				 if(this.selection == '取消'){
		    		this.selection = '全选'
		    		this.items.forEach(function(item,index){
		    			item.state = false
		    		})
		    	}else{
		    		this.selection = '取消'
		    		this.items.forEach(function(item,index){
		    			item.state = true
		    		})
		    	}
			},
			edit(orderListId){
				this.$router.push({path:'/orderediting',query:{orderListId:orderListId,currentpage:this.currentPage}})
			},
			remove(orderListId){
				this.dialogVisible = true;
				this.orderListId = orderListId
				this.Difference = false
				this.hint = '此操作将会删除该订单'
			},
			removeall(){
				this.dialogVisible = true;
				this.Difference = true
				this.hint = '确定要批量删除订单吗？'
			},
			dialog(){

				var that = this;
				if(that.Difference == false){
					axios({
						url:'Orders/deleteorder',
						method:'post',
						data:{
							orderListId:that.orderListId
						}
					}).then(function(res){

						if(res.data.code == 200){
							var data = res.data.data.lists;
							data.forEach(function(item,index){
								item.state = false
							})

							that.dialogVisible = false;
							that.items = data
							that.totalPage = res.data.data.totalPage
							that.currentPage = res.data.data.currPage
						}
					})

				}else {
					
					var jsonid=[]
					that.items.forEach(function(item,index){
						if(item.state == true){
							jsonid.push(item.orderListId)
						}
					})

					axios({
						url:'Orders/multdeleteorder',
						method:'post',
						data:{
							jsonId:JSON.stringify(jsonid)
						}
					}).then(function(res){
						that.dialogVisible = false;
						if(res.data.code == 200){
							var data = res.data.data.lists;
							data.forEach(function(item,index){
								item.state = false
							})
							that.items = data
							that.totalPage = res.data.data.totalPage
							that.currentPage = res.data.data.currPage
						}
					})
				}
			},
			complete(){
				var that= this;
				axios({
					url:"Orders/orderpagelist",
					method:'get',
					params:{
						orderNumber:that.order,
						buyerUserName:that.user,
						buyerPhone:that.telphone
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						var data = res.data.data.lists;
						data.forEach(function(item,index){
							item.state = false
						})
						that.items = data
						that.totalPage = res.data.data.totalPage
					}
				})
			},
			Launch(){
				var that= this;
				axios({
					url:"Orders/orderpagelist",
					method:'get',
					params:{
						orderNumber:that.order,
						buyerUserName:that.user,
						buyerPhone:that.telphone
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						var data = res.data.data.lists;
						data.forEach(function(item,index){
							item.state = false
						})
						that.items = data
						that.totalPage = res.data.data.totalPage
					}
				})
			}
		}
	}

</script>

<style scoped>
.order{
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
.search{
	margin-left: 0.5rem;
	height:45px;
}
.nicheng{
	margin-right: 1rem;
	display: inline-block;
	font-size: 14px;
	position: relative;
}
.nicheng input{
	width:9.25rem;
	height: 2.25rem;
	border: 0;
	outline: none;
	padding-left: 5.5rem;
	border-radius: 0.3rem;
}
.nicheng1 input{
	padding-left: 4rem;
}
.search1{
	margin-top: 1.5rem;
}
.search1 span{
	float: left;
	padding: 0.5rem 1.3rem;
	margin: 0 1.5rem 0 0;
}
.nicheng>span{
	position: absolute;
	left: 1rem;
	top: 0.6rem;
}
.nicheng2{
	position: relative;
}
.chaxun{
	margin-top: 0.15rem;
	cursor: pointer;
	margin-left: 1.5rem;
	float: right;
	background-color: #FFCC00;
	padding: 0.5rem 1.3rem;
	padding-left: 2.5rem;
	border-radius: 1rem;
	color: white;
	position: relative;
}
.chaxun img,.chaxun1 img{
	position: absolute;
	top: 50%;
	margin-top: -0.375rem;
	left: 1.5rem;
	width:0.75rem;
	height: 0.75rem;
}
.chaxun1{
	margin-top: 0.15rem;
	cursor: pointer;
	margin-right: 1rem;
	background-color: #FFCC00;
	padding: 0.5rem 1.3rem;
	padding-left: 2.5rem;
	border-radius: 1rem;
	color: white;
	position: relative;
}
.chaxun2{
	padding: 0.5rem 1.3rem;
	background-color: #FF3545;
}
.content{
	margin-top: 2rem;
}
.headtitle{
	color: #999;
	line-height: 2rem
}
.inputs input{
	text-align: center;
	border:0;
	outline: none;
}
.heads{
	display: flex;
	background-color: white;
	padding:0.8rem 0;
	margin-bottom: 0.1rem;
}
.region span{
	margin-left: 3%;
}

.heads .selection,.heads .xuhao{
	width:7%;
	text-align: center;
}
.heads .operation, .heads .industry{
	width:15%;
	text-align:center;
}
.heads .Contacttel{
	width:10%;
	text-align:center;
}
.heads .shijian{
	width:12%;
	text-align:center;
}
.heads .Contactname,.heads .region{
	width:8%;
	text-align: center;
}
.heads .number{
	width:7%;
	text-align:center;
}
.kong{
	width:11%;
}
.heads1 span{
	line-height: 2rem;
}
.heads1 .selection{
	display: flex;
}
.heads1 .selection img{
	width: 20px;
	height: 20px;
	margin: auto;
}
.heads1  .operation{
	line-height: 0
}
.heads1  .operation img{
	width: 40px;
	height: 40px;
}
</style>