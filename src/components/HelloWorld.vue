<template>
  <div id="wrapper" >
    <div id="sidebar" >
      <div class="sidebar_top">
        <img src="../assets/xiangtou.png">
        <span>享投后台管理</span>
      </div>
       <el-row class="tac" :style='slibarHeight'>
      <el-col >
        <!-- <h5>自定义颜色</h5> -->
        <el-menu
        :default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#333"
        text-color="#fff"
        router
        active-text-color="#FFD800">
        <template v-for="(item,inde) in items" v-bind:index="inde">
          <template v-if="item.subs">
            <el-submenu :index="String(inde)" >
             <template slot="title">
                <i class="tubiao" :style="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </template>
              <el-menu-item v-for="(subItem,i) in item.subs"  :index="String(subItem.route)" v-bind:key="i">
                 <i class="tubiao" :style="subItem.indes"></i>
                 <span slot="title"> {{ subItem.title }}</span>
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="String(item.route)" >
              <i class="tubiao" :style="item.icon"></i><span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </template>

      </el-menu>
    </el-col>
  </el-row>
  
<!--<ul>
        <li v-for='(parent,inde) in items' v-bind:key="inde" >
          <div :class="current ==inde ? 'selected' : '' " @click="clickme(inde,parent.show)">
            <img class="tubiao" :src="parent.icon"/>
            {{parent.title}}
          </div>
          <router-link tag='span' v-if="parent.show" v-for="(item,index) in parent.subs" :to='item.route' v-bind:key="index"><img :src="item.index">{{item.title}}</router-link>
        </li>
      </ul> -->
    </div>
    
    <div id="headea">
        <Heade></Heade>
        <router-view></router-view>
    </div>
    
  </div>
</template>

<script>
  
  import uploadImg from './common/uploading' 
  import HomePage from './page/homepage.vue';
  import Heade from './page/heade.vue';
  export default {
    name: 'HelloWorld',

    data () {
      return {
        current:0,
        items: [{
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/82dba3ba-834b-470b-a7be-c2ca72148262.png')"},
          index: 'dashboard',
          title: '后台首页',
          route:'/home',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/57c235e9-7af5-488b-8059-092d75bc6063.png')"},
          index: 'table',
          title: '内容管理',
          show:false,
          subs: [{
            indes: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/8741121f-f9bb-4c4e-b219-1b7c25542c45.png')"},
            title: '首页轮播图',
            route: "/homeswipper"
          },
          {
            indes: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/580a6e6c-2a55-4aff-8098-3bd8d8b7d2a1.png')"},
            title: '置顶广告位',
            route: "/settop"
          },
          {
            indes: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/4cdee0e9-2a87-4a52-a398-07e59226ae1d.png')"},
            title: '关于我们',
            route: "/aboutus"
          }
          ]   
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/50012fcb-e775-4d26-8670-af0ec8ad233c.png')"},
          index: 'tabs',
          title: '广告位管理',
          route:'/advertising',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/97a358e2-80a5-41e4-a0d0-6ec839a3f40d.png')"},
          index: '3',
          title: '发现管理',
          route:"/discovery",
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/d555d90c-cddf-49f3-a4f6-eb8686e851a6.png')"},
          index: 'charts',
          title: '标签管理',
          route : '/labels',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/f1cf4e2c-40d9-4ea7-b2ce-5bf994c5fd68.png')"},
          index: 'drag3',
          title: '导航栏管理',
          route : '/navigationbar',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/7a9bba8c-8294-4f09-8e82-289d532f7ad8.png')"},
          index: 'drag',
          title: '反馈管理',
          route : '/feedback',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/74220bc7-6440-4365-956d-62e768983bca.png')"},
          index: 'drag1',
          title: '筛选管理',
          route : '/screen',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/b91fe072-de99-458e-9e30-b7a100d5db19.png')"},
          index: 'permission',
          title: '账号管理',
          show:false,
          subs: [{
            indes: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/b1d6ab5d-44c6-4d90-9f96-95bbbed23c0e.png')"},
            title: '发广告账号',
            route: "/buyinfo"
          },
          {
            indes: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/c16fde6b-3c31-4ae2-82f2-47ede5dc7190.png')"},
            title: '接广告账号',
            route: "/advertisement"
          }
          ]
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/6b819528-4e83-48c8-8f52-d28680e40aa1.png')"},
          index: '404',
          title: '订单管理',
          route:'/order',
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/eb037871-44bf-4650-bc1f-53948eb67309.png')"},
          index: '4041',
          title: '开发小程序',
          route: "/appmini",
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/faf0d8cb-e6aa-4e80-9deb-292f9c07aa74.png')"},
          index: '4042',
          title: '会员用户管理',
          route: "/member",
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/a2815fa2-4b19-456f-a609-fdf819a29375.png')"},
          index: '40421',
          title: '会员设置',
          route: "/memberset",
          show:false
        },
        {
          icon: {"background":"url('https://www.chuanshoucs.com/ServerImg/2018-08-03/5eedbf0c-8378-4609-b329-683df5f1d831.png')"},
          index: '40423',
          title: '会员充值活动',
          route: "/memberrecharge",
          show:false
        }
        ],
         screenHeight: document.body.clientHeight,
         slibarHeight:{
           "height":document.body.clientHeight - 200+'px',
           "width":document.body.clientWidth * 0.1 + 17 +"px"
         }
      }
    },
    components:{
     HomePage , Heade , uploadImg 
   },
   created(){
        if(sessionStorage.getItem('current')){
          this.current = sessionStorage.getItem('current')
        }
   },
   mounted(){
     const that = this
     window.onresize = () => {
      return (() => {
        window.screenHeight = document.body.clientHeight
        that.screenHeight = window.screenHeight
      })()
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
    clickme (i,flag) {
      // this.$router.push({ path: 'home' })
      // this.items.forEach(function(item,index){
      //     item.show=false;
      // })
      var that=this;
      var pathfile = that.items[i].route
      if(pathfile){
        this.$router.push({ path: pathfile})
      }

      this.current = i
      this.items[i].show=!flag;
      sessionStorage.setItem('current', that.current);
    }
  },
  watch: {
      // 如果 clientHeight` 发生改变，这个函数就会运行
      screenHeight(val,old) {
        this.screenHeight = val;
        this.slibarHeight["height"] = val - 200+'px';
      }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

#wrapper{
  display: flex;
  min-height: 100%;
  flex-wrap: wrap;
}
#headea{
  margin-left: 10%;
  width: 90%;
  /*height: 3rem;*/
  /*background:red;*/
}
#sidebar{
  position: fixed;
  top: 0;
  left: 0;
  width: 10%;
  color: white;
  background: #333;
  /*min-height: 100%;*/
  height: 100%;
  overflow: hidden;
  /*overflow-y: auto;*/
}

.tac{
  /*8.5+0.75+1.75*/
  overflow-y:auto;
  overflow-x: hidden;
  /*padding-bottom: 1rem;*/
}

#sidebar .sidebar_top{
  text-align: center;
  height: 8.5rem;
  border-bottom: 1px solid #666;
  margin-bottom: 0.75rem;
}
#sidebar .sidebar_top img{
  display: block;
  margin: 1.75rem auto 1.25rem;
  width: 4rem;
  height: 4rem;
}
.el-col-24{
  width:101%;
}
.el-menu-vertical-demo{
  padding-bottom: 1.5rem;
}
</style>
<style>
.el-submenu__icon-arrow {
    left: 8rem;
}
.el-submenu__title:hover,.el-menu-item:hover{
  background-color:#FFCC00 !important;
}
.el-menu-item .tubiao{
  display: inline-block;
  width:20px;
  height:20px;
   margin-right: 0.5rem;
    background-size: 100% 100% !important;
}
.el-submenu__title .tubiao{
  margin-right: 0.5rem;
  display: inline-block;
  width:20px;
  height:20px;
  background-size: 100% 100% !important;
}
.el-menu-item.is-active {
  color: white !important;
   background-color: #FFCC00 !important;
}
</style>