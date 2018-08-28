<template>
    <div id="wrapper">
                <div class="videoheader">
                    header
                </div>


                <div class="videoMain">
                    main
                </div>
    </div>
</template>

<script>
  export default {
    data () {
      return {
        activeIndex: '1'
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        console.log(key, keyPath)
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
    background: #eee;
    height: 100%;
}
    .videoMain{
        /*display: -ms-flexbox;*/
        display: flex;
        /*-ms-flex-wrap: wrap;*/
        flex-wrap: wrap;
        /*-ms-flex-align: center;*/
        align-items: center;
        justify-content: center;
        /*-ms-flex-pack: justify;*/
        /*justify-content: space-between;*/

        background: #007aff;
        color: #fff;
        height: calc(100% - 60px);

    }
    .videoheader{
        /*display: -ms-flexbox;*/
        display: flex;
        /*-ms-flex-wrap: wrap;*/
        flex-wrap: wrap;
        /*-ms-flex-align: center;*/
        align-items: center;
        justify-content: center;
        /*-ms-flex-pack: justify;*/
        /*justify-content: space-between;*/

        background: #009fff;
        color: #fff;
        height: 60px;
    }
</style>
