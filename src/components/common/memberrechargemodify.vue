<template>
	<div class="memberrechargemodify">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/memberrecharge'>会员充值活动</router-link> > 修改活动会员</div>

		<div class="title title1"><img src="../../assets/huiyuan03.png"> 修改活动会员</div>

		<div class="content">
<!--<div class="every">
				<span>会员顺序</span>
				<input placeholder="请输入会员顺序">
			</div> -->
			<div class="every">
				<span>会员名称</span>
				<input  v-model='name' placeholder="请输入会员名称">
			</div>
			<div class="every">
				<span>会员促销价</span>
				<input  v-model='price' placeholder="请输入会员充值金额">
			</div>
			<div class="every">
				<span>会员所享折扣</span>
				<input v-model='discount' placeholder="请输入会员享受折扣">
			</div>
			<div class="tupian">
				<span class="tubiao">会员图标</span>
				<span class="tishi">最佳尺寸为240*240PX </span>
				<uploadImg class='shangchuan' number="1" :format='format' :img='img' v-on:uploadimg="uploadimg"></uploadImg>
			</div>
		</div>
		<div class="bottom">
			<span class="tianjia" @click='addmember'>保存</span>
			<span class="fanhui" @click='fanhui'>返回</span>
		</div>
		
	</div>
</template>

<script>
	import axios from 'axios'
	import uploadImg from './uploading.vue'
	export default{
		name:'memberrechargemodify',
		data(){
			return {
				format:'img',
				discount:'',
				price:'',
				name:'',
				files:'',
				items:[],
				img:[]
			}
		},
		components:{
			uploadImg
		}, 
		created(){
			this.query()
		},
		methods:{
			query(){
				var that = this;
				axios({
					url:'Activity/activitymember',
					method:'get'
				}).then (function(res){
					if(res.data.code == 200){
						// console.log(res)
						that.items.push(res.data.data)
						that.img = res.data.data.specialActivitiesImg
						that.name = res.data.data.activityMemberName
						that.price = res.data.data.activityMemberMoney
						that.discount = res.data.data.activityMemberDiscounts
					}
				})
			},
			uploadimg(val){
				this.files = val
			},
			addmember(){
				var that = this;   
				if(that.files){
					var uri = this.$store.state.http  + "Image/imagemultupload";
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
									activityMemberName:that.name,
									activityMemberMoney:that.price,
									activityMemberDiscounts:that.discount,
									specialActivitiesImg:JSON.stringify(data.data)
								}
							}).then(function(res){
								if(res.data.code == 200){
									that.$router.push({path:'/memberrecharge'})
								}
							})
						}
					};
					for(var x=0;x<that.files.length;x++){
						fd.append('files', that.files[x] );
					}
					xhr.send(fd);
				}else {
					axios({
						url:'Activity/updateactivitymember',
						method:'post',
						data:{
							activityMemberLevelId:that.items[0].activityMemberLevelId,
							activityMemberName:that.name,
							activityMemberMoney:that.price,
							activityMemberDiscounts:that.discount,
							specialActivitiesImg:that.img
						}
					}).then(function(res){
						if(res.data.code == 200){
							that.$router.push({path:'/memberrecharge'})
						}
					})
				}
			},
			fanhui(){
				this.$router.push({path:'/memberset'})
			}
		}
	}
</script>

<style scoped>
.memberrechargemodify{
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
.content{
	margin-top: 2rem;
	margin-left: 0.5rem;
}
.every{
	padding:1rem;
	background:white;
	margin-bottom: 0.1rem;
}
.every span{
	margin:0 1rem;
}

.every input{
	width: 30%;
	height: 1rem;
	outline: none;
	border:0;
}
.shangchuan{
	display: inline-block;
}
.tupian{
	padding-left: 1rem;
	position: relative;
	background:white;
	padding-bottom: 0.3rem;
}
.tupian .tubiao{
	line-height: 6rem;
	float: left;
	margin-right: 2rem;
	margin-left: 1rem;

}
.tupian .tishi{
	position: absolute;
	right: 2rem;
	top: 2.5rem;
	color: #999;
}

.bottom span{
	margin:1rem 0;
	cursor: pointer;
	float: right;
	padding: 0.5rem 1.7rem;
    color: white;
    border-radius: 1rem;
    margin-left: 1rem;
}
.bottom .fanhui{
	background:#ccc;
}
.bottom .tianjia{
	background-color: #FFCC00;
}
</style>