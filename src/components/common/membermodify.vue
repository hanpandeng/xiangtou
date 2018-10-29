<template>
	<div class="membermodify">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：<router-link tag='span' to='/member'>会员管理</router-link> > 查看</div>
		<div class="title title1"><img src="../../assets/huiyuan2.png"> 查看</div>

		<div class="content" v-for='item  in items'>
			<div class="every">
				<span class="name">姓名</span>
				<span class="value">{{item.buyerInfo.buyerUserName}}</span>
			</div>
			<div class="every">
				<span class="name">联系方式</span>
				<span class="value">{{item.buyerInfo.buyerPhone}}</span>
			</div>
			
			<div class="every" >
				<span class="name">会员等级</span>
				<span class="value">{{grade}}</span>
			</div>
			<div class="every">
				<span class="name">会员余额</span>
				<span class="value">{{memberbanlce}}</span>
			</div>
			<div class="every">
				<span class="name">活动会员余额</span>
				<span class="value">{{huodong}}</span>
			</div>
			<div class="bottom">
				<span class="fanhui" @click='fanhui'>返回</span>
			</div>
		</div>

	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'membermodify',
		data(){
			return {
				dialogVisible: false,
				radio: 1,
				fenye:2,
				buyerAccountId:1,
				items:[],
				memberbanlce:'',
				huodong:'',
				grade:''
			}
		},
		created(){
			this.buyerAccountId = this.$route.query.buyerAccountId
			this.fenye = this.$route.query.currentPage

			var that = this;
			axios({
				url:"Membercenter/showmember",
				method:'get',
				params:{
					buyerAccountId:that.buyerAccountId
				}
			}).then(function(res){
				// console.log(res)
				that.items.push(res.data.data);
				that.memberbanlce = JSON.parse(res.data.data.memberContent).MemberLevel.memberMoney
				that.grade = JSON.parse(res.data.data.memberContent).MemberLevel.memberName
				if(JSON.parse(res.data.data.memberContent).activityMemberLevel){
					that.huodong = JSON.parse(res.data.data.memberContent).activityMemberLevel.activityMemberMoney
				}else{
					that.huodong = '0'
				}
				
				
				// that.radio = res.data.data.memberLevel.memberId 
				

			})
		},
		methods:{
			fanhui(){
				this.$router.push({path: '/member',params: {fenye: this.fenye}})
			}
		}
	}
</script>

<style scoped>
.membermodify{
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
.every{
	background-color: white;
	padding:1rem 0;
	margin-bottom: 0.1rem;
}
.name{
	padding-left:1rem;
}
.value{
	margin-left: 1rem;
	color: #9A9A9A;
}
</style>
<!-- #FFD800 -->
<style>
.el-radio__input.is-checked .el-radio__inner{
	border-color: #F3D100;
    background: #F3D100;
}
.el-radio__input.is-checked+.el-radio__label{
	color:  #F3D100
}
.bottom{
	margin-top: 2rem;
}
.bottom span{
	float: right;
	margin-left: 1rem;
	cursor: pointer;
	padding:0.4rem 1.5rem;
	color: white;
	border-radius: 1rem;
	background: #FFCC00;
}

</style>

<style>

</style>