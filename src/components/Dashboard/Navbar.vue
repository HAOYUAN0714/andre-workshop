<template>
  <div>
    <nav class="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        class="navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
      >
        電商後台
      </a>
      <input
        class="form-control form-control-dark w-100"
        type="text"
        placeholder="Search"
        aria-label="Search"
      >
      <ul class="navbar-nav px-3">
        <li class="nav-item text-nowrap">
          <a
            class="nav-link"
            href="#"
            @click.prevent="signOut"
          >
            登出
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  methods: {
    signOut() {
      const apiPath = process.env.VUE_APP_APIPATH; // 表示從config/dev.env.js裡的APIPATH變數
      const api = `${apiPath}/logout`; // 使用logout api
      // API 伺服器路徑
      // 申請的 API path
      this.$http.post(api).then((response) => { // 登出不需傳送 user 去驗證 username 和 password
        console.log(response.data);
        if (response.data.success) { // 當登出成功時，success 會是true
          alert('登出成功');
          this.$router.push('/login'); // 登出成功後，頁面跳轉至登入頁
        }
      });
    },
  },
};
</script>
