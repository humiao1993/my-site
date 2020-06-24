<template>
  <div class="hello" @click="inputLoginInfo">
    <div class="welcome" v-if="!logging">
      <h1>四点</h1>
      <p>Whatever is worth doing is worth doing well</p>
    </div>
    <div class="login">
      <a-form :form="loginForm" @submit="submitLogin" v-if="logging" layout="inline">
        <a-form-item>
          <a-input
            v-decorator="['identity',{ rules: [{ required: true, message: 'Please input your username!' }]},]"
            placeholder="username"
          >
            <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            v-decorator="['password',{ rules: [{ required: true, message: 'Please input your Password!' }]},]"
            type="password"
            placeholder="password"
          >
            <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)"/>
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button type="primary" html-type="submit" :disabled="hasErrors(loginForm.getFieldsError())">
            Log in
          </a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'Welcome',
    data () {
      return {
        loginForm: this.$form.createForm(this, {name: 'loginForm'}),
        logging: false,
      }
    },
    methods: {
      inputLoginInfo () {
        this.logging = true
      },
      submitLogin (e) {
        e.preventDefault()
        const _this = this
        this.loginForm.validateFieldsAndScroll((err, values) => {
          if (!err) {
            const DATA = {...values}
            _this.axios.post('/api/account/login', DATA).then(function (response) {
              _this.$store.commit('setToken', response.token)
              _this.$store.commit('setAccount', response.account)
              _this.$router.replace('/home')
            })
          }
        })
      },
      hasErrors (fieldsError) {
        return Object.keys(fieldsError).some(field => fieldsError[field])
      },
    }
  }
</script>

<style scoped lang="less">
  @import "../assets/style/var";

  div.hello {
    background: url("../assets/image/welcome-background.jpg") no-repeat;
    background-size: cover;
    height: 100vh;
    max-height: 100vh;

    div.welcome {
      position: absolute;
      height: 150px;
      margin: auto;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      h1 {
        font-size: 4rem;
        font-weight: 700;
        font-family: "Playball";
        color: #ffffff;
      }

      p {
        font-size: 2rem;
        color: #ffffff;
        font-family: "仿宋";
      }
    }

    div.login {
      position: absolute;
      height: 100px;
      margin: auto;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;

      button {
        background-color: @primary-color;
        border-color: @primary-color;
      }
    }
  }
</style>
