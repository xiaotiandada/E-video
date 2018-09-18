
<template>
    <div class="wrapper">
        <div class="music-mv">
            <div class="music-mv-img">
                <span class="music-mv-play-count">
                    22788
                </span>
                <a href="">
                    <img src="http://p1.music.126.net/YIqV5eBxgaZ9Ony1CQ6xiQ==/109951163552777017.jpg" alt="">
                </a>
                <span class="music-mv-img-title">
                    那英献声电视剧《天坑鹰猎》片尾曲
                </span>
            </div>
            <div class="music-mv-detail">
                <span class="music-md-title">雪国远方</span>
                <span class="music-mv-name">那英</span>
            </div>
        </div>
    </div>
</template>

<script>
  import VueDPlayer from 'vue-dplayer'
  import 'vue-dplayer/dist/vue-dplayer.css'

  import movieApi from '@/service/movieApi'
  export default {
    components: {
      'd-player': VueDPlayer
    },
    created () {
      // this.getMovieReleased()
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
      },
      async getMovieReleased () {
        await movieApi.getReleased('上海', 0, 100)
          .then(function (response) {
            console.log(response)
          })
          .catch(function (err) {
            console.log(err)
          })
      }
    }
  }
</script>


<!--@import "https://fonts.googleapis.com/css?family=Source+Sans+Pro";-->
<style lang="scss">
    @import "~normalize.css";
    @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');


</style>
