<style lang="less">
  @import './login.less';
</style>

<template>
  <div class="login">
    <div class="login-con">
      <Spin fix v-if="loading">登录中...</Spin>
      <Card icon="log-in" title="欢迎登录" :bordered="false">
        <div class="form-con">
          <login-form @on-success-valid="handleSubmit"></login-form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import LoginForm from '_c/login-form'
import { mapActions } from 'vuex'
export default {
  components: {
    LoginForm
  },
  data () {
    return {
      loading: false
    }
  },
  methods: {
    ...mapActions([
      'handleLogin',
      'getUserInfo'
    ]),
    handleSubmit ({ userName, password }) {
      this.loading = true
      this.handleLogin({ userName, password }).then(res => {
        this.$router.push({
          path: '/home'
        })
      }).finally(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style>

</style>
