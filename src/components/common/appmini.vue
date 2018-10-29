<template>
	<div class="appmini">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：开发小程序</div>
		
		<div class="title title1"><img src="../../assets/xiaochengxu.png"> 开发小程序</div>

		<div class="search"> 
			<div class="nicheng">
				<span>联系人姓名</span>
				<input v-model='name1' placeholder="请输入联系人姓名以查询">
			</div>
			<div class="nicheng nicheng2">
				<span>联系人电话</span>
				<input  v-model='telphone' placeholder="请输入联系人电话以查询">
			</div>
			
			<span class="chaxun" @click='search()'>
				<img src="../../assets/chaxun.png">
				查询
			</span>
			<span class="chaxun" @click='reset()'>
				<img src="../../assets/chongzhi.png">
				重置
			</span>
			<span class="chaxun shanchu" @click='removeall()'>
				批量删除
			</span>
		</div>
		
		<div class="content">
			<div class="heads">
				<span class="selection selection1" @click='Totalselection()'><img src="../../assets/kaifaxiaochengx2.png"> {{selection}}</span>
				<span class="number">序号</span>
				<span class="Contactname">联系人姓名</span>
				<span class="Contacttel">联系人电话</span>
				<span class="industry">所选行业</span>
				<span class="region"><span>所在地区</span></span>
				<span class="operation">操作</span>
			</div>
			
			<div class="heads heads1" v-for='(item,index) in items' v-bind:key="index">
				<span class="selection selection2"><img @click='Exchange(index)' v-if='item.state == false' src="../../assets/gou2.png"> <img  @click='Exchange(index)' v-if='item.state' src="../../assets/gou1.png"></span>
				<span class="number">{{index+1}}</span>
				<span class="Contactname">{{item.applicantName}}</span>
				<span class="Contacttel">{{item.applicantPhone}}</span>
				<span class="industry">{{item.miniProgramType.miniProgramName}}</span>
				<span class="region">{{item.applicantLocation}}</span>
				<span class="operation"><img @click='remove(item.applicantMiniProgramId)' src="../../assets/shanchu.png"></span>
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
	import axios from 'axios'
	export default{
		name:'appmini',
		data(){
			return {
				dialogVisible:false,
				hint:'',
				items:[],
				currentPage:1,
				name1:'',
				telphone:'',
				totalPage:0,
				selection:'全选',
				Difference:false,
				applicationId:''
			}
		},
		created(){
			this.fenye()
		},
		methods:{
			fenye(){
				var that=this;
				axios({
					url:"Appmini/apppagelist",
					methods:"get",
					params:{
						currentpage:that.currentPage
					}
				}).then(function(res){
					var date = res.data.data.lists;
					date.forEach(function(item,index){
						 item.state=false
					})
					that.items = date;

					that.totalPage = res.data.data.totalPage;
					that.currentPage = res.data.data.currPage;
					// console.log(res)
				})
			},
			handleCurrentChange(val) {
		         this.fenye()
		    },
		    search(){
		    	var that = this;
		    	// console.log(that.name1)
		    	axios({
					url:"Appmini/apppagelist",
					methods:"get",
					params:{
						applicantName:that.name1,
						applicantPhone:that.telphone
					}
				}).then(function(res){
					var date = res.data.data.lists;
					date.forEach(function(item,index){
						 item.state=false
					})
					that.items = date;
					that.totalPage = res.data.data.totalPage;
					// console.log(res)
				})
		    },
		    reset(){
		    	this.telphone = '';
		    	this.name1 = ''
		    },
		    remove(applicationId){
		    	this.dialogVisible = true
		    	this.Difference = false
		    	this.hint ='确定要删除该联系人吗？'
		    	this.applicationId = applicationId
		    },
		    removeall(){
		    	this.dialogVisible = true
		    	this.Difference = true
		    	this.hint ='确定要批量删除联系人吗？'
		    },
		    dialog(){
		    	var that  = this;
		    	if(that.Difference == false){
		    		axios({
		    			url:"Appmini/deleteappmini",
		    			method: 'post',      
		    			data: {
		    				applicationId:that.applicationId
		    			}
		    		}).then(function(res){
		    			that.dialogVisible = false
		    			that.fenye()
		    		})
		    	}else if(that.Difference == true){
		    		var jsonId = [];
		    		this.items.forEach(function(item,index){
		    			if(item.state == true){
		    				jsonId.push(item.applicantMiniProgramId)
		    			}
		    		})
		    		jsonId = JSON.stringify(jsonId);
		    		// console.log(jsonId)
		    		axios({
		    			url:"Appmini/multdeleteapp",
		    			method:'post',      
		    			data: {
		    				jsonId:jsonId
		    			}
		    		}).then(function(res){
		    			// console.log(res)
		    			that.dialogVisible = false
		    			that.fenye()
		    		})
		    	}
		    	
		    },
		    Exchange(index){
		    	this.items[index].state = !this.items[index].state
		    },
		    Totalselection:function(){
		    	
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
		    }
		}
	}
</script>

<style scoped>
.appmini{
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
	padding-left: 5.5rem;
	border-radius: 0.3rem;
}
.nicheng>span{
	position: absolute;
	left: 1rem;
	top: 0.6rem;
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
.shanchu{
	padding: 0.5rem 1.3rem;
	background-color: #FF3545;
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
.heads .selection,.heads .number,.heads .Contactname,.heads .Contacttel,.heads .operation{
	width:8%;
	text-align: center;
}
.heads1 .selection,.heads1 .number,.heads1 .Contactname,.heads1 .Contacttel,.heads1 .industry,.heads1 .region{
	line-height: 2rem;
}
.selection2{
	position: relative;
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
.industry{
	text-align: center;
	width:15%;
}
.region{
	width:45%;
}

</style>
