<template>
  <div class="hello">
    <a href="#" @click.prevent="signOut">登出</a>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
  signOut(){
      const apiPath = process.env.VUE_APP_APIPATH ; // 表示從config/dev.env.js裡的APIPATH變數
      const api = `${apiPath}/logout` ; // 使用logout api
      const vm =this ;
      // API 伺服器路徑
      // 申請的 API path
      this.$http.post(api).then((response) => { // 登出不需傳送 user 去驗證 username 和 password 
        console.log(response.data);
        if(response.data.success){ // 當登出成功時，success 會是true
            alert('登出成功');
            this.$router.push('/login'); // 登出成功後，頁面跳轉至登入頁
        }
      })     
    } 
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
