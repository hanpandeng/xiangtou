<template>
	<div class="settop">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：内容管理 > 置顶广告位</div>
		<div class="title title1"><img src="../../assets/zhiding2.png">置顶广告位</div>

		<div class="content">
			  <el-select v-model="value1" clearable filterable placeholder="请选择所置顶的广告位">
			    <el-option
			      v-for="item in options"
			      :key="item.sellerAdvertiseId"
			      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
			      :value="item.sellerAdvertiseId">
			    </el-option>
			  </el-select>
			  <el-select v-model="value2" clearable filterable placeholder="请选择所置顶的广告位">
				    <el-option
			      v-for="item in options"
			      :key="item.sellerAdvertiseId"
			      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
			      :value="item.sellerAdvertiseId">
			    </el-option>
			  </el-select>
			  <el-select v-model="value3" clearable filterable placeholder="请选择所置顶的广告位">
			    <el-option
			      v-for="item in options"
			      :key="item.sellerAdvertiseId"
			      :label="item.sellerInfo.sellerName +'-'+ item.advertiseSN + '屏'"
			      :value="item.sellerAdvertiseId">
			    </el-option>
			  </el-select>

			  <span class="save" @click='save'>保存</span>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:'settop',
		data(){
			return {
				options: [],
				value1:'',
				value2:'',
				value3:''
			}
		},
		created(){
			this.query()

		},
		methods:{
			query(){
				var that = this;
				axios({
					url:'Selladvterise/shearchselladvertise',
					method:'get'
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						that.options = res.data.data;
						that.zhiding()
					}
				})
			},
			zhiding(){
				var that = this;
				axios({
					url:'Selladvterise/stickselladvertise',
					method:'get'
				}).then(function(res){
					// console.log(res)
					if(res.data.code == 200){
						var data = res.data.data;
					data.forEach(function(item,index){
						// console.log(index)
						if(index == 0){that.value1 = item.sellerAdvertiseId}
						 if(index == 1){that.value2 = item.sellerAdvertiseId}
						 if(index == 2){that.value3 = item.sellerAdvertiseId}
					})
					}
					
				})
			},
			save(){
				var that = this;
				var jsonid = []
				if(that.value1){
					jsonid.push(that.value1)
				}
				if(that.value2){
					jsonid.push(that.value2)
				}
				if(that.value3){
					jsonid.push(that.value3)
				}
				// console.log(jsonid)
				 // console.log(jsonid.reverse())
				axios({
					url:'Selladvterise/setselladvstick',
					method:'post',
					data:{
						jsonId:JSON.stringify(jsonid)
					}
				}).then(function(res){
					if(res.data.code == 200){
						that.query()
					}
				})
			}
		}
	}
</script>

<style scoped>
.settop{
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
.el-select{
	width: 20%;
	margin-right: 1rem;
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