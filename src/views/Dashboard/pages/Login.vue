<template>
  <form
    class="form-signin"
    @submit.prevent="signIn"
  >
    <h1 class="h3 mb-3 font-weight-normal">Please sign in</h1>
    <label
      class="sr-only"
      for="inputEmail"
    >
      Email address
    </label>
    <input
      id="inputEmail"
      v-model="user.username"
      class="form-control"
      type="email"
      placeholder="Email address"
      required
      autofocus
    >
    <label
      for="inputPassword"
      class="sr-only"
    >
      Password
    </label>
    <input
      id="inputPassword"
      v-model="user.password"
      class="form-control"
      type="password"
      placeholder="Password"
      required
    >
    <div class="checkbox mb-3">
      <label>
        <input
          type="checkbox"
          value="remember-me"
        >
        Remember me
      </label>
    </div>
    <button
      class="btn btn-lg btn-primary btn-block"
      type="submit"
    >
      Sign in
    </button>
    <p class="mt-5 mb-3 text-muted">&copy; 2017-2019</p>
  </form>
</template>

<script>
export default {
  name: 'HelloWorld',
  data() {
    return {
      user: {
        username: '',
        password: '',
      },
    };
  },
  methods: {
    signIn() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const api = `${apiPath}/admin/signin`; // 使用login + 在後端增加session 的api
      const vm = this;
      // API 伺服器路徑
      // 申請的 API path
      this.$http.post(api, vm.user).then((response) => { // 使用post傳送 user 去驗證 username 和 password
        console.log(response.data);
        if (response.data.success) { // 當登入成功時，success 會是true
          alert('登入成功');
          this.$router.push('/admin'); // 登入成功後，頁面跳轉至首頁
        } else {
          alert('登入失敗');
        }
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="css" scoped>
html{
  background-color: #f5f5f5;
}

body {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-align: center;
  align-items: center;
  padding-top: 40px;
  padding-bottom: 40px;
  background-color: #f5f5f5;
  height: 100%;
}

.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}
.form-signin .checkbox {
  font-weight: 400;
}
.form-signin .form-control {
  position: relative;
  box-sizing: border-box;
  height: auto;
  padding: 10px;
  font-size: 16px;
}
.form-signin .form-control:focus {
  z-index: 2;
}
.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}
.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
