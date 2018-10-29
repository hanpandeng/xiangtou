<template>
	
	<div class="homeswipper">

		<div class="title"><img src="../../assets/daohang.png"> 当前位置：首页轮播图</div>
		<div class="title title1"><img src="../../assets/lunbotu2.png"> 首页轮播图</div>
<!-- 		<button @click='gaibian'>改变store的值</button>
		<p>这是当前状态{{$store.state.dialog.show}}</p> -->
		<div class="content">
			<div class="lunbo">
				<span class="titlename">1</span>
				<uploadImg class='zujian'  :img='img1' number="1" :format='format' v-on:uploadimg="uploadimg1"></uploadImg>
				<el-select class='xiala' v-model="value1" filterable placeholder="请选择需要跳转的广告位">
				    <el-option
				      v-for="item in options"
				      :key="item.sellerAdvertiseId"
				      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
				      :value="item.sellerAdvertiseId">
				    </el-option>
				</el-select>
				<span class="chicun">最佳尺寸为750*450</span>
				<span class="queding" @click='save1'>确定</span>
			</div>
			<div class="lunbo">
				<span class="titlename">2</span>
				<uploadImg class='zujian'  :img='img2' number="1" :format='format' v-on:uploadimg="uploadimg2"></uploadImg>
				<el-select class='xiala' v-model="value2" filterable placeholder="请选择需要跳转的广告位">
				    <el-option
				      v-for="item in options"
				      :key="item.sellerAdvertiseId"
				      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
				      :value="item.sellerAdvertiseId">
				    </el-option>
				</el-select>
				<span class="chicun">最佳尺寸为750*450</span>
				<span class="queding" @click='save2'>确定</span>
			</div>
						<div class="lunbo">
				<span class="titlename">3</span>
				<uploadImg class='zujian'  :img='img3' number="1" :format='format' v-on:uploadimg="uploadimg3"></uploadImg>
				<el-select class='xiala' v-model="value3" filterable placeholder="请选择需要跳转的广告位">
						<el-option
				      v-for="item in options"
				      :key="item.sellerAdvertiseId"
				      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
				      :value="item.sellerAdvertiseId">
				    </el-option>
				</el-select>
				<span class="chicun">最佳尺寸为750*450</span>
				<span class="queding" @click='save3'>确定</span>
			</div>
						<div class="lunbo">
				<span class="titlename">4</span>
				<uploadImg class='zujian'  :img='img4' number="1" :format='format' v-on:uploadimg="uploadimg4"></uploadImg>
				<el-select class='xiala' v-model="value4" filterable placeholder="请选择需要跳转的广告位">
						<el-option
				      v-for="item in options"
				      :key="item.sellerAdvertiseId"
				      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
				      :value="item.sellerAdvertiseId">
				    </el-option>
				</el-select>
				<span class="chicun">最佳尺寸为750*450</span>
				<span class="queding" @click='save4'>确定</span>
			</div>
						<div class="lunbo">
				<span class="titlename">5</span>
				<uploadImg class='zujian'  :img='img5' number="1" :format='format' v-on:uploadimg="uploadimg5"></uploadImg>
				<el-select class='xiala' v-model="value5" filterable placeholder="请选择需要跳转的广告位">
						<el-option
				      v-for="item in options"
				      :key="item.sellerAdvertiseId"
				      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
				      :value="item.sellerAdvertiseId">
				    </el-option>
				
				</el-select>
				<span class="chicun">最佳尺寸为750*450</span>
				<span class="queding" @click='save5'>确定</span>
			</div>

		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import uploadImg from './uploading.vue'
	export default{
		name:'homeswipper',
		data(){
			return {
				options: [],
				value1: '',
				value2: '',
				value3: '',
				value4: '',
				value5: '',
				img1:[],
				img2:[],
				img3:[],
				img4:[],
				img5:[],
				files1:'',
				files2:'',
				files3:'',
				files4:'',
				files5:'',
				format:'img',
				Currentdata:[]
			}
		},  
		created(){
			this.query()
			this.search()
			// console.log(this.$store.state.dialog.show)
		},
		components:{
			uploadImg
		}, 
		methods:{
			search(){
				var that = this;
				axios({
					url:'Selladvterise/shearchselladvertise',
					method:'get'
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.options = res.data.data;
						// that.zhiding()
					}
				})
			},
			queryindex(inde){
				var flag=false;
				this.Currentdata.forEach(function(item,index){
					if(inde == item.homeSwiperId){
						flag = true
					}
				})
				return flag;
			},
			query(){
				var that  = this;
				axios({
					url:'Homeswiper/homeswiperlist',
					method:'get'
				}).then(function(res){
					if(res.data.code == 200){
						// console.log(res.data)
						that.Currentdata = res.data.data
						that.Currentdata.forEach(function(item,index){
							if(item.homeSwiperId == 1){
								that.img1 = []
								that.img1.push(item.swiperImg)
								that.value1 = item.sellerAdvertiseId
							}
							if(item.homeSwiperId == 2){
								that.img2 = []
								that.img2.push(item.swiperImg)
								that.value2 = item.sellerAdvertiseId
							}
							if(item.homeSwiperId == 3){
								that.img3 = []
								that.img3.push(item.swiperImg)
								that.value3 = item.sellerAdvertiseId
							}
							if(item.homeSwiperId == 4){
								that.img4 = []
								that.img4.push(item.swiperImg)
								that.value4 = item.sellerAdvertiseId
							}
							if(item.homeSwiperId == 5){
								that.img5 = []
								that.img5.push(item.swiperImg)
								that.value5 = item.sellerAdvertiseId
							}
						})
					}
				})
			},
			uploadimg1(val){
				// console.log(val)
				this.files1 = val
			},
			uploadimg2(val){
				this.files2 = val
			},
			uploadimg3(val){
				// console.log(val)
				this.files3 = val
			},
			uploadimg4(val){
				this.files4 = val
				// console.log(val)
			},
			uploadimg5(val){
				this.files5 = val
				// console.log(val)
			},
			save1(){
				this.modifyMethod(1)
			},
			save2(){
				this.modifyMethod(2)
			},
			save3(){
				this.modifyMethod(3)
			},
			save4(){
				this.modifyMethod(4)
			},
			save5(){
				this.modifyMethod(5)
			},
			modifyMethod(index){
				var that = this;
				var state = this.queryindex(index)
				var dizhi;
				if(state == true){
					dizhi = 'Homeswiper/edithomeswiper'
				}else{
					dizhi = 'Homeswiper/addhomeswiper'
				}
				var sellid ,files;
				if(index == 1){
					sellid = that.value1
					files = that.files1
				}else if(index == 2){
					sellid = that.value2
					files = that.files2
				}else if(index == 3){
					sellid = that.value3
					files = that.files3

				}else if(index == 4){
					sellid = that.value4
					files = that.files4
				}else if(index == 5){
					sellid = that.value5
					files = that.files5
				}
				if(files){
					var uri = this.$store.state.http + "Image/imagemultupload";
					var xhr = new XMLHttpRequest();
					var fd = new FormData();
					xhr.open("POST", uri, true);
					for(var x=0;x< files.length;x++){
						fd.append('files', files[x] );
					}
					xhr.send(fd);
					xhr.onreadystatechange = function() {
						if (xhr.readyState == 4 && xhr.status == 200) {
							var datay = JSON.parse(xhr.responseText);
							axios({
								url:dizhi,
								method:'post',
								data:{
									homeSwiperId:index,
									sellerAdvertiseId:sellid,
									swiperImg:datay.data[0]
								}
							}).then(function(res){
								that.query()
								that.search()
							})

						}
					}
				}else{
					axios({
						url:dizhi,
						method:'post',
						data:{
							homeSwiperId:index,
							sellerAdvertiseId:sellid,
							swiperImg:that.Currentdata[index].swiperImg
						}
					}).then(function(res){
						that.query()
						that.search()
					})
				}
			},
		}
	}
</script>

<style scoped>
.homeswipper{
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
	margin-left: 0.5rem;
	margin-top: 2rem;
}
.zujian{
	float: left;
	display: inline-block;
}
.titlename{
	float: left;
	display: inline-block;
	width:5rem;
	text-align:center;
	line-height: 6rem;
}
.xiala{
	margin-top: 2rem;
	margin-left: 13rem;
	float: left;
	/*line-height: 6rem;*/ 
}
.chicun{
	float: left;
	line-height: 6rem;
	margin-left: 3rem;
	color: #9A9B9A;
}
.queding{
	margin-top: 2rem;
	padding:0.5rem 1.8rem;
	border-radius: 2rem;
	display: inline-block;
	float: right;
	background-color: #FFCC00;
	color: white;
	margin-right: 1rem;
}
.lunbo{
	background-color: white;
	height: 6.2rem;
	margin-bottom: 0.3rem;
}
</style>
