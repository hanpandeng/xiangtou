<template>
    <div class="image-view">
        <img :src="abc">
        <div class="view">
            <div class="item" v-for="(item, index) in imgBase64">
                <span class="cancel-btn" @click="delImg(index)"><img src="../../assets/chahao1.png"></span>
                <img v-if="format == 'img'" :src="item">
                <video v-else="format == 'vedio'" :src="item"></video>
            </div> 
            
            <div class="addbox">
                <input type="file"  :multiple='flag' @change="getImgBase()">
                <div class="addbtn"></div>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios'
    export default {
        name: 'imageView',
        props: ["number","img","format"],
        data (){
            return {
                flag:true,
                imgBase64:[],   //存储img base64的值
                uploadimg : [], //获取上传的文件的地址
                abc:"",
                a:''
            }
        },  
        created(){
            if(this.number){
                this.flag = false
            }

            //回显的图片 
            if(this.img){
                this.imgBase64 = this.img
            }
            // console.log(this.img)
        },
        
        // mounted(){
        //     console.log("11"+this.img)
        // },
        methods: {
            //获取图片base64实现预览
            getImgBase(){
                var _this = this;
                var event = event || window.event;
                
                for(var x=0;x<event.target.files.length;x++){
                 _this.uploadimg .push(event.target.files[x])
                 var file = event.target.files[x];
                 // console.log(file)
                 if(this.format == 'img'){
                       if(file.type == "image/jpeg" || file.type == "image/png"){
                           var reader = new FileReader(); 
                        //转base64
                        reader.onload = function(e) {
                            _this.imgBase64.push(e.target.result);
                        }
                        reader.readAsDataURL(file);
                      }
                 }
                else if(this.format == 'vedio' ){
                   
                    if(file.type == "video/mp4" || file.type == "video/avi" || file.type == "video/ogv" || file.type == "video/wma" || file.type == "video/rmvb" ||  file.type == "video/rm" || file.type == "video/3GP" || file.type == "video/flash"){
                           var reader = new FileReader(); 
                        //转base64
                        reader.onload = function(e) {
                            _this.imgBase64.push(e.target.result);
                        }
                        reader.readAsDataURL(file);
                      }
                 }else {
                       if(file.type == "image/jpeg" || file.type == "image/png"){
                           var reader = new FileReader(); 
                        //转base64
                        reader.onload = function(e) {
                            _this.imgBase64.push(e.target.result);
                        }
                        reader.readAsDataURL(file);
                      }
                 }
                }
				
                if(this.number == undefined){
                   this.$emit('uploadimg', this.uploadimg);
                }
                else if(this.uploadimg.length >= 0){
                    this.imgBase64 = this.imgBase64.slice(0,0)
                    this.uploadimg = this.uploadimg.slice(0,1)
                    this.$emit('uploadimg', this.uploadimg);
                }
            },
            
            //删除图片
            delImg(index){
                 this.imgBase64.splice(index,1);
                 this.uploadimg.splice(index,1);
            },
            upload(){
                var _this = this;   
                var uri = this.$store.state.http + "Image/imageupload";
                var xhr = new XMLHttpRequest();
                var fd = new FormData();
                xhr.open("POST", uri, true);
                xhr.onreadystatechange = function() {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        // 上传成功
                    }
                };
                for(var x=0;x<_this.uploadimg.length;x++){
                    fd.append('files', _this.uploadimg[x] );
                }
                // 初始化multipart/form-data格式的上传
                xhr.send(fd);
            }
        }, 
        watch:{  
            img(curVal,oldVal){
                 if(curVal){
                    // console.log(typeof curVal)
                    var ss= typeof curVal
                    if(ss == "string"){
                         this.imgBase64 = JSON.parse(curVal)
                    }else{
                         this.imgBase64 = curVal
                    }
                    
                }
            }
        }  
    }

</script>
<style scoped>
*{padding:0;font-family:"微软雅黑";}
.clearboth::after{
    content:"";
    display:block;
    clear:both;
}
.image-view .addbox{
    margin: 10px 10px 0 0;
    position:relative;
    display: inline-block;
    height:100px;
    width:100px;
    text-align:center;
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
    background:url("../../assets/charulunbo.png");
    background-size: 100% 100%;
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
    clear:both;
    min-height: 100px;
    display: inline-block;
}
</style>
