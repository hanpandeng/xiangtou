<template>
	<div class="advterisedetailsmody">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：账号管理 > <router-link tag='span' to='/advertisement'>接广告账号</router-link>  > 添加广告位</div>
		
		<div class="title title1"><img src="../../assets/faguanggao2.png"> 添加广告位</div>

		<div class="content" v-for='item in itemlist'>
			
			<div class="every">
				<span class="name"> 商家名称</span>
				<span class="value">{{item.sellerInfo.sellerName}}</span>
			</div>
			
			<div class="every">
				<span class="name"> 广告屏ID</span>
				<span class="value"></span>
				<input class="value" placeholder="请输入广告屏ID" readonly v-model='item.advertId'>
			</div>
			<div class="every">
				<span class="name"> 添加单个广告屏</span>
				<img class="imgflet" @click='addscreen' src="../../assets/selltianji.png">
			</div>
			
<!-- 			<div class="every" v-for='it,id in items'>
				<span class="name"> 广告屏：</span>
				<input class="value" placeholder="请输入广告屏序号" v-model="it.advertiseSN"  >
				<span class="name"> 请输入单价：</span>
				<input class="value" placeholder="请输入单价" v-model="it.unitPrice">
				<span class="name"> 请输入销量：</span>
				<input class="value" placeholder="请输入销量" v-model="it.sellerVolume">
				<img class="imgflet" @click='remove(id)' src="../../assets/shanchu.png">
			</div> -->
			<div class="every" v-for='it,id in screen'>
				<span class="name"> 广告屏：</span>
				<input class="value" placeholder="请输入广告屏序号" v-model="it.advertiseSN"  >
				<span class="name"> 请输入单价：</span>
				<input class="value" placeholder="请输入单价" v-model="it.unitPrice">
				<span class="name"> 请输入销量：</span>
				<input class="value" placeholder="请输入销量" v-model="it.sellerVolume">
				<img class="imgflet" @click='remove(id)' src="../../assets/shanchu.png">
			</div>
			<div class="every">
				<span class="name"> 联系人姓名</span>
				<span class="value">{{item.sellerInfo.sellerUserName}}</span>
			</div>
			<div class="every">
				<span class="name"> 联系人电话</span>
				<span class="value">{{item.sellerInfo.sellerPhone}}</span>
			</div>

			<div class="every">
				<span class="name"> 联系地址</span>
				<span class="value">{{item.sellerInfo.sellerAddress}}</span>
			</div>
			<div class="every every1">
				<span class="name">广告位简介</span>
				<span class="value">{{item.sellerInfo.advertiseIntro}}</span>
			</div>
			<div class="every">
				<span class="name"> 广告类型</span>
				<span class="value">{{item.sellerInfo.advertiseType.advertiseTypeName}}</span>
			</div>
       <div class="every Business">
				<span class="name"> 营业执照</span>
				<span class="value"><img @click='pictures1()' :src="item.sellerInfo.businessLicense"></span>
			</div>
			<div class="every Business">
				<span class="name"> 轮播图</span>
				<span class="value"><img v-for='it,id in JSON.parse(item.sellerInfo.advertiseImgs)' :src="it"></span>
			</div>
			<div v-if='pictures == true'>
				<div class="pictures"></div>
				<img class="picturesimg" :src="item.sellerInfo.businessLicense">
				<img @click='closeup()' class="warnimg" src="../../assets/cha.png">
			</div>
		</div>

		<div class="bottom" >
			<span class="adopt" @click='addadvert'>添加</span>
			<span class="Notthrough" @click='fanhui()'>返回</span>
			
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'advterisedetailsmody',
		data(){
			return {
				pictures:false,
				sellerInfoId:'',
				advertId:'',
				sellerAccountId:'',
				fenye:'',
				items:[],
				screen:[],
				items:[],
				itemlist:[],
			}
		},
		created(){
			var that = this;

			axios({
				url:'Selladvterise/selsameadvertise',
				method:'get',
				params:{
					advertId:that.$route.query.advertId
				}
			}).then(function(res){
				// console.log(res)
				if(res.data.code == 200){
					var data = res.data.data;
					that.items= data
				}
			})

			axios({
				url:'Selladvterise/selleradvertise',
				method:'post',
				data:{
					sellerAdvertiseId:that.$route.query.sellerAdvertiseId
				}
			}).then(function(res){
				// console.log(res)
				that.itemlist.push(res.data.data)
			})

			// for(var x=0;x<5;x++){
				this.screen.push({
					advertiseSN:'',
					unitPrice:'',
					sellerVolume:'',
					advertiseState:'1',
					advertId:that.$route.query.advertId,
					sellerInfoId:that.$route.query.sellerInfoId
				})
			// }
		},
		
		methods:{
			fanhui(){
				var that = this;
				that.$router.push({name: 'advertising',params: {fenye:that.$route.query.currentPage}})
			},
			pictures1(){
				this.pictures = true
			},
			closeup(){
				this.pictures = false
			},
			addscreen(){
				var that= this;
				this.screen.push({
					advertiseSN:'',
					unitPrice:'',
					sellerVolume:'',
					advertiseState:'1',
					advertId:that.$route.query.advertId,
					sellerInfoId:that.$route.query.sellerInfoId
				})
			},
			remove(index){
				 this.screen.splice(index,1);
			},
			addadvert(){
				var that = this;
				axios({
					url:'Selladvterise/editgroupadvertise',
					method:'post',
					data:{
						sellAdvJosn:JSON.stringify(that.screen)
					}
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						// console.log("成功")
						that.$router.push({path: '/advertising',params: {fenye:that.$route.query.currentPage}})
					}
				})
			}
		}
	}
</script>

<style scoped>
.imgflet{
	position: absolute;
	top:50%;
	right: 2rem;
	width: 32px;
	height: 32px;
	margin-top: -16px;
}
.advterisedetailsmody{
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
	position: relative;
	background-color: white;
	padding:0.8rem 0;
	display: flex;
	margin-bottom: 0.1rem;
}
.every1 {
	position: relative;
	padding-left:4.5rem;
}
.every1 .name{
	position: absolute;
	top: 0.8rem;
	left: 0rem;
}
.name{
	padding-left:1rem;
}
input{
	border:0;
	outline: none
}
.value{
	margin-left: 1rem;
	color: #9A9A9A;
}
.logo .name{
	line-height: 3.5rem
}
.logo img{
	margin-left: 1.5rem;
	width:3.5rem;
	height:3.5rem;
	border-radius: 50%;
}
.Business .name{
	line-height: 4rem;
}
.Business img{
	width:4rem;
	height:4rem;
	border-radius: 0.3rem;
	margin-left: 0.6rem
}
.bottom{
	margin-top: 1.5rem;
}
.bottom span{
	cursor: pointer;
	margin-left: 1rem;
	float: right;
	display: inline-block;
	padding:0.5rem 0;
	width:5rem;
	text-align: center;
	border-radius: 2rem;
	color: white;
	margin-bottom: 1rem;
}
.adopt{
	background-color: #FECB00;
}
.Notthrough{
	background-color: #ccc;
}
.pictures{
	position: fixed;
	top: 0;
	left: 0;
	width:100%;
	height:3000px;
	background-color: #333;
	opacity: 0.5;
}
.picturesimg{
	position: fixed;
	width:17rem;
	height:22rem;
	top: 40%;
	left: 50%;
	margin-top: -8.5rem;
	margin-left:-8.5rem; 
}
.warnimg{
	width:1.75rem;
	height:1.75rem;
	position: fixed;
	top: 72%;
	left: 50%;
	margin-left: -0.875rem;
}
</style>