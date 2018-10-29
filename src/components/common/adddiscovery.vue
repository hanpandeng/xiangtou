<template>
	<div class="adddiscovery">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/discovery'>发现管理</router-link> > 添加</div>
		<div class="title title1"><img src="../../assets/lunbotu2.png"> 添加</div>

		<div class="content">
			<div class="sucai" v-if='state == false'>
				<uploadImg class='zujian'   :format='format' v-on:uploadimg="uploadimg"></uploadImg>
				<span class="tips">{{tips}}</span>
			</div>
			<div class="sucai" v-if='state == true'>
				<uploadImg class='zujian' number="1"  :format='format' v-on:uploadimg="uploadimg"></uploadImg>
				<span class="tips">{{tips}}</span>
			</div>
			
			<input placeholder="在此输入帖子的标题" class="tiezi" v-model=title>

			<textarea placeholder="在此输入帖子的正文" class="zhengwen" v-model='content'> </textarea>
		</div>

		<span class="save" @click='save'>保存</span>
	</div>
</div>
</template>

<script>
	import axios from 'axios'
	import uploadImg from './uploading.vue'
	export default{
		name:"adddiscovery",
		data(){
			return {
				title:'',
				content:'',
				tips:'',
				format:'',
				state:'',
				files:''
			}			
		},
		created(){
			// console.log(this.$route.query.state)
			if(this.$route.query.state == 0){
				this.tips = '请添加图片'
				this.format = 'img'
				this.state = false
			}else{
				this.tips = '请添加视频'
				this.format = 'vedio'
				this.state = true
			}

		},
		methods:{
			uploadimg(val){
				// console.log(val)
				this.files = val
				if(val){
					this.tips = ''
				}else{
					if(this.$route.query.state == 0){
						this.tips = '请添加图片'
					}else{
						this.tips = '请添加视频'
					}
				}
			},
			save(){
				var that = this;

				if(this.files){
					var uri = this.$store.state.http + "Image/imagemultupload";
					var xhr = new XMLHttpRequest();
					var fd = new FormData();
					xhr.open("POST", uri, true);
					for(var x=0;x< that.files.length;x++){
						fd.append('files', that.files[x] );
					}
					xhr.send(fd);
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							var data = JSON.parse(xhr.responseText);
							// console.log(data.data)
							if(that.$route.query.state == 0){
								axios({
									url:'Discovery/adddiscovery',
									method:'post',
									data:{
										discoverTitle:that.title,
										discoverDeatils:that.content,
										discoverImgs:JSON.stringify(data.data)
									}
								}).then(function(res){
									that.$router.push({path:'/discovery'})
								})
							}else 	if(that.$route.query.state == 1){
								axios({
									url:'Discovery/adddiscovery',
									method:'post',
									data:{
										discoverTitle:that.title,
										discoverDeatils:that.content,
										discoverVideo:JSON.stringify(data.data)
									}
								}).then(function(res){
									that.$router.push({path:'/discovery'})
								})
							}
						}
					}

				}
			}
		},
		components:{
			uploadImg
		}, 
	}
</script>

<style scoped>
.adddiscovery{
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
.labels{
	margin-top: 2.5rem;
	margin-left: 0.5rem;
	height: 3.5rem;
}
.labels span{
	cursor: pointer;
	margin-right: 1rem;
	padding:0.5rem 1.8rem;
	border:0.1rem solid  #333;
	border-radius: 1rem;
}
.active{
	color: white;
	background-color: #FFCC00;
	border:0 !important;
	padding:0.6rem 1.8rem !important;
}
.content{
	overflow: hidden;
	margin-top: 2rem;
}
.sucai{
	display: flex;
	padding:0.8rem ;
	background-color: white;
}
.zujian{
	display: inline-block;
}
.tips{
	display: block;
	margin: auto 0;
	margin-left: 3rem;
	color: #ccc;
	font-size: 17px;
}
.zhengwen{
	width: 98%;
	border:0;
	outline: none;
	padding:1rem;
	min-height: 7rem;
	margin-bottom: 1.2rem;
	/*padding-right: %;*/
}
.tiezi{
	width: 100%;
	border:0;
	outline: none;
	padding:0.8rem;
	margin:0.2rem 0;
}
::-webkit-input-placeholder { 
	color:#ccc;
	font-size: 14px;

}
:-moz-placeholder {
	color:#ccc;
	font-size: 14px;
}
::-moz-placeholder {
	color:#ccc;
	font-size: 14px;
}
:-ms-input-placeholder { 
	color:#ccc;
	font-size: 14px;
}
.save{
	cursor: pointer;
	background-color: #FFCC00;
	padding: 0.4rem 1.5rem;
	border-radius: 1rem;
	color: white;
	float: right;
}
</style>