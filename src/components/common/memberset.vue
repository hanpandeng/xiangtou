<template>
	<div class="memberset">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：会员设置</div>
		<div class="title title1"><img src="../../assets/huiyuan01.png"> 会员设置</div>
		<span class="addmember"  @click='add'>添加会员</span>
		<div class="content">
			<div class="head">
				<span class="shunxu">会员顺序</span>
				<span class="mingcheng">会员名称</span>
				<span class="price">会员充值金额</span>
				<span class="zhekou">会员享受折扣</span>
				<span class="suoloutu">会员缩略图</span>
				<span class="kong"></span>
				<span class="zhuagntai">状态</span>
				<span class="caozuo">操作</span>
			</div>
			<div class="head heads" v-for='(item,index) in items'>
				<span class="shunxu">{{index + 1}}</span>
				<span class="mingcheng">{{item.memberName}}</span>
				<span class="price">{{item.memberMoney}}</span>
				<span class="zhekou">{{item.memberDiscounts}}折</span>
				<span class="suoloutu">
					<img v-for='it,id in JSON.parse(item.memberIcon)' :src="it">
				</span>
				<span class="kong"></span>
				<span class="zhuagntai">
						<img v-if='item.memberState == 1' @click='editor(item.memberId,index)' src="../../assets/shangjia.png"> 
						<img v-if='item.memberState == 0' @click='editor(item.memberId,index)' src="../../assets/xiajia.png">
				</span>
				<span class="caozuo">
						<img @click='bianji(item.memberId)' src="../../assets/bianji.png">
						<img @click='remove(item.memberId)' src="../../assets/shanchu.png">
				</span>
			</div>
		</div>
		<!-- <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button> -->
		
		<el-dialog :visible.sync="dialogVisible" width="15%" top='30vh' :close-on-click-modal='false'>  
		<span class="box">
			<img class="tupiao" src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">确定要删除该会员等级吗？</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'memberset',
		data(){
			return {
				dialogVisible:false,
				items:[],
				memberId:''
			}
		},
		created(){
			this.query()
		},
		methods:{
			dialog(){
				
				var that = this;
				axios ({
					url:'Memberlevel/deletememberlevel',
					method:'post',
					data:{
						memberId:that.memberId
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.dialogVisible = false;
						that.query()
					}
				})
			},
			query(){
				var that = this;
				axios({
					url:'Memberlevel/memberlevelist',
					method:'get'
				}).then (function(res){
					if(res.data.code == 200){
						// console.log(res)
						that.items = res.data.data
						// data.forEach(function(item,index){
						// 	if(item)
						// })
					}
				})
			},
			add(){
				this.$router.push ({path:'/memberadd'})
			},
			bianji(memberId){
				this.$router.push ({path:'/membersetmodify',query:{memberId:memberId}})
			},
			editor(memberId,index){
				var that = this;

				// console.log(that.items,index)
				if(that.items[index].memberState == 1){
					// console.log("下架")
					axios({
						url:'Memberlevel/editmemberlevel',
						method:'post',
						data:{
							memberId:memberId,
							memberState:'0'
						}
					}).then(function(res){
						if(res.data.code == 200){
							that.query()
						}
					})
				}else if(that.items[index].memberState == 0){
					// console.log("上架")
					axios({
						url:'Memberlevel/editmemberlevel',
						method:'post',
						data:{
							memberId:memberId,
							memberState:'1'
						}
					}).then(function(res){
						if(res.data.code == 200){
							that.query()
						}
					})
				}
			},
			remove(memberId){
				this.dialogVisible = true
				this.memberId = memberId
			}
		}
	}
</script>

<style scoped>
.memberset{
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
.addmember{
	cursor: pointer;
	float: right;
	padding: 0.5rem 1.5rem;
    background-color: #FFCC00;
    color: white;
    border-radius: 1rem;
}
.content{
	margin-top: 4rem;
	margin-left: 0.5rem;
}
.head{
	display: flex;
	padding:0.8rem 0;
	margin-bottom: 0.1rem;
	background:white;
}
.head span{
	text-align: center;
}
.heads span{
	line-height: 3rem;
}
.head .shunxu{
	width:7%;
}
.head .mingcheng,.head .price,.head .zhekou,.head .suoloutu,
.head .zhuagntai{
	width:10%;
}
.head .caozuo{
	display: flex;
	justify-content: center;
	align-items:center;
	width:13%;
}
.heads .caozuo img{
/*	display: block;
	margin:0 auto;*/
	margin:0 0.2rem ;
	width: 40px;
	height: 40px;
}
.head .kong{
	width:30%;
}
.heads .suoloutu{
	line-height: 0;
}
.heads .suoloutu img{
	width: 60px;
	height: 60px;
}
</style>
