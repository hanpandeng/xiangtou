<template>
	<div class="advterisedetails">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/advertising'>广告位管理</router-link> > 查看</div>
		<div class="title title1"><img src="../../assets/faguanggao2.png"> 查看</div>
		<div class="content" v-for='flag,state in itemlist' :index='state'>
			<div class="every">
				<span class="name">松江万达广告屏</span>
				<span class="value">{{flag.sellerInfo.sellerName}}</span>
			</div>
			<div class="every">
				<span class="name">广告屏ID</span>
				<span class="value">{{flag.advertId}}</span>
			</div>
			<div class="every" v-for='(item,inde) in items' :index='inde'> 
				<span class="name">{{item.advertiseSN}}屏</span>
				单价:
				<span class="value">{{item.unitPrice}}天/元 </span> 
				销量:
				<span class="value">{{item.sellerVolume}} </span> 
				标签:
				<span class="value">
					<strong v-for='it,id in item.lableList'>{{it}},</strong>
				</span> 
			</div>
			<div class="every">
				<span class="name">联系地址</span>
				<span class="value">{{flag.sellerInfo.sellerAddress}}</span>
			</div>
			<div class="every every1">
				<span class="name">广告位简介</span>
				<span class="value">{{flag.sellerInfo.advertiseIntro}}</span>
			</div>
			<div class="every">
				<span class="name">广告类型</span>
				<span class="value">{{flag.sellerInfo.advertiseType.advertiseTypeName}}</span>
			</div>
			<div class="every every3">
				<span class="name">轮播图</span>
				<span v-for='(item,inde) in items' @mouseover='test(inde)'>
<!-- 					<span class="zhezhaocun" v-if='inde === state'>
					</span> -->
					<img  :src="item.sellerInfo.advertiseImgs">
				</span>
				<!-- <img src="../../assets/mao.jpg"> -->
			</div>
		</div>
		<span class="fanhui" @click='fanhui'>返回</span>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'advterisedetails',
		data(){
			return {
				items:[],
				itemlist:[],
				state:0
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
					that.itemlist.push(res.data.data)
				})
		},
		methods:{
			fanhui(){
				console.log(this.$route.query.currentPage)
				this.$router.push({name:'advertising',params:{fenye:this.$route.query.currentPage}})
			},
			test(index){
				this.state = index
			}
		}
	}
</script>

<style scoped>
.advterisedetails{
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
}
.every{
	background-color: white;
	padding:1rem 0;
	margin-bottom: 0.1rem;
}
.name{
	padding:0 1rem;
}
.value{
	margin:0 1rem;
	color: #9A9A9A;
	min-width: 5rem;
	display: inline-block;
}
.every1 {
	position: relative;
	padding-left:4.5rem;
}
.every1 .name{
	position: absolute;
	top: 1rem;
	left: 0rem;
}
.every3 img{
	width:100px;
	height: 100px;
	border-radius: 0.5rem;
}
.zhezhaocun{
	display: inline-block;
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: black;
	opacity: 0.4;
}
.every3>span{
	position: relative;
	display: inline-block;
	margin-right: 0.5rem;
}
.every3 .name{
	line-height: 5rem;
	display: inline-block;
	float: left;
}
.fanhui{
	cursor: pointer;
	padding:0.5rem 1.5rem;
	border-radius: 1rem;
	background:#FFCC00;
	color: white;
	float: right;
	margin: 1rem 0;
}
</style>