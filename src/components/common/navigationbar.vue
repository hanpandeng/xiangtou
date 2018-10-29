<template>
	<div class="labels">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：导航栏管理</div>
		
		<div class="title title1"><img src="../../assets/daohang2.png"> 导航栏管理</div>
		
		<router-link tag='span' class="addlabels" to='/addnavigation'>添加</router-link>
		<div class="content">
			<div class="headers">
				<span class="paixun">排序</span>
				<span class="biaoqianming">导航名称</span>
				<span class="tubiao">图标</span>
				<span class="tlabels">所选标签</span>
				<span class="caozuo">操作</span>
			</div>
			<div class="headers hea" v-for='(item,index) in items'>
				<span class="paixun">{{index + 1}}</span>
				<span class="biaoqianming">{{item.navigationName}}</span>
				<span class="tubiao"><img :src="item.navigationIcon"></span>
				<span class="tlabels">{{item.lable.lableName}}</span>
				<span class="caozuo">
					<img @click='Jump(item.navigationId)' src="../../assets/bianji.png">
					<img @click='remove(item.navigationId)' src="../../assets/shanchu.png">
				</span>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="15%" top='30vh' :close-on-click-modal='false'>  
		<span class="box">
			<img class="tupiao" src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">确定要删除该导航吗？</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'navigationbar',
		data(){
			return {
				items:[],
				dialogVisible:false,
				navigationId:""
			}
		},
		created(){
			this.query()
		},
		methods:{
			query(){
				var that = this;
				axios.get("Navigation/navigationlist").then(function(res){
					// console.log(res)
					that.items = res.data.data
				})
			},
			Jump(navigationId){
				this.$router.push({path:'/navigationmodify',query:{"navigationId":navigationId}})
			},
			remove(navigationId){
				this.dialogVisible = true
				this.navigationId = navigationId
			},
			dialog(){
				var that = this;
				axios({
					url:'Navigation/deletenavigation',
					method:'post',
					data:{
						navigationId:that.navigationId
					}
				}).then(function(){
					that.dialogVisible = false
					that.query()
				})
			}
		}
	}
</script>

<style scoped>
.labels{
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
.addlabels {
	display: block;
	width:4.5rem;
	height: 1.8rem;
	color: white;
	border-radius: 1rem;
	background:#FFCC00;
	text-align: center;
	line-height: 1.8rem;
	float: right;
}
.content{
	margin-top: 3.9rem
}
.headers{
	display: flex;
	width:100%;
	background:white;
	padding:0.8rem 0;
	margin-bottom: 0.2rem;
}
.headers img{
	width:3rem;
	height: 3rem;
	border-radius: 50%;
}
.headers span{
	display: inline-block;
}
.paixun {
	width:7%;
	text-align: center;
}
.biaoqianming {
	width:10%;
	text-align: center;
}
.tubiao {
	text-align: center;
	width:15%;
}
.tlabels{
	width:55%;
}
.caozuo {
	width:10%;
	text-align: center;
}
.hea .biaoqianming,.hea .tlabels{
	line-height: 3rem
}
.hea .paixun{
	line-height: 3rem
}
.caozuo img{
	margin: 0.5rem 0.2rem 0.5rem;
	width:2rem;
	height: 2rem;
}

</style>