<template>
	<div class="discovery">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：发现管理</div>
		
		<div class="title title1"><img src="../../assets/lunbotu2.png"> 发现管理</div>

		<div class="search"> 
			<div class="nicheng nicheng2">
				<span>时间</span>
				<input placeholder="请输入发布时间以查询">
				<el-date-picker
				class="rili"
				v-model="time"
				clear-icon
				type="date"
				value-format='yyyy-MM-dd'
				placeholder="请选择发布时间以查询">
			</el-date-picker>
		</div>
		
		<div class="nicheng nicheng2">
			<span>类型</span>
			<input readonly>
			<el-select class='xanze'clearable  v-model="state" placeholder="选择状态以查询">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.label"
				:value="item.value">
			</el-option>
			</el-select>
			</div>
			<span class="chaxun1" @click='search()'>
				<img src="../../assets/chaxun.png">
				查询
			</span>
			<span class="chaxun1" @click='reset()'>
				<img src="../../assets/chongzhi.png">
				重置
			</span>
			<span class="chaxun" @click='addvedio'>
				<img src="../../assets/tianjiashipin2.png">
				添加视频
			</span>
			<span class="chaxun" @click='addimg'>
				<img src="../../assets/tianjiatu.png">
				添加图片
			</span>
		</div>

		<div class="content">
			<div class="heads">
				<span class="xuhao">序号</span>
				<span class="titl">标题</span>
				<span class="full">内容</span>
				<span class="shijian">发布时间</span>
				<span class="state">状态</span>
				<span class="options">操作</span>
			</div>
			<div class="heads heads1" v-for='(item,index) in items'>
				<span class="xuhao">{{index + 1}}</span>
				<span class="titl">{{item.discoverTitle}}</span>
				<span class="full">{{item.discoverDeatils}}</span>
				<span class="shijian">{{item.createTime}}</span>
				<span class="state">
					<img v-if='item.discoverState == 1' @click='lower(item.discoverId)' src="../../assets/shangjia.png"> 
					<img v-if='item.discoverState == 0' @click='shelf(item.discoverId)' src="../../assets/xiajia.png">
				</span>
				<span class="options options1">
					<img @click='jump(item.discoverId)' src="../../assets/bianji.png">
					<img @click='remove(item.discoverId)' src="../../assets/shanchu.png">
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
			<span class="span2">确定要删除该发现吗？</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'discovery',
		data(){
			return {
				dialogVisible:false,
				discoverId:'',
				items:[],
				totalPage:1,
				currentPage:1,
				time:'',
				state:'',
				options: [
				{
					value: '1',
					label: '图片'
				},{
					value: '2',
					label: '视频'
				}
				]
			}
		},
		created(){
			this.query()
		},
		methods:{
			query(){
				var that = this;
				axios({
					url:'Discovery/discoverypagelist',
					method:'get',
					params:{
						currentpage:that.currentPage
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.items = res.data.data.lists;
						that.totalPage = res.data.data.totalPage;
					}
				})
			},
			handleCurrentChange(){
				this.query()
			},
			reset(){
				this.state = ''
				this.time =''
			},
			search(){
				var that = this;
				axios({
					url:'Discovery/discoverypagelist',
					method:'get',
					params:{
						createTime:that.time,
						status:that.state
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.items = res.data.data.lists;
						that.totalPage = res.data.data.totalPage;
					}
				})
			},
			addvedio(){
				this.$router.push({path: '/adddiscovery',query: {state: 1}})
			},
			addimg(){
				this.$router.push({path: '/adddiscovery',query: {state: 0}})
			},
			lower(discoverId){
				
				var that = this;
				axios({
					url:'Discovery/discoveryoff',
					method:'post',
					data:{
						discoverId:parseInt(discoverId)
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.query()
					}
				})
			},
			shelf(discoverId){
				var that = this;
				axios({
					url:'Discovery/discoveryon',
					method:'post',
					data:{
						discoverId:parseInt(discoverId)
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.query()
					}
				})
			},
			remove(discoverId){
				this.dialogVisible = true;
				this.discoverId = discoverId
			},
			dialog(){
				var that = this;
				axios({
					url:'Discovery/deletediscovery',
					method:'post',
					data:{
						discoverId:parseInt(that.discoverId)
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.dialogVisible = false;
						that.query()
					}
				})
			},
			jump(discoverId){
				this.$router.push({path: '/discoverymodify',query: {discoverId: discoverId,fenye:this.currentPage}})
			}
		}
	}
</script>

<style scoped>
.discovery{
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
	margin-right: 1rem;
	display: inline-block;
	font-size: 14px;
	position: relative;
}
.nicheng input{
	width:11.25rem;
	height: 2.25rem;
	border: 0;
	outline: none;
	padding-left: 3.5rem;
	border-radius: 0.3rem;
}
.nicheng>span{
	position: absolute;
	left: 1rem;
	top: 0.6rem;
}
.nicheng2 input{
	padding-left: 5rem;
}
.rili{
	position: absolute;
	top: 0.15rem;
	left: 4rem;
}
.chaxun{
	cursor: pointer;
	margin-left: 1.5rem;
	float: right;
	background-color: #FFCC00;
	padding: 0.55rem 1.3rem;
	padding-left: 2.5rem;
	border-radius: 1rem;
	color: white;
	position: relative;
}
.chaxun1{
	cursor: pointer;
	margin-left: 1.5rem;
	background-color: #FFCC00;
	padding: 0.55rem 1.3rem;
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
.content{
	margin-top: 2rem;
	margin-left: 0.5rem;
}
.heads{
	background:white;
	padding:0.8rem 0;
	display: flex;
	margin-bottom: 0.1rem
}
.heads1{
	line-height: 2rem
}
.heads1 span{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.heads1 .options1{
	line-height: 0
}
.heads .xuhao{
	width: 5%;
	text-align: center;
}
.heads .titl,.heads .full{
	width: 15%;
	text-align: center;
}
.heads .shijian{
	width: 30%;
	text-align: center;
}
.heads .state{
	width: 25%;
	text-align: center;
}
.heads .options{
	width: 10%;
	text-align: center;
}

.xanze{
	border:0;
	outline: none;
	position: relative;
	top: 0.05rem;
	left: -12rem;
}
</style>
<style>

.xanze input{
	border: 0;
	outline: none;
}
</style>