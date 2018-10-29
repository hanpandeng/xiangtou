<template>
	<div class="labelmodify">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/labels'>标签管理</router-link> > 链接广告位</div>
		
		<div class="title title1"><img src="../../assets/biaoqian2.png"> 链接广告位</div>
		
		<div class="search"> 
			<div class="nicheng ">
				<span>联系人姓名</span>
				<input v-model='admin' placeholder="请输入联系人姓名以查询">
			</div>
			<div class="nicheng ">
				<span>联系人电话</span>
				<input  v-model='telphone' placeholder="请输入联系人电话以查询">
			</div>
			<div class="nicheng ">
				<span>商家名称</span>
				<input  v-model='business' placeholder="请输入商家名称以查询">
			</div>
			<span class="chaxun chaxun1 " @click='addbits()'>
				添加
			</span>
			<span class="chaxun chaxun1 fanhui" @click='fanhui()'>
				返回
			</span>
			
			<span class="chaxun" @click='reset()'>
				<img src="../../assets/chongzhi.png">
				重置
			</span>
			<span class="chaxun" @click='search()'>
				<img src="../../assets/chaxun.png">
				查询
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
			</div>

			<div class="heads heads1" v-for='(item,index) in items'>
				<span class="selection selection1">
					<img v-if='item.state == false' @click='item.state = true' src="../../assets/gou2.png">
					<img v-if='item.state == true' @click='item.state = false' src="../../assets/gou1.png">
				</span>
				<span class="xuhao">{{index + 1}}</span>
				<span class="industry">{{item.sellerInfo.sellerName}}</span>
				<span class="Contactname">{{item.sellerInfo.sellerUserName}}</span>
				<span class="Contacttel">{{item.sellerInfo.sellerPhone}}</span>

				<span class="number">{{item.pedestrianVolume}}元/天</span>
				<span class="shijian">{{item.createTime}}</span>
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
		name:'labelmodify',
		data(){
			return {
				totalPage:1,
				currentPage:1,
				selection:"全选",
				telphone:'',
				admin:'',
				business:'',
				items:[]
			}
		},
		created(){
			// console.log(parseInt(this.$route.query.lableId))
			this.query()
		},
		methods:{
			query(){
				var that = this;
				axios({
					url:'Selladvterise/selladvPagelist',
					method:'get',
					params:{
						lableId:parseInt(that.$route.query.lableId)
					}
				}).then(function(res){
					var data = res.data;
					if(data.code == 200){
						data.data.lists.forEach(function(item,index){
							item.state = false
						})
						that.items = data.data.lists;
						that.totalPage = data.totalPage
					}else if(data.code == 1003){

						that.items = [];
						that.totalPage = 0
					}
				})
			},
			handleCurrentChange(){
				this.query()
			},
			Totalselection(){
				var data = this.items;
				if(this.selection == '全选'){
					data.forEach(function(item,index){
						item.state = true
					})
					this.selection = '取消'
				}else{
					data.forEach(function(item,index){
						item.state = false
					})
					this.selection = '全选'
				}
			},
			reset(){
				this.telphone=''
				this.admin=''
				this.business=''
			},
			search(){
				var that = this;
				axios({
					url:'Selladvterise/selladvPagelist',
					method:'get',
					params:{
						sellerName:that.business,
						sellerUserName:that.admin,
						sellerPhone:that.telphone,
						lableId:parseInt(that.$route.query.lableId)
					}
				}).then(function(res){
					var data = res.data.data;
					data.lists.forEach(function(item,index){
						item.state = false
					})
					that.items = data.lists;
					that.totalPage = data.totalPage
				})
			},
			addbits(){
				var that = this;
				var jsonid = [];

				that.items.forEach(function(item,index){
					if(item.state == true){
						jsonid.push(item.sellerAdvertiseId)
					}
				})
				// console.log(jsonid)
				axios({
					url:'Lable/multaddlinks',
					method:'post',
					data:{
						lableId:parseInt(that.$route.query.lableId),
						jsonId:JSON.stringify(jsonid)
					}
				}).then(function(res){
					that.query()
				})
			},
			fanhui(){
				this.$router.push({path:'/labels'})
			}
		}
	}
</script>

<style scoped>
.labelmodify{
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
.chaxun1{
	padding: 0.5rem 1.9rem;
}
.chaxun img{
	position: absolute;
	top: 50%;
	margin-top: -0.375rem;
	left: 1.5rem;
	width:0.75rem;
	height: 0.75rem;
}
.fanhui{
	background-color: #CCCCCC
}
.shanchu{
	background-color: #FF3545
}
.content{
	margin-top: 2rem;
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
.selection1{
	display: flex;
	justify-content: center;
}
.selection1 img{
	margin-right: 0.3rem
}
.heads .selection,.heads .xuhao{
	width:7%;
	text-align: center;
}
.heads .shijian, .heads .industry{
	width:15%;
	text-align:center;
}
.heads .Contactname,.heads .Contacttel{
	width:10%;
	text-align: center;
}
.heads1 .selection,.heads1 .number,.heads1 .Contactname,
.heads1 .Contacttel,.heads1 .industry,
.heads1 .shijian,.heads1 .xuhao{
	line-height: 2rem;
}
.selection1{
	display: flex;
}
.heads1 .selection1 img{
	width:20px;
	height: 20px;
	margin: auto;
}
.selection2{
	position: relative;
}
.heads .number{
	width:10%;
	text-align:center;
}
.selection2 img{
	position: absolute;
	width:1rem;
	height: 1rem;
	top: 50%;
 	left: 50%;
	margin-top: -0.5rem;
	margin-left: -0.5rem;
	cursor: pointer;
}

</style>
<style>
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
.xanze input{
	border: 0;
	outline: none;
}
</style>