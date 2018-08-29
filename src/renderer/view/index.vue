<template>
    <div id="wrapper">
                <div class="videoheader">
                    header
                </div>


                <div class="videoMain">
                    <div class="videoMainContent"></div>
                    <div class="videoMainList"></div>
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

</style>
