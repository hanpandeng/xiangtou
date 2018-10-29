<template>
	<div class="personal">
		<div class="title"><img src="../../assets/tongzhi2.png"> 当前位置： 个人中心</div>
		<img class="beijing" src="../../assets/geren.jpg">
		<span class="span1">注册量<br> <strong>{{totalaccount1}}</strong></span>
		<span class="span2">开发小程序<br> <strong>{{totalappmin1}}</strong></span>
		<span class="span3">会员数量<br> <strong>{{totalmember1}}</strong></span>
		<span class="span4">反馈数量<br> <strong>{{totalfeedback1}}</strong></span>
		<img class="touxiang" :src="img">
		<span class="zhanghaoming">享投官方账号</span>
		<div class="content">
			
			<div class="every">
				昵称 <input v-model='name' placeholder="请输入昵称" v-bind:readonly="isReadOnly1"> 
				 <img v-if='isReadOnly1 == true' @click='modify(1)'  src="../../assets/bianji2.png">
				 <img v-if='isReadOnly1 == false' @click='modify(1)'  src="../../assets/xiaban.png">
			</div>
			
			<div class="every">
				账号 <input v-model='admin' placeholder="请输入账号" v-bind:readonly="isReadOnly2">
				 <img v-if='isReadOnly2 == true' @click='modify(2)'  src="../../assets/bianji2.png">
				 <img v-if='isReadOnly2 == false' @click='modify(2)'  src="../../assets/xiaban.png">
			</div>
			
			<div class="every">
				密码 <input v-model='oldpass' type="password" placeholder="请输入旧密码" v-bind:readonly="isReadOnly3">
				 <img v-if='isReadOnly3 == true' @click='modify(3)'  src="../../assets/bianji2.png">
				 <img v-if='isReadOnly3 == false' @click='modify(3)'  src="../../assets/xiaban.png">
			</div>
			
			<div class="every">
				密码 <input v-model='password' type="password" placeholder="请输入新密码" v-bind:readonly="isReadOnly4">
				 <img v-if='isReadOnly4 == true' @click='modify(4)'  src="../../assets/bianji2.png">
				 <img v-if='isReadOnly4 == false' @click='modify(4)'  src="../../assets/xiaban.png">
			</div>
			
			<div class="every every1">	
				<div class="image-view">
					<div class="view">
						<div class="zhezhao"></div>
						<div class="addbox" v-bind:style="{backgroundImage:'url(' + imgBase64[0] + ')'}" style="background-size: 100% 100%;"  >
							<input type="file"  :multiple='false' @change="getImgBase()">
							<div class="addbtn"></div>
						</div>
					</div>
				</div>
				<span class="imgpic ">上传图片</span>
			</div>
			
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:"personal",
		data(){
			return {
				imgBase64:[],   //存储img base64的值
                uploadimg : [], //获取上传的文件的地址
				isReadOnly1:true,
				isReadOnly2:true,
				isReadOnly3:true,
				isReadOnly4:true,
				name:'',
				admin:'',
				adminId:'',
				password:'',
				oldpass:'',
				img:'',
				totalmember1:'',
				totalfeedback1:'',
				totalaccount1:'',
				totalappmin1:''
			}
		},
		created(){

			// this.imgBase64.push("https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/whfpf%3D280%2C160%2C0/sign=26ff97d24b086e066afd6c0b643549cc/962bd40735fae6cde5efa08208b30f2443a70ffd.jpg")
			this.admin=sessionStorage.getItem('admin')
			this.name=sessionStorage.getItem('userName')
			this.adminId=sessionStorage.getItem('adminId')
			this.query()
			this.totalaccount()
			this.totalfeedback()
			this.totalmember()
			this.totalappmin()

		},
		methods:{

			 getImgBase(){
                var _this = this;
                var event = event || window.event;
       			
                for(var x=0;x<event.target.files.length;x++){
                 _this.uploadimg .push(event.target.files[x])
                 var file = event.target.files[x];
                 console.log(file)
                 if(file.type == "image/jpeg" || file.type == "image/png"){
                 	var reader = new FileReader();
                        //转base64
                        reader.onload = function(e) {
                        	_this.imgBase64= [] 
                        	_this.imgBase64.push(e.target.result);
                        }
                        reader.readAsDataURL(file); 
                    }
                }
                
                this.upload()
            },
            //上传图片 
            upload(){
                var _this = this;   
                var uri = this.$store.state.http + "Image/imagemultupload";
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                xhr.open("POST", uri, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // 上传成功
                        var data = JSON.parse(xhr.responseText);
                        that.imgBase64 = []
                        that.imgBase64.push(data.data)
                        axios({ 
							url:'Admin/updateadmin',
							method:'post',
							data:{
								adminId:that.adminId,
								account:that.admin
							}
						}).then(function(res){
							if(res.data.code == 200){
								sessionStorage.removeItem('access_token');
								that.$router.push({path:'/'})							
							}
						})
                    }
                }

                for(var x=0;x<_this.uploadimg.length;x++){
                    fd.append('files', _this.uploadimg[x] );
                }
                // 初始化multipart/form-data格式的上传
                xhr.send(fd);
            },
			query(){
				var that = this;
				axios({
					url:'Admin/finduserimage',
					method:'get',
					params:{
						account:that.admin
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.img= res.data.data
						that.imgBase64.push(res.data.data)
					}
				})
			},

			modify(index){
				var that = this;
				if(index == 1){
					this.isReadOnly1 = !this.isReadOnly1
					if(this.isReadOnly1 == true){
						axios({
							url:'Admin/updateadmin',
							method:'post',
							data:{
								adminId:that.adminId,
								userName:that.name
							}
						}).then(function(res){
							// console.log(res)
							if(res.data.code == 200){
								sessionStorage.setItem('userName',that.name);
							}
						})
					}
				}else if(index == 2){
					this.isReadOnly2 = !this.isReadOnly2
					if(this.isReadOnly2 == true){
						axios({
							url:'Admin/updateadmin',
							method:'post',
							data:{
								adminId:that.adminId,
								account:that.admin
							}
						}).then(function(res){
							if(res.data.code == 200){
								sessionStorage.removeItem('access_token');
								that.$router.push({path:'/'})							
							}
						})
					}
				}else if(index == 3){
					this.isReadOnly3 = !this.isReadOnly3
				}else if(index == 4){
					this.isReadOnly4 = !this.isReadOnly4
					if(this.isReadOnly4 == true){
						
						axios({
							url:'Admin/updateadminpassword',
							method:'post',
							data:{
								account:that.admin,
								newpassword:that.password,
								oldpassword:that.oldpass
							}
						}).then(function(res){
							if(res.data.code == 200){
								sessionStorage.removeItem('access_token');
								that.$router.push({path:'/'})
							}
						})
					}
				}
			},
			// 注册数量
			totalaccount(){
				var that = this ;
				axios({
					url:"Index/totalaccount",
					method:'get'
				}).then(function(res){
					if(res.data.code == 200){
						that.totalaccount1 = res.data.data
					}
				})
			},
			// 小程序注册数量
			totalappmin(){
				var that = this ;
				axios({
					url:"Index/totalappmin",
					method:'get'
				}).then(function(res){
					if(res.data.code == 200){
						that.totalappmin1 = res.data.data
					}
				})
			},
			// 反馈数量
			totalfeedback(){
				var that = this ;
				axios({
					url:"Index/totalfeedback",
					method:'get'
				}).then(function(res){
					if(res.data.code == 200){
						that.totalfeedback1 = res.data.data
					}
				})
			},
			// 注册数量
			totalmember(){
				var that = this ;
				axios({
					url:"Index/totalmember",
					method:'get'
				}).then(function(res){
					if(res.data.code == 200){
						that.totalmember1 = res.data.data
					}
				})
			},
		}
	}
