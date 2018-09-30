
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
                            @click="toggleInMvPlayer(mvIndex, mvItem.id)"
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

        <div class="paging">
            <a href="javascript:;" @click="prevPage">+</a>
            <a href="javascript:;" @click="nextPage">-</a>
        </div>

        <div class="mv-player" v-show="toggleMvPlayer" @click="closeMvPlayer">
            <div class="mv-player-main" @click.stop="">
                <div class="mv-close" @click="closeMvPlayer">
                    <i class="el-icon-close"></i>
                </div>
                <d-player class="d-player" @play="play" :options="options" ref="player"></d-player>
            </div>
        </div>

        <el-dialog
                title="提示"
                :visible.sync="dialogVisible"
                width="30%"
                :before-close="handleClose">
                    <span>不能再翻页了哦~</span>
                    <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>


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
    mounted () {
      this.player = this.$refs.player.dp
    },
    watch: {
    },
    data () {
      return {
        dialogVisible: false,
        player: null,
        options: {
          video: {
            url: 'http://vodkgeyttp8.vod.126.net/cloudmusic/8179/mv/a1e4/eb76d8f5ceaccd6d6008acc486fd0ce8.mp4?wsSecret=8324290c514870efd202e18de74c8d32&wsTime=1538147474',
            pic: 'http://static.smartisanos.cn/pr/img/video/video_03_cc87ce5bdb.jpg'
          },
          autoplay: false,
          contextmenu: [
            {
              text: 'GitHub',
              link: 'https://github.com/xiaotiandada'
            }
          ],
          danmaku: {
            id: '5436712',
            api: 'http://123.207.60.132:3000/comment/mv?id=5436712',
            token: 'tokendemo',
            maximum: 1000,
            addition: ['http://123.207.60.132:3000/comment/mv?id=5436712'],
            user: 'DIYgod',
            bottom: '15%',
            unlimited: true
          }
        },
        mvPageIndex: 0,
        mvList: [],
        toggleMvPlayer: false
      }
    },
    methods: {
      play () {
        // console.log('play callback')
        this.player.danmaku.send({
          text: 'dplayer is amazing11111111',
          color: '#b7daff',
          type: 'right'
        }, function () {
          console.log('success')
        })
      },
      prevPage () {
        if (this.mvPageIndex <= 0) {
          this.dialogVisible = true
          return false
        }
        this.mvPageIndex--
        this.togglePageMv(this.mvPageIndex)
      },
      nextPage () {
        if (this.mvPageIndex >= 99) {
          this.dialogVisible = true
          return false
        }
        this.mvPageIndex++
        this.togglePageMv(this.mvPageIndex)
      },
      async togglePageMv (offset = 0) {
        let _this = this
        await movieApi.getTopMv(30, offset)
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
      async getMovieReleased () {
        let _this = this
        await movieApi.getTopMv(30, 0)
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
      toggleInMvPlayer (mvIndex, mvId) {
        this.toggleMvPlayer = true
        this.getMvId(mvId)
      },
      closeMvPlayer () {
        this.toggleMvPlayer = false
        this.player.pause()
      },
      getMvId (mvId) {
        let _this = this
        movieApi.getMvId(mvId)
          .then(function (response) {
            // console.log(response)
            let dataMv = response.data
            if (response.status === 200 && dataMv.code === 200) {
              _this.player.switchVideo({
                url: dataMv.data.brs[1080] || dataMv.data.brs[720] || dataMv.data.brs[480] || dataMv.data.brs[240]
              })
              _this.getMvComments(dataMv.data.id)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      async getMvComments (id) {
        await movieApi.getMvComments(id)
          .then(function (response) {

          })
          .catch(function (err) {
            console.log(err)
          })
      },
      handleClose (done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done()
          })
          .catch(_ => {})
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
