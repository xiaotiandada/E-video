
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

                <div class="paging">
                  <a href="javascript:;" @click="frontPage">回到首页</a>
                  <a href="javascript:;" @click="prevPage">上一页</a>
                  <a href="javascript:;" @click="prevPage">{{mvPageIndex+1}}</a>
                  <a href="javascript:;" @click="nextPage">下一页</a>
                  <a href="javascript:;" @click="backPage">回到尾页</a>
                </div>
            </el-scrollbar>
             
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

  import _ from 'lodash'

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
    watch: {},
    data () {
      return {
        dialogVisible: false,
        player: null,
        options: {
          video: {
            url: 'https://moeplayer.b0.upaiyun.com/dplayer/flowerdance.mp4',
            pic: 'https://moeplayer.b0.upaiyun.com/dplayer/flowerdance.jpg'
          },
          autoplay: false,
          contextmenu: [
            {
              text: 'GitHub',
              link: 'https://github.com/xiaotiandada'
            }
          ],
          danmaku: true
        },
        mvPageIndex: 0,
        mvList: [],
        danmaku: [],
        toggleMvPlayer: false
      }
    },
    methods: {
      play () {},
      frontPage () {
        this.togglePageMv(0)
        this.mvPageIndex = 0
      },
      backPage () {
        this.togglePageMv(99)
        this.mvPageIndex = 99
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
        let _this = this
        await movieApi.getMvComments(id)
          .then(function (response) {
            let commentsData = response.data
            if (response.status === 200 && commentsData.code === 200) {
              _this.danmaku = commentsData.comments
              _this.transformComments(_this.danmaku)
            }
          })
          .catch(function (err) {
            console.log(err)
          })
      },
      transformComments (commentsArr) {
        let _this = this
        let len = commentsArr.length
        let i = 0
        let comment = {
          text: 'xiaotian',
          color: '#fff',
          type: 'right'
        }
        let type = ['top', 'right', 'bottom']
        function pushComments () {
          let random = _.random(0, 3)
          comment.text = commentsArr[i].content
          comment.color = `rgb(${_.random(0, 255)}, ${_.random(0, 255)}, ${_.random(0, 255)})`
          comment.type = `${type[random]}`
          i++
          _this.player.danmaku.draw(comment)
          if (i >= len) {
            return false
          } else {
            _.delay(function () {
              pushComments()
            }, _.random(800, 2000))
          }
        }
        pushComments()
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
