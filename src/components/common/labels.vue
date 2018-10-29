<template>
	<div class="labels">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：标签管理</div>
		
		<div class="title title1"><img src="../../assets/biaoqian2.png"> 标签管理</div>
		
		<div class="addlabel">
			<input v-model='labelname' placeholder="请填写需要添加的标签名称">
			<span class="addlabels" @click='addlabels'>  添加 </span>
		</div>
		
		<div class="content">
			<div class="headers">
				<span class="paixun">排序</span>
				<span class="biaoqianming">标签名</span>
				<span class="tubiao"></span>
				<span class="caozuo">操作</span>
			</div>
			<div class="headers hea" v-for='(item,index) in items'>
				<input v-if='item.state' placeholder="请填写所要修改的标签名" v-model='title'> 
				<span class="paixun">{{index + 1}}</span>
				<span class="biaoqianming">{{item.lableName}}</span>
				<span class="tubiao"></span>
				<span class="caozuo" v-if='item.state==false'>
					<span @click='addbits(item.lableId)'>链接广告位</span>
					<img @click='Jump(item.lableId)' src="../../assets/chakan.png">
					<img @click='modify(item.lableId,index)' src="../../assets/bianji.png">
					<img @click='remove(item.lableId)' src="../../assets/shanchu.png">
				</span>
				<span v-if='item.state == true' class="operation" style="line-height: 2rem"> 
					<span class="confirm" @click='confirm(item.lableId,index)'>确认</span>
					<span class="cancel" @click='cancel(index)'>取消</span>
				</span>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="15%" top='30vh' :close-on-click-modal='false'>  
		<span class="box">
			<img class="tupiao" src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">确定要删除该标签吗？</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
		name:'labels',
		data(){
			return {
				dialogVisible:false,
				labelname:"",
				title:'123',
				items:[],
				flag : false,
				lableId:''
			}
		},
		created(){
			this.query()
		},
		methods:{
			query(){
				var that = this;
				axios.get("Lable/alllabels").then(function(res){
					var data = res.data.data;
					data.forEach(function(item,index){
						item.state = false;
					})
					that.items = data;   
					// console.log(that.items)
				})
			},
			Jump(lableId){
				this.$router.push({path:'/labelsee',query:{"lableId":lableId}})
			},
			addbits(lableId){
				this.$router.push({path:'/labelmodify',query:{"lableId":lableId}})
			},
			addlabels(){
				var that = this;
				if(that.labelname == '' ){
					return false;
				}
				
				axios({
					url:'Lable/addlabel',
					method:'post',
					data:{
						lableName:that.labelname
					}
				}).then(function(){
					that.labelname = ''
					that.query()
				})
			},
			remove(lableId){
				this.dialogVisible = true;
				this.lableId = lableId
			},
			dialog(){
				var that = this;
				axios({
					url:'Lable/deletelabel',
					method:'post',
					data:{
						lableId:that.lableId
					}
				}).then(function(){
					that.dialogVisible = false
					that.labelname = ''
					that.query()
				})
			},
			modify(lableId,index){
				var that = this;
				if(that.flag == false){
					that.flag = true
					that.items[index].state  = true;
					that.title = that.items[index].lableName;
				}
			},
			cancel(index){
				var that = this;
				that.flag = false;
				that.items[index].state  = false;
				
			},
			confirm(lableId,index){
				var that = this;
				axios({
					url:'Lable/editlabel',
					method:'post',
					data:{
						lableId:lableId,
						lableName:that.title
					}
				}).then(function(){
					that.title = ''
					that.flag = false;
					that.items[index].state  = false;
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
.addlabel{
	padding:0.8rem;
	line-height: 1.8rem;
	background-color: white
}
.addlabel input{
	width:50%;
	outline: none;
	border:0;
	line-height: 1.8rem;
	margin-left: 1rem;
}

.addlabels {
	display: block;
	width:4.5rem;
	color: white;
	border-radius: 1rem;
	background:#FFCC00;
	text-align: center;
	float: right;
}

.headers{
	position: relative;
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
	text-align:center;
}
.tubiao {
	padding-left: 3%;
	width:60%;
}
.caozuo {
	display: flex !important;
	width:20%;
	text-align: center;
	justify-content: center;
}
.hea .biaoqianming  {
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
.caozuo span{
	cursor: pointer;
	display: block;
	margin: auto 0;
	margin: 0.5rem 0.2rem 0.5rem;
	width:4rem;
	height: 2rem;
	line-height: 2rem;
	border-radius: 1rem;
	padding: 0 1rem;
	color: white;
	background-color: #FFCC00
}
.content{
	margin-top: 4rem;
}
.hea .operation{
	width: 20%;
	display: flex;
	justify-content: center;
	align-items:center;
}
.hea .operation span{
	cursor: pointer;
	display: block;
	margin: auto 0;
	margin: 0.5rem 0.2rem 0.5rem;
	width:3rem;
	height: 2rem;
	line-height: 2rem;
	border-radius: 1rem;
	padding: 0 1rem;
	color: white;
	background-color: #FFCC00;
	text-align:center;
}
.confirm{
	margin-left: -3rem;
}
.cancel{
	margin-left: 0;
	margin-left: 0.3rem;
	background-color: #FF3545 !important;
}
.hea  input{
	width:80%;
	position: absolute;
	top: 0.5rem;
	left: 0;
	height: 3.6rem;
	border:0;
	outline: 0;
	padding-left:2rem;
}

</style>