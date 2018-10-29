<template>
	<div class="Warning" v-if='state' >
		<div class="warn"></div>
		<div class="box">
			<img src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">此操作将会冻结用户所有数据</span>
			<span class="span3" @click='decrement()' >确认</span>
		</div>
		<img @click='closeup()' class="warnimg" src="../../assets/cha.png">
	</div>
</template>

<script>
	export default{
		name:'warning',
		props: ["flag","name"],
		data(){
			return {
				state:false,
				hidden:{
					"display":"block"
				}
			}
		},
		mounted(){
			this.state = this.flag
		},
		methods:{
			gai(){
				this.state = this.flag
			},
			closeup(){
				this.state = false
				this.$emit("adminstate",false)
			},
			decrement(){
				this.$emit("adminstate",false)
				this.$emit("confirm",true)
			}
		},
		watch:{
			flag : "gai"
		}
	}
</script>

<style scoped>
.warn{
	height:3000px;
	width: 3000px;
	background-color: #000;
	opacity: 0.5;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 998;
}
.box{
	width:16rem;
	height:17rem;
	background-color: white;
	background:url(../../assets/bg2.png);
	background-size: 100% 100%;
	border-radius: 0.5rem;
	position: fixed;
	top: 50%;
	left: 50%;
	margin-top: -12rem;
	margin-left: -8rem;
	z-index: 999;
}
span{
	text-align: center;
	display: block;
}
.span1{
	margin-top: 1rem;
	font-size: 16px;
}
.span2{
	margin-top: 0.7rem;
	font-size: 12px;
	color: #FF8152
}

.span3{
	width:100%;
	position: absolute;
	bottom: 0;
	left: 0;
	line-height: 2.8rem;
	color: white;
}
.box img{
	width:5rem;
	height:5rem;
	display: block;
	margin: 2.75rem auto 1.5rem;
}
.warnimg {
	position: fixed;
	z-index: 999;
	top: 0;
	left: 50%;
	top: 65%;
	margin-left: -0.875rem;
	width:1.75rem;
	height:1.75rem;
}
</style>