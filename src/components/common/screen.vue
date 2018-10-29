<template>
	<div class="screen">
		<div class="title"><img src="../../assets/daohang.png"> 当前位置：筛选管理</div>
		
		<div class="title title1"><img src="../../assets/shaixuan2.png"> 筛选管理</div>
		
		<div class="labels">
			<span :class="current ==1 ? 'active' : '' "  @click='Advertisement()'>广告类型</span>
			<span :class="current ==2 ? 'active' : '' " @click='Daysamount()'>天数/金额</span>
			<span :class="current ==3 ? 'active' : '' " @click='Visitorsflowrate()'>销量</span>
		</div>
		
		<div class="addlabels">
			<input v-model='addtitle' placeholder="请填写所要添加的数据">
			<span @click='add()'>添加</span>
		</div>
		
		<div class="content">
			<div class="heads heads1">
				<span class="number">序号</span>
				<span class="labelname">名称</span>
				<span class="kong"></span>
				<span class="operation">操作</span>
			</div>
			
			<div  v-if='current == 1' class="heads" v-for='(item,index) in items' v-bind:key="index">
				<input v-if='item.state' placeholder="请填写所要修改的广告类型" v-model='title' > 
				<span class="number">{{index+1}}</span>
				<span class="labelname">{{item.advertiseTypeName}}</span>
				<span class="kong"></span>
				<span v-if='item.state==false' class="operation">
					<img @click='modify(item.advertiseTypeId,index)' src="../../assets/bianji.png">
					<img @click='remove(item.advertiseTypeId)' src="../../assets/shanchu.png">
				</span>
				<span v-if='item.state == true' class="operation" style="line-height: 2rem"> 
					<span class="confirm" @click='confirm(item.advertiseTypeId)'>确认</span>
					<span class="cancel" @click='cancel(index)'>取消</span>
				</span>
			</div>
			
			<div  v-if='current == 2' class="heads" v-for='(item,index) in items' v-bind:key="index">
				<input v-if='item.state' placeholder="请填写所要修改的天数/金额" v-model='title' > 
				<span class="number">{{index+1}}</span>
				<span class="labelname">{{item.unitPriceAmount}}</span>
				<span class="kong"></span>
				<span v-if='item.state==false' class="operation">
					<img @click='modify(item.unitPriceId,index)' src="../../assets/bianji.png">
					<img @click='remove(item.unitPriceId)' src="../../assets/shanchu.png">
				</span>
				<span v-if='item.state == true' class="operation" style="line-height: 2rem"> 
					<span class="confirm" @click='confirm(item.unitPriceId)'>确认</span>
					<span class="cancel" @click='cancel(index)'>取消</span>
				</span>
			</div>
			<div  v-if='current == 3' class="heads" v-for='(item,index) in items' v-bind:key="index">
				<input v-if='item.state' placeholder="请填写所要修改的销量" v-model='title' > 
				<span class="number">{{index+1}}</span>
				<span class="labelname">{{item.sellerVolumeAmount}}</span>
				<span class="kong"></span>
				<span v-if='item.state==false' class="operation">
					<img @click='modify(item.sellerVolumeId,index)' src="../../assets/bianji.png">
					<img @click='remove(item.sellerVolumeId)' src="../../assets/shanchu.png">
				</span>
				<span v-if='item.state == true' class="operation" style="line-height: 2rem"> 
					<span class="confirm" @click='confirm(item.sellerVolumeId)'>确认</span>
					<span class="cancel" @click='cancel(index)'>取消</span>
				</span>
			</div>
		</div>
		<el-dialog :visible.sync="dialogVisible" width="15%" top='30vh' :close-on-click-modal='false'>  
		<span class="box">
			<img class="tupiao" src="../../assets/jinggao.png">
			<span class="span1">确认进行此操作？</span>
			<span class="span2">{{hint}}</span>
			<span class="span3 btn_que"  @click="dialog()" >确认</span>
			<img @click="dialogVisible = false" class="warnimg" src="../../assets/quxiao.png">
		</span>
		</el-dialog>
	</div>
</template>

<script>
	import axios from 'axios'
	export default{
		name:"screen",
		data(){
			return {
				dialogVisible:false,
				pedestrianVolumeId:'',
				addtitle:'',
				current:1,
				title:"",
				items:[],
				flag : false,
				 hint:''
			}
		},	
		created(){
			this.Advertisement()
			if(this.current == 1){
				this.hint = '确定要删除该广告类型吗？'
			}else if(this.current == 2){
				this.hint = '确定要删除该天数/金额吗？'
			}else if(this.current == 3){
				this.hint = '确定要删除该销量吗？'
			}
		},
		methods:{
			Advertisement(){
				var that = this;
				that.current = 1;
				that.hint = '确定要删除该广告类型吗？'
				axios({
					url:"Advtype/alladvtype",
					methods:'get'
				}).then(function(res){
					var data = res.data.data;
					data.forEach(function(item,index){
						item.state = false;
					})
					that.items = data;   
					console.log(data)    
				})  
			},	
			Daysamount(){
				var that = this;
				that.current = 2;
				that.hint = '确定要删除该天数/金额吗？'
				axios({
					url:"Unitprice/allunitprice",
					methods:'get'
				}).then(function(res){
					var data = res.data.data;
					data.forEach(function(item,index){
						item.state = false;
					})
					that.items = data;
					console.log(data)
				})
			},	
			Visitorsflowrate(){
				var that = this;
				that.current = 3;
				that.hint = '确定要删除该销量吗？'
				axios({
					url:"Sellervol/allsellervolume",
					methods:'get'
				}).then(function(res){
					var data = res.data.data;
					data.forEach(function(item,index){
						item.state = false;
					})
					that.items = data;
					console.log(data)
				})
			},
			modify(advertiseTypeId,index){
				var that = this;
				if(that.flag == false){
					that.title = that.items[index].advertiseTypeName
					that.flag = true
					that.items[index].state  = true;
					// that.title = that.items[index].pedestrianVolumeAmount
				}
				if(that.current == 1){
					that.title = that.items[index].advertiseTypeName
				}else if(that.current == 2){
					that.title = that.items[index].unitPriceAmount
				}else if(that.current == 2){
					that.title = that.items[index].pedestrianVolumeAmount
				}
			},
			cancel(index){
				var that = this;
				that.flag = false;
				that.items[index].state  = false;
			},
			confirm(advertiseTypeId){
				var that = this;
				that.flag = false;
				
				if(that.current == 1){
					axios({
			    		url:"Advtype/editadvtype",
			    		method:'post',     
			    		data:{
				    		advertiseTypeId: advertiseTypeId,
							advertiseTypeName : that.title
			    		}
			    	}).then(function(res){
						that.Advertisement();
					})
				}else if(that.current == 2){
					axios({
			    		url:"Unitprice/editunitprice",
			    		method:'post',     
			    		data:{
				    		unitPriceId: advertiseTypeId,
							unitPriceAmount : that.title
			    		}
			    	}).then(function(res){
						that.Daysamount();
					})
				}else if(that.current == 3){
					axios({
			    		url:"Sellervol/editsellervolume",
			    		method:'post',     
			    		data:{
				    		sellerVolumeId: advertiseTypeId, 
							sellerVolumeAmount : that.title  
			    		}
			    	}).then(function(res){
						that.Visitorsflowrate();  
					})
				}
			},
			add(){
				var that = this;

				if(that.current == 1 && that.addtitle !='')
				{
					axios({
		    		url:"Advtype/addadvtype",
		    		method:'post',     
		    		data:{
						advertiseTypeName : that.addtitle
		    		}
			    	}).then(function(res){
						that.Advertisement();
						that.addtitle=''
					})
				}else if(that.current == 2 && that.addtitle !=''){

					// alert(that.addtitle)
					axios({    
		    		url:"Unitprice/addunitprice",
		    		method:'post',     
		    		data:{
						unitPriceAmount : that.addtitle
		    		}
			    	}).then(function(res){
						that.Daysamount();
						that.addtitle=''
					})
			    	
				}else if(that.current == 3 && that.addtitle !=''){
					axios({
		    		url:"Sellervol/addsellervolume",
		    		method:'post',     
		    		data:{
						sellerVolumeAmount : that.addtitle
		    		}
			    	}).then(function(res){
						that.Visitorsflowrate();
						that.addtitle=''
					})
				}
				
			},
			remove(id){ 
				this.pedestrianVolumeId = id;
				this.dialogVisible = true;
				// console.log(id)
			},
			dialog(){
				var that = this;
				if(that.current == 1){
					axios({
						url:'Advtype/deleteadvtype',
						method:'post',
						data:{
							advertiseTypeId:that.pedestrianVolumeId
						}
					}).then(function(res){
						if(res.data.code == 200){
							that.dialogVisible = false
							that.Advertisement();
						}
					})
				}else if(that.current == 2){

					axios({
						url:'Unitprice/deleteunitprice',
						method:'post',
						data:{
							unitPriceId:that.pedestrianVolumeId
						}
					}).then(function(res){
						if(res.data.code == 200){
							that.dialogVisible = false
							that.Daysamount();
						}
					})
				}else if(that.current == 3){
					axios({
						url:'Sellervol/deletesellervolume',
						method:'post',
						data:{
							sellerVolumeId:that.pedestrianVolumeId
						}
					}).then(function(res){
						if(res.data.code == 200){
							that.dialogVisible = false
							that.Visitorsflowrate();
						}
					})
				}
			}		
		}
	}

</script>

<style scoped>
.screen{
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
.addlabels{
	margin-left: 0.5rem;
}
.addlabels input{
	padding:0.8rem 1rem;
	border: 0;
	outline: none;
	width: 88%;
	border-radius: 0.3rem;
}
.addlabels span{
	margin-left: 2%;
	padding:0.5rem 1.8rem;
	background-color: #FFCC00;
	border-radius: 1rem;
	color: white;
}
.content{
	margin-top: 2rem;
	margin-left: 0.5rem;
}
.heads{
	display: flex;
	margin-bottom: 0.1rem;
	position: relative;
}
.heads span{
	padding:0.8rem 0;
	background-color: white
}
.heads1 span{
	padding:0.5rem 0;
}
.heads .number{
	width:6%;
	line-height: 2rem;
	text-align: center;
}
.heads .labelname{
	width: 17%;
	line-height: 2rem;
	text-align: center;
}
.heads .kong{
	width: 67%;
}
.heads .operation{
	width:10%;
	text-align: center;
}
.heads .operation img{
	width:2rem;
	height: 2rem;
	margin: 0 0.1rem;
}
.heads .operation span{
	padding:0.5rem 1.5rem;
	background-color: #FFCC00;
	color: white;
	border-radius: 1rem;
}
.confirm{
	margin-left: -3rem;
}
.cancel{
	margin-left: 0;
	margin-left: 0.3rem;
	background-color: #FF3545 !important;
}
.heads  input{
	width:80%;
	position: absolute;
	top: 0;
	left: 0;
	height: 3.6rem;
	border:0;
	outline: 0;
	padding-left:2rem;
}
</style>