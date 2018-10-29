<template>
	<div class="feedback">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：反馈管理</div>
		
		<div class="title title1"><img src="../../assets/fankui1.png"> 反馈管理</div>

		<div class="search"> 
			<div class="nicheng">
					<span>昵称</span>
					<input v-model='name1' placeholder="请输入昵称以查询">
			</div>
			<div class="nicheng nicheng2">
					<span>反馈时间</span>
					<input placeholder="请输入反馈时间以查询">
					<el-date-picker
					  class="rili"
				      v-model="time"
				      clear-icon
				      type="date"
				      value-format='yyyy-MM-dd'
				      placeholder="请选择反馈时间以查询">
				    </el-date-picker>
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
				<span class="xuhao">序号</span>
				<span class="name">昵称</span>
				<span class="neirong">内容</span>
				<span class="shijian shijian1"><span>反馈时间</span></span>
				<span class="caozuo caozuo1">操作</span>
			</div>
			<div v-for='(item,index) in items' v-bind:key="index">
				<div class="heads" >
					<span class="xuhao">{{index+1}}</span>
					<span class="name">{{item.nickName}}</span>
					<span class="neirong">{{item.feedBackDetails}}</span>
					<span class="shijian">{{item.createTime}}</span>
					<span class="caozuo" @click="chakan(item.feedBackId,index)"><img src="../../assets/yulan.png"></span>
				</div>
				<div class="details" v-if='item.state'>
					<img class="img1" src="../../assets/xiangxi.png">
					<img class="img2" @click='close(index)' src="../../assets/shouqi.png">
					<span>详细内容</span>
					{{item.feedBackDetails}}
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

</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name :"feedback",
		data(){
			return {
				name1:'',
				time: '',
				items:[],
				currentPage: 1,
				totalPage:0
			}
		},
		mounted(){
			this.fenye(1);
		},
		methods :{
			fenye(index){
				var that=this;
				axios({
					url:"Feedback/feedpagelist",
					methods:"get",
					params:{
						currentpage:index
					}
				}).then(function(res){
					var data = res.data.data.lists;
					data.forEach(function(item,index){
						 item.state=false
					})
					that.items = data;
					that.totalPage = res.data.data.totalPage;
				})


			},
		    handleCurrentChange(val) {
		         this.fenye(val)
		    },
		    chakan(feedBackId,index){
		    	this.items.forEach(function(item,index){
					 item.state=false
				})
				this.items[index].state = true;
				
		  //   	axios({
				// 	url:"Feedback/feedback",
				// 	methods:"get",
				// 	params:{
				// 		feedBackId:feedBackId
				// 	}
				// }).then(function(res){
		  //   		console.log(res)
		  //   	})
		    },
		    close(index){
		    	if(this.items[index].state == true){
		    		this.items[index].state = false;
		    	}
		    },
		    search(){
		    	var that = this;
		    	axios({
					url:"Feedback/feedpagelist",
					methods:"get",
					params:{
						nickName:that.name1,
						createTime:that.time
					}
				}).then(function(res){
					if(res.data.code == 200){
						var data = res.data.data.lists
						data.forEach(function(item,index){
							item.state=false
						})
						that.items = data;
						that.totalPage = res.data.data.totalPage;
					}
				})
		    },
		    reset(){
		    	this.time = '';
		    	this.name1 = ''
		    }
		}
	}
</script>

<style scoped>
.feedback{
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
	width:12.25rem;
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
	display: flex;
	flex-wrap: wrap;
	background-color :white;
	padding : 0.8rem 0;
	margin-bottom: 0.1rem;
}
.heads .xuhao{
	line-height: 2rem;
	width:8%;  
	text-align: center;
}
.heads .name{
	line-height: 2rem;
	width:10%;
	text-align: center;
}
.heads .neirong{
	line-height: 2rem;
	text-align: center;
	width:20%;
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
.heads .shijian{
	line-height: 2rem;
	padding-left: 4%;
	width:50%;
}
.shijian1 span{
	margin-left: 4%;
}
.caozuo1{
	line-height: 2rem;
}
.heads .caozuo{
	width:8%;  
	text-align: center; 
}
.heads img{
	cursor: pointer;
	width:2rem;
	height: 2rem;
}
.details{
	padding-left: 10%;
	padding-right: 8%;
	padding-top: 1rem;
	position: relative;
	height: 5rem;
	border: 0.1rem dashed #DCDCDC;
	color: #999;
}
.details .img1{
	width:0.75rem;
	height: 0.75rem;
	position: absolute;
	top: 1.1rem;
	left: 1.7rem;
}
.details .img2{
	width:1rem;
	height: 1rem;
	position: absolute;
	top: 1.1rem;
	right: 2.7rem;
}
.details span{
	position: absolute;
	top: 1rem;
	left: 3rem;
	color: #333;
}
</style>
