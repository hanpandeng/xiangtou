<template>
	<div class="navigationmodify">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/navigationbar'>导航栏管理</router-link> > 修改 </div>
		
		<div class="title title1"><img src="../../assets/daohang2.png"> 修改</div>
		
		<div class="content">
			<div class="heads">
				<img src="../../assets/xuanxiang.png"> 导航名称 <input v-model='name' placeholder="请填写导航名称">
			</div>
			<div class="heads head1">
				<img src="../../assets/xuanxiang.png"> <span>图标</span> 
				<uploadImg class='shangchuan' :img='img' number="1" :format='format' v-on:uploadimg="uploadimg"></uploadImg>
				<span class="span1">请添加小程序显示图标(98px*98px)</span>
			</div>
			<el-select v-model="value" clearable class='xiala' placeholder="请选择标签">
				<el-option
				v-for="item in options"
				:key="item.value"
				:label="item.lableName"
				:value="item.lableId">
			</el-option>
		</el-select>
		<div class="labels">
			<span :class="current ==1 ? 'active' : '' "  @click='cancel()'>返回</span>
			<span :class="current ==2 ? 'active' : '' " @click='Addnavigation()'>保存</span>
		</div>
	</div>
</div>
</template>

<script>
	import axios from 'axios'
	import uploadImg from './uploading.vue'
	export default{
		name:"navigationmodify",
		data(){
			return {
				format:'img',
				current:2,
				name:"",
				options: [],
				value: '',
				files:'',
				img:[]
			}
		},
		components:{
			uploadImg
		}, 
		created(){
			var that = this;
			axios({
				url:'Lable/alllabels',
				method:'get'
			}).then(function(res){
				that.options = res.data.data;
			})
			// console.log(parseInt(that.$route.query.navigationId))
			axios({
				url:'Navigation/navigation',
				method:'get',
				params:{
					navigationId:parseInt(that.$route.query.navigationId)
				}
			}).then(function(res){
				// console.log(res)
				that.value = res.data.data.lableId
				that.name = res.data.data.navigationName
				that.img.push(res.data.data.navigationIcon) 
			})
		},
		methods:{
			uploadimg(val){
				this.files=val;
			},
			Addnavigation(){
				this.current = 2
				var that = this;   


				if(this.files){
					var uri = this.$store.state.http + "Image/imageupload";
					var xhr = new XMLHttpRequest();
					var fd = new FormData();
					xhr.open("POST", uri, true);
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							var data = JSON.parse(xhr.responseText);
							axios({
								url:'Navigation/editnavigation',
								method:'post',
								data:{
									navigationId:that.$route.query.navigationId,
									navigationName:that.name,
									navigationIcon:data.data,
									lableId:that.value
								}
							}).then(function(res){
								that.$router.push({path:'/navigationbar'})
							})
						}
					};
					for(var x=0;x<that.files.length;x++){
						fd.append('files', that.files[x] );
					}
					xhr.send(fd);
				}else{
					axios({
						url:'Navigation/editnavigation',
						method:'post',
						data:{
							navigationId:that.$route.query.navigationId,
							navigationName:that.name,
							navigationIcon:that.img[0],
							lableId:that.value
						}
					}).then(function(res){
						that.$router.push({path:'/navigationbar'})
					})
				}
				

			},
			cancel(){
				this.current = 1
				this.$router.push({path:'/navigationbar'})
			}
		}
	}
</script>

<style scoped>

.navigationmodify{
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
.heads{
	font-size: 14px;
	display: flex;
	background-color: white;
	margin-bottom: 0.1rem;
	padding:0.8rem 1rem;
}
.heads img{
	height: 20px;width:20px;
	display: block;
	margin:auto 0;
	margin-right: 0.5rem;
}
.heads input{
	margin-left: 1rem;
	border:0;
	outline: none;
}
.head1 span{
	display: block;
	margin:auto 0;

}
.head1 .span1{
	color: #CDCDCD;
	margin-left: 3rem
}
.shangchuan{
	margin-left: 2rem;
}
.xiala{
	width: 12rem;
}
.labels{
	margin-top: 1rem;
	float: right;
	display: inline-block;
	/*height: 3.5rem;*/
}
.labels span{
	cursor: pointer;
	margin-right: 1rem;
	padding:0.4rem 1.8rem;
	border:0.1rem solid  #333;
	border-radius: 1rem;
}
.active{
	color: white;
	background-color: #FFCC00;
	border:0 !important;
	padding:0.5rem 1.8rem !important;
}
</style>