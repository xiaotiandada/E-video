
<template>
    <div class="wrapper">
        <div class="header">
            <div class="logo">
                <img src="../assets/img/logo.png" alt="logo">
                <h1>网易云Mv</h1>
            </div>
            <div class="status">
                <a href="javascript:void (0);" @click="winMin">
                    <i class="el-icon-minus"></i>
                </a>
                <a href="javascript:void (0);" @click="winEnlargeOrNarrow">
                    <i class="el-icon-rank"></i>
                </a>
                <a href="javascript:void (0);" @click="winClose">
                    <i class="el-icon-close"></i>
                </a>
            </div>
        </div>
        <div class="main">
            <el-scrollbar style="height: 100%;">
                <div class="main-mv">
                    <div
                            class="music-mv"
                            v-for="(mvItem, mvIndex) in mvList"
                            :key="mvIndex"
                            @click="toggleInMvPlayer(mvIndex)"
                    >
                        <div class="music-mv-img">
                <span class="music-mv-play-count">
                    22788
                </span>
                            <a
                                    href="javascript:void(0);"
                            >
                                <img :src="mvItem.cover" :alt="mvItem.briefDesc">
                            </a>
                            <span class="music-mv-img-title">{{mvItem.briefDesc}}</span>
                        </div>
                        <div class="music-mv-detail">
                            <span class="music-md-title">{{mvItem.name}}</span>
                            <span class="music-mv-name">{{mvItem.artistName}}</span>
                        </div>
                    </div>
                </div>
            </el-scrollbar>
        </div>

        <div class="mv-player" v-if="toggleMvPlayer" @click="closeMvPlayer">
            <div class="mv-player-main" @click.stop="">
                <div class="mv-close" @click="closeMvPlayer">
                    <i class="el-icon-close"></i>
                </div>
                <d-player class="d-player" @play="play" :options="options"></d-player>
            </div>
        </div>

    </div>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  import movieApi from '@/service/movieApi'

  const {ipcRenderer: ipc} = require('electron')
  export default {
    components: {
      'd-player': VueDPlayer
    },
    created () {
      this.getMovieReleased()
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
        },
        mvList: [],
        toggleMvPlayer: false
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
      },
      play () {
        console.log('play callback')
      },
      async getMovieReleased () {
        let _this = this
        await movieApi.getReleased()
          .then(function (response) {
            let dataMv = response.data
            if (response.status === 200 && dataMv.code === 200) {
              _this.mvList = dataMv.data
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      toggleInMvPlayer (mvIndex) {
        this.toggleMvPlayer = true
      },
      closeMvPlayer () {
        this.toggleMvPlayer = false
      },
      winMin () {
        ipc.send('window-min')
      },
      winEnlargeOrNarrow () {
        ipc.send('win-enlarge-or-narrow')
      },
      winClose () {
        ipc.send('window-close')
      }
    }
  }
</script>


<!--@import "https://fonts.googleapis.com/css?family=Source+Sans+Pro";-->
<style lang="scss">
    @import "~normalize.css";
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');


</style>
