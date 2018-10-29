<template>
	<div class="memberrecharge">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：会员充值活动</div>
		
		<div class="title title1"><img src="../../assets/huiyuan03.png"> 会员充值活动</div>

		<div class="switch">
				<el-switch
				v-model="value3"
				 active-color="#FFCC00"
				active-text="活动开启"
				:change='switchchange()'
				inactive-text="活动关闭">
				</el-switch>
		</div>
		<uploadImg class='shangchuan' :img='img' number="1" :format='format' v-on:uploadimg="uploadimg"></uploadImg>
		<span v-if='current == 0' @click='addmember' class="tianjia tianjia0">添加活动会员</span>
		<span v-if='current == 1' class="tianjia tianjia1">添加活动会员</span>
		<div class="content">
				<div class="head">
					<span class="Fullname">会员名称</span>
					<span class="price">促销价</span>
					<span class="thumbnail">缩略图</span>
					<span class="Discount">所享折扣</span>
					<span class="kong"></span>
					<span class="operation">操作</span>
				</div>
				<div class="head" v-for='item,index in items'>
					<span class="Fullname">{{item.activityMemberName}}</span>
					<span class="price">{{item.activityMemberMoney}}</span>
					<span class="thumbnail">
						<img v-for='it,id in JSON.parse(item.activityMemberIcon)' :src="it">
					</span>
					<span class="Discount">{{item.activityMemberDiscounts}}</span>
					<span class="kong"></span>
					<span class="operation">
						<img @click='bainji(item.activityMemberLevelId)' src="../../assets/bianji.png">
						<img @click='leaveout(item.activityMemberLevelId)' src="../../assets/shanchu.png">
					</span>
				</div>
		</div>

		<el-dialog :visible.sync="dialogVisible" width="15%" top='30vh' :close-on-click-modal='false'>  
		<span class="box">
			<img class="tupiao" src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">确定要删除该活动会员吗？</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import uploadImg from './uploading.vue'
	import axios from 'axios'
	export default{
		name:'memberset',
		data(){
			return {
				dialogVisible:false,
				items:[],
				value3: false,
				format:'img',
				img:[],
				current:0,
				files:'',
				activityId:0,
				activityMemberLevelId:''
			}
		},
		created(){
			this.query()
			// console.log(this.$store.state.http)
		},
		components:{
			uploadImg
		},
		methods:{
			dialog(){
				
				var that = this;
				axios({
					url:'Activity/deleteactivitymember',
					method:'post',
					data:{
						activityMemberLevelId:that.activityMemberLevelId
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.dialogVisible = false;
						that.items=[]
						that.img=[]
						that.query()
					}
				})
			},
			query(){
				var that = this;
				axios({
					url:'Activity/activitymember',
					method:'get'
				}).then(function(res){

					if(res.data.code == 200){
						that.items=[]
						that.items.push(res.data.data)
						if(res.data.data.specialActivitiesImg){
							that.img = res.data.data.specialActivitiesImg
						}
						that.activityId = res.data.data.activityMemberLevelId
						that.current = 1
						if(res.data.data.isOpen == 0){
							that.value3 = false
						}else if(res.data.data.isOpen == 1){
							that.value3 = true
						}
					}else{
						that.current = 0 
					}
				})
			},
			uploadimg(val){
				this.files = val
				var that = this;
				var uri = this.$store.state.http + "Image/imagemultupload";
					var xhr = new XMLHttpRequest();
					var fd = new FormData();
					xhr.open("POST", uri, true);
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							var data = JSON.parse(xhr.responseText);
								axios({
									url:'Activity/updateactivitymember',
									method:'post',
									data:{
										activityMemberLevelId:that.items[0].activityMemberLevelId,
										specialActivitiesImg:JSON.stringify(data.data)
									}
								}).then(function(res){
									if(res.data.code == 200){
										that.query()
									}
								})
						}
					};
					for(var x=0;x<that.files.length;x++){
						fd.append('files', that.files[x] );
					}
					xhr.send(fd);
			},
			addmember(){
				this.$router.push({path:'/memberrechargeadd'})
			},
			switchchange(){
				// console.log(val)
				var that = this;
				if(that.value3 == false){
					axios({
						url:'Activity/setactivityclosed',
						method:'post',
						data:{
							activityMemberLevelId:that.activityId
						}
					}).then(function(res){
						if(res.data.code == 200){
							// that.query()
						}
					})
				}
				// 
				if(that.value3 == true){
					axios({
						url:'Activity/setactivityopened',
						method:'post',
						data:{
							activityMemberLevelId:that.items[0].activityMemberLevelId
						}
					}).then(function(res){
						if(res.data.code == 200){
							// that.query()
						}
					})
				}
			},
			// memberrecharge
			leaveout(activityMemberLevelId){
				this.dialogVisible = true;
				this.activityMemberLevelId = activityMemberLevelId;
			},
			bainji(activityMemberLevelId){
				this.$router.push({path:'/memberrechargemodify',query:{activityMemberLevelId:activityMemberLevelId}})
			}
		}
	}
</script>

<style scoped>
.memberrecharge{
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
.switch{
	float: left;
	margin-top: 2rem;
	margin-left: 0.5rem;
	margin: 2rem 0.5rem 0;
	background-color: white;
	padding:0.5rem 1.5rem;
	display: inline-block;
}
.tianjia{
	margin-top: 2rem;
	padding:0.5rem 1.2rem;
	float: right;
	color: white;
	border-radius: 1rem;
}
.tianjia0{
	background-color: #FFCC02;
}
.tianjia1{
	background-color: #ccc;
}
.shangchuan{
	display: inline-block;
}
.content{
	margin-top: 2rem;
}
.head{
	padding:0.8rem 0;
	background-color: white;
	margin-bottom: 0.1rem;
	display: flex;
}
.head span{
	width: 10%;
	text-align: center;
	display: flex;
	justify-content: center;	
	align-items:center;
}
.kong{
	width: 50% !important;
}
.thumbnail img{
	width: 80px;
	height: 80px;
}
.operation img{
	width: 40px;
	height: 40px;
	margin:0 0.2rem;
}
</style>
<style>
.el-switch__label.is-active {
     color: #FFCC00; 
}
.el-switch__core{
	margin: 0 0.2rem;
}
</style>