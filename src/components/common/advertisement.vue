<template>
	<div class="advertisement">
		<!-- <Warning  v-on:adminstate="adminfalse" v-on:confirm='confirm' :flag="flag" name = "123"></Warning> -->
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：账号管理 > 接广告账号</div>
		
		<div class="title title1"><img src="../../assets/faguanggao2.png"> 接广告账号</div>
		
		<div class="search"> 
			<div class="nicheng nicheng3">
				<span>账号</span>
				<input v-model='admin' placeholder="请输入联系人账号以查询">
			</div>
			<div class="nicheng ">
				<span>联系人姓名</span>
				<input  v-model='user' placeholder="请输入联系人姓名以查询">
			</div>
			<div class="nicheng ">
				<span>联系人电话</span>
				<input  v-model='telphone' placeholder="请输入联系人电话以查询">
			</div>
			<div class="nicheng nicheng2">
				<span>状态</span>
				<input  v-model='telphone' readonly>
				<el-select class='xanze' v-model="state" placeholder="选择状态以查询">
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
				<span class="Contacts">联系人姓名</span>
				<span class="telephone">联系人电话</span>
				<span class="Account ">账号</span>
				<span class="balance">余额</span>
				<span class="submission">提交时间</span>
				<span class="states">状态</span>
				<span class="operation operation1">操作</span>
			</div>
			<div class="heads heads1" v-for='(item,index) in items'>
				<span class="number">{{index+1}}</span>
				<span class="Contacts">{{item.sellerUserName}}</span>
				<span class="telephone">{{item.sellerPhone}}</span>
				<span class="Account ">{{item.sellerAccount.accountName}}</span>
				<span class="balance balance1">{{item.sellerAccount.balance}}</span>
				<span class="submission">{{item.createTime}}</span>
				<span :class="[classstate, item.frozenState == 1 ? 'dongjie' : item.auditState == 0? 'shenhe' : item.auditState == 1 ? 'tongguo' : item.auditState == 2 ? 'passno' :  item.auditState == 3 ? 'already ' : '' ]"  >
				{{ item.frozenState == 1 ? '已冻结' : item.auditState == 0 ? '待审核' : item.auditState == 1 ? '已通过' :  item.auditState ==2 ? '未通过' : item.auditState == 3 ? '已添加广告位' : '' }} 
				</span>
				<span class="operation"> 
					<!-- 链接 -->
					<img v-if='item.auditState == 1 && item.frozenState == 0' src="../../assets/tianjiaguanggao.png" @click='Linkadvertising(item.sellerInfoId,item.sellerAccount.sellerAccountId)'>
					<!-- 审核 -->
					<img v-if='item.auditState == 0 && item.frozenState !=1' @click='examine(item.sellerInfoId,item.sellerAccount.sellerAccountId)' src="../../assets/shenhe.png">
					<!-- 查看 -->
					<img @click='accountcheck(item.sellerInfoId,item.sellerAccount.sellerAccountId)' src="../../assets/chakan.png">

					<!-- 冻结 -->
					<img v-if='item.frozenState==0 &&　item.auditState != 2' @click='Frozen(item.sellerInfoId,item.sellerAccount.sellerAccountId,item.openId)' src="../../assets/dingjie.png">

					<!-- 解冻 -->
					<img v-if='item.frozenState==1　&& item.auditState != 2' @click='Thaw(item.sellerInfoId,item.sellerAccount.sellerAccountId)' src="../../assets/jiedong.png">
					
				</span>
			</div>
		</div>


		
		<!-- examine    -->
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
	import Warning from './warning'
	import axios from 'axios'
	export default{
		name:"advertisement",
		data(){
			return {
				dialogVisible:false,
				hint:'',
				modify:false,
				flag:false,
				currentPage: 1,
				totalPage:0,
				classstate:"states",
				admin:'',
				user:'',
				telphone:'',
				state:'',
				items:[],
				options: [
				{
		          value: '1',
		          label: '已通过'
		        }, {
		          value: '2',
		          label: '未通过'
		        },				{
		          value: '0',
		          label: '待审核'
		        }
		        ],
		        sellerInfoId:'',
		        sellerAccountId:'',
		        openId:''
			}
		},
		components:{
			Warning
		},
		created(){
			// console.log(this.$route.params.fenye)
			if(this.$route.params.fenye == undefined){
				this.fenye(1)
			}else{
				console.log("传回分页纸")
				this.fenye(this.$route.params.fenye)
			}

		},
		methods:{
			search(){
				var that = this;
				axios({
					url:'Sellinfo/sellpagelist',
					method:'get',
					params:{
						account:that.admin,
						sellerUserName:that.user,
						sellerPhone:that.telphone,
						auditState:that.state
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.items = res.data.data.lists; 
						that.totalPage = res.data.data.totalPage
					}
					
				})
			},
			adminfalse(val){
				this.flag = val
			},
			reset(){
				this.admin=''
				this.user=''
				this.telphone=''
				this.state=''
			},
			fenye(index){
				var that = this;
				axios({
					url:'Sellinfo/sellpagelist',
					method:'get',
					params:{
						currentpage:index
					}
				}).then(function(res){
					// console.log(res.data.data)
					that.items = res.data.data.lists; 
					that.totalPage = res.data.data.totalPage
				})
			},
			handleCurrentChange(){
				this.fenye(this.currentpage)
			},
			Frozen(sellerInfoId,sellerAccountId,openId){
				var that = this;
				that.flag = true;
				that.sellerInfoId = sellerInfoId
				that.sellerAccountId = sellerAccountId
				that.openId = openId
				that.dialogVisible = true
				that.hint= '确定要冻结改账号吗？'
			},
			dialog(){
				var that = this;
				if(that.flag == true){
					axios({
						url:'Sellinfo/setsellerfrozen',
						method:'post',
						data:{
							sellerInfoId:that.sellerInfoId,
							sellerAccountId:that.sellerAccountId,
							openId:that.openId
						}
					}).then(function(res){
						// if(res.data.code == 200){
							that.dialogVisible = false
							that.fenye(that.currentPage)
						// }
					})
				}else{
					axios({
						url:'Sellinfo/setsellernormal',
						method:'post',
						data:{
							sellerInfoId:that.sellerInfoId,
							sellerAccountId:that.sellerAccountId
						}
					}).then(function(res){
						// if(res.data.code == 200){
							that.dialogVisible = false
							that.fenye(that.currentPage)
						// }
						
					})
				}
			},
			Thaw(sellerInfoId,sellerAccountId){
				var that = this;
				that.flag = false;
				that.sellerInfoId = sellerInfoId
				that.sellerAccountId = sellerAccountId
				that.dialogVisible = true
				that.hint= '确定要解冻改账号吗？'	
			},
			examine(sellerInfoId,sellerAccountId){
				var that = this; 
				that.$router.push({path: '/sellinfoexamine',query: {sellerInfoId: sellerInfoId,sellerAccountId:sellerAccountId,currentPage:that.currentPage}})
			},
			accountcheck(sellerInfoId,sellerAccountId){
				var that = this; 
				that.$router.push({path: '/accountcheck',query: {sellerInfoId: sellerInfoId,sellerAccountId:sellerAccountId,currentPage:that.currentPage}})
			},
			Linkadvertising(sellerInfoId,sellerAccountId){
				var that = this; 
				that.$router.push({path: '/linkadvertising',query: {sellerInfoId: sellerInfoId,sellerAccountId:sellerAccountId,currentPage:that.currentPage}})
			}
		}
	}