</script>

<style scoped>
.personal{
	padding:1rem ;
	font-size: 15px;
	position: relative;
	overflow: hidden;
}
.title{
	color: white;
	margin-left: 1.5rem;
	position: absolute;
	top: 1.3rem;
	left: 0.5rem;
	z-index: 2;
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
.beijing{
	position: absolute;
	top: 0;
	left: 0;
}
.span1,.span2,.span3,.span4{
	margin: 0;
	top: 8.5rem;
	text-align: center;
	font-size: 14px;
	position: absolute;
	z-index: 11;
}
.span1{
	color: white;
	left: 32%;
}
.span2{
	color: white;
	left: 40%;
}
.span3{
	color: white;
	line-height: inherit;
	right: 32%;
}
.span4{
	color: white;
	right: 40%;
}
.touxiang{
	position: absolute;
	top: 9.3rem;
	left: 50%;
	z-index: 11;
	width: 100px;
	height:100px;
	margin-left: -50px;
	border-radius: 50%;
	border:5px solid white;
}
.zhanghaoming{
	color: block;
	position: absolute;
	top: 16rem;
	left: 50%;
	margin-left: -1.95rem;
	font-size: 16px
}
strong{
	font-size: 19px;
    display: inline-block;
    padding-top: 0.3rem;
}
.content{
	margin-top: 17.5rem;
	margin-left: 0.5rem;
}
.every{
	margin: 0 auto;
	width:25rem;
	padding:0.8rem 1rem ;
	background-color: white;
	margin-bottom: 0.1rem;
}
.every img{
	float: right;
	margin-top: 0.15rem;
}
input{
	margin-left: 0.5rem;
	color: #999;
	border:0;
	outline: none;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder { 
	color: #999; 
	font-size: 14px;
} 
input:-moz-placeholder, textarea:-moz-placeholder { 
	color: #999; 
	font-size: 14px;
} 
input::-moz-placeholder, textarea::-moz-placeholder { 
	color: #999; 
	font-size: 14px;
} 
input:-ms-input-placeholder, textarea:-ms-input-placeholder { 
	color: #999; 
	font-size: 14px;
} 
.every1 {
	display: flex;
	align-items: center;
	padding:0 1rem 5px;
}
.every1 .upload img{
	float: inherit;
	width: 80px;
	height: 80px;
	border-radius: 50%;
}
.clearboth::after{
    content:"";
    display:block;
    clear:both;
}
.imgpic{
	
}
/*.zhezhao{
	height:100px;
    width:100px;
    border-radius: 50%;
    background-color: black;
    opacity: 0.4;
    position: absolute;
    top: 10px;
    left: 0;
    z-index: 18;
}*/
.image-view .addbox{
	border-radius: 50%;
	overflow-x: hidden;
    margin: 10px 10px 0 0;
    position:relative;
    z-index: 15;
    display: inline-block;
    height:100px;
    width:100px;
    text-align:center;
}
.image-view{
	display: inline-block;
}
.image-view .addbox input{
    position:absolute;
    left:0;
    height:100px;
    width:100px;
    opacity:0;
}
.image-view .addbox .addbtn{
    float:left;
    height:100px;
    width:100px;
    line-height:100px;
    font-size:40px;
    border-radius:10px;
}
.image-view .item {
    position:relative;
    float:left;
    height:100px;
    width:100px;
    margin:10px 10px 0 0;
}

.image-view .item .cancel-btn{
    position:absolute;
    right:0;
    top:0;
    z-index: 10;
    display:block;
    width:20px;
    height:20px;
    color:#fff;
    line-height:20px;
    text-align:center;
    /*background:red;*/
    border-radius:10px;
    cursor:pointer;
}
.cancel-btn img{
    width: 110% !important;
    margin-top: 0.2rem;
    margin-left: -0.2rem;
}
.image-view .item img{
    width:100%;
    height:100%;
    border-radius: 0.3rem
}
.image-view .item video{
    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;
    width:100%;
    height:100%;
    border-radius: 0.3rem
}
.image-view .view{
	position: relative;
    clear:both;
    min-height: 100px;
    display: inline-block;
}
</style>

