<template>
	<div class="member">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：会员管理</div>
		
		<div class="title title1"><img src="../../assets/huiyuan2.png"> 会员管理</div>
		
		<div class="search"> 
			<div class="nicheng nicheng3">
				<span>姓名</span>
				<input v-model='admin' placeholder="请输入姓名以查询">
			</div>
			<div class="nicheng nicheng2">
				<span>会员号</span>
				<input  v-model='MemberID' placeholder="请输入会员号以查询">
			</div>
			<div class="nicheng nicheng2">
				<span>会员等级</span>
				<input readonly>
				<el-select class='xanze' v-model="state" placeholder="选择会员等级以查询">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				 </el-select>
			</div>
			<span class="chaxun" @click='search()'>
				<img src="../../assets/chaxun.png">
				查询
			</span>
			<span class="chaxun" @click='reset()'>
				<img src="../../assets/chongzhi.png">
				重置
			</span>
		</div>
		
		<div class="content">
			<div class="heads">
		 		<span class="number">序号</span>
		 		<span class="name">姓名</span>
		 		<span class="telphone">联系方式</span>
		 		<span class="MemberID">会员号</span>
		 		<span class="time">提交时间</span>
		 		<span class="Grade">会员等级</span>
		 		<span class="balance">会员余额</span>
		 		<span class="balance1">活动会员余额</span>
		 		<span class="kong"></span>
		 		<span class="operation">操作</span>
			</div>
			<div class="heads heads1" v-for='(item,index) in items'>
		 		<span class="number">{{index + 1}}</span>
		 		<span class="name">{{item.buyerInfo.buyerUserName}}</span>
		 		<span class="telphone">{{item.buyerInfo.buyerPhone}}</span>
		 		<span class="MemberID">{{item.membershipNumber}}</span>
		 		<span class="time">{{item.createTime}}</span>
		 		<span class="Grade">{{arrmember[index]}}</span>
		 		<span class="balance">￥{{item.balance}}</span>
		 		<span class="balance1">￥{{arrprice[index]}}</span>
		 		<span class="kong"></span>
		 		<span class="operation"><img @click='modify(item.buyerAccountId)' src="../../assets/chakan.png"></span>
			</div>
		</div>
		<el-pagination
			@current-change="handleCurrentChange"
			:current-page.sync="currentPage"
			:page-size="1"
			layout="prev, pager, next, jumper"
			:total="totalPage">
		</el-pagination>

	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'member',
		data(){
			return {
				// dialogVisible:false,
				totalPage:1,
				currentPage:1,
				admin:'',
				MemberID:'',
				items:[],
				state:'',
				arrmember:[],
				arrprice:[],
				options: [
				{
					value: '1',
					label: '注册会员'
				},{
					value: '2',
					label: '白银会员'
				},{
					value: '3',
					label: '黄金会员'
				},{
					value: '4',
					label: '铂金会员'
				},{
					value: '5',
					label: '金钻会员'
				}
		        ]
			}
		},
		created(){
			if(this.$route.params.fenye){
				this.fenye(this.$route.params.fenye)
			}else{
				this.fenye(1)
			}
		},
		methods:{
			fenye(index){
				var that = this;
				axios({
					url:'Membercenter/membercenterpagelist',
					method:'get',
					data:{
						currentpage:index
					}
				}).then(function(res){
					// console.log(res)
						// console.log( JSON.parse(res.data.data.lists[2].memberContent).MemberLevel.memberName)
					
					var data = res.data.data.lists
					that.items = res.data.data.lists;
					that.totalPage = res.data.data.totalPage
					that.currentPage = res.data.data.currPage
					for(var x = 0 ; x< data.length ;x++){
						// console.log( JSON.parse(res.data.data.lists[x].memberContent).MemberLevel.memberName)
						that.arrmember.push(JSON.parse(res.data.data.lists[x].memberContent).MemberLevel.memberName)
						if(JSON.parse(res.data.data.lists[x].memberContent).activityMemberLevel){
							that.arrprice.push(JSON.parse(res.data.data.lists[x].memberContent).activityMemberLevel.activityMemberMoney)
						}else{
							that.arrprice.push("0")
						}
					}
					// console.log(that.arrmember)
				})
			},
			modify(buyerAccountId){
				// console.log(buyerAccountId)
				var that = this;
				this.$router.push({path:'/membermodify',query:{"buyerAccountId":buyerAccountId,fenye:that.currentPage}})
			},
			handleCurrentChange(){
				this.fenye(this.currentpage)
			},
			search(){
				var that = this;
				axios({
					url:'Membercenter/membercenterpagelist',
					method:'get',
					params:{
						buyerUserName:that.admin,
						membershipNumber:that.MemberID,
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.items = res.data.data.lists;
						that.totalPage = res.data.data.totalPage
						that.currentPage = res.data.data.currPage
					}
				})
			},
			reset(){
				this.admin = ''
				this.MemberID = ''
				this.state = ''
			}
		}
	}
</script>

<style scoped>
.member{
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
}
.nicheng{
	margin-right: 2rem;
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
.nicheng>span{
	position: absolute;
	left: 1rem;
	top: 0.6rem;
}
.nicheng3 input{
	padding-left: 3rem;
	padding-right: 2.5rem;
}
.nicheng2{
	position: relative;
}
.nicheng2 input{
	padding-left: 4rem;
	padding-right: 1.5rem;
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
.chaxun img{
	position: absolute;
	top: 50%;
	margin-top: -0.375rem;
	left: 1.5rem;
	width:0.75rem;
	height: 0.75rem;
}
.content {
	margin-top: 2rem;
}
.heads{
	display: flex;
	padding:0.8rem 0;
	background-color: white;
	margin-bottom: 0.1rem;
}

.heads span{
	text-align:center;
}

.heads .kong{
	width:7%;
}
.heads .number{
	width:5%;
}
.heads .name{
	width:8%;
}
.heads .telphone,.heads .MemberID,.heads .Grade,.heads .balance,.heads .time,.heads .balance1{
	width:12%;
}

.heads .operation{
	width:8%;
}
.heads1 span{
	line-height: 2rem;
}
.heads1 .balance,.heads1 .balance1{
	color: #FE718A
}
.heads1 .operation{
	line-height: initial;
}
.heads1 img{
	width:2rem;
	height:2rem;
}
::-webkit-input-placeholder { 
    color:   #C0C4CC
}
:-moz-placeholder {
    color:    #C0C4CC
}
::-moz-placeholder {
    color:    #C0C4CC
}
:-ms-input-placeholder { 
    color:    #C0C4CC
}
.xanze{
	border:0;
	outline: none;
	position: absolute;
	top: 0.15rem;
	left: 4rem;
}
</style>
<style>

.xanze input{
	border: 0;
	outline: none;
}
</style>