</script>

<style scoped>
.advertisement{
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
.content{
	margin-top: 2rem;
}

.heads{
	/*width: 100%;*/
	display: flex;
	background-color: white;
	margin-left: 0.5rem;
	margin-bottom: 0.1rem
}
.heads span{
	padding:0.8rem 0;
	text-align: center;
}
/*heads1*/
.heads .number,.heads .balance{
	width:7%;
/*	line-height: 2rem*/
}
.heads .Contacts,.heads .telephone,.heads .Account{
	width:10%;
/*	line-height: 2rem;*/
}
.heads1 .number,.heads1 .balance{
	line-height: 2rem
}    
.heads1 .Contacts,.heads1 .telephone,.heads1 .Account,.heads1 .submission,.heads1 .states{
	line-height: 2rem;
}
.heads .operation,.heads .submission{
	width:15%;
}
.heads .states{
	width:29%;
}
.balance1{
	color: #FF4448;
}
.dongjie{
	color: #025AFC
}
.tongguo{
	color: #41F1B3
}
.shenhe{
	color: #CCCCCC
}
.passno{
	color: #FE728C
}
.already{
	color: #FCCC00
}
.operation img{
	float: right;
	margin-left: 0.3rem;
}

.operation{
	/*margin-left: -2rem;*/
    display: flex;
    justify-content: center;
}
.operation1{
	margin: 0;
}
.operation1 span{
	line-height: inherit;
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
	left: 3rem;
}
</style>
<style>
.xanze input{
	border: 0;
	outline: none;
}
</style>