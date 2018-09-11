<template>
    <div id="wrapper">
                <div class="videoheader">

                    <div class="header-logo">
                        <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536514739340&di=b6b9bbe3f9988907a8d5ea5ef906f668&imgtype=0&src=http%3A%2F%2Fask.qcloudimg.com%2Fhttp-save%2Fyehe-1148782%2Fqfwcb4xrqw.png" alt="">
                    </div>

                    <div class="header-menu">
                        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
                            <el-menu-item index="1">首页</el-menu-item>
                            <el-menu-item index="2">联系我们</el-menu-item>
                            <el-menu-item index="3">关于我们</el-menu-item>
                        </el-menu>
                    </div>

                    <div class="header-serach">
                        <el-input v-model="headerSearch" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="videoMain">
                    <div class="videoMainContent">
                        <d-player @play="play" :options="options"></d-player>
                    </div>
                    <div class="videoMainList"></div>
                </div>
    </div>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'
  export default {
    components: {
      'd-player': VueDPlayer
    },
    data () {
      return {
        activeIndex: '1',
        headerSearch: '',
        options: {
          video: {
            url: 'http://static.smartisanos.cn/common/video/t1-ui.mp4',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: false,
          contextmenu: [
            {
              text: 'GitHub',
              link: 'https://github.com/xiaotiandada'
            }
          ]
        }
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      play () {
        console.log('play callback')
      }
    }
  }
</script>


<!--@import "https://fonts.googleapis.com/css?family=Source+Sans+Pro";-->
<style lang="scss">
    @import "~normalize.css";
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
    html,body{
        width: 100%;
        height: 100%;
    }
    body {
        font-family: 'Source Sans Pro', sans-serif;
    }
#wrapper{
    height: 100%;
    display: flex;
    flex-direction: column;
}

    .videoheader{
        align-items: center;
        justify-content: center;
        background: #fff;
        box-shadow: 0 2px 8px rgba(104, 104, 104, 0.5);
        color: #fff;
        height: 60px;
    }
    .videoMain{
        display: flex;
        color: #fff;
        /*height: calc(100% - 60px);*/
        flex: auto;
        flex-direction: row;
    }
    .videoMainContent{
        flex: 4;
        background: #fff;
        margin: 20px 10px 20px 20px;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(104, 104, 104, 0.5);
    }

    .videoMainList{
        flex: 1;
        background: #fff;
        margin: 20px 20px 20px 10px;
        border-radius: 3px;
        box-shadow: 0 2px 8px rgba(104, 104, 104, 0.5);
    }

    .header-logo{
        width: 61px;
        height: 61px;
        margin-left: 20px;
        float: left;
        img{
            height: 41px;
            margin-top: 10px;
        }
    }

    .header-serach{
        line-height: 61px;
        float: right;
        margin-right: 20px;
    }

    .header-menu{
        float: right;
    }

</style>
