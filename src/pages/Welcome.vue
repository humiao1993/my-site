<template>
  <div class="hello">
    <div class="welcome">
      <router-link to="/home">四点</router-link>
      <p>Whatever is worth doing is worth doing well</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'HelloWorld',
    data () {
      return {}
    }
  }
</script>

<style scoped lang="less">
  div.hello {
    background: url("../assets/image/welcome-background.jpg") no-repeat;
    background-size: cover;
    height: 100vh;
    max-height: 100vh;


    div.welcome {
      position: absolute;
      height: 130px;
      margin: auto;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      a{
        font-size: 4rem;
        font-weight: 700;
        letter-spacing: -1px;
        font-family: "Open Sans",sans-serif;
        color: #ffffff;
        text-decoration: none;
      }
      p {
        font-size: 2rem;
        color: #ffffff;
        font-family: "仿宋";
      }
    }
  }
</style>
