<template>
  <div class="message-alert">
    <!-- message 出現的原理在於 v-for 的 messgaes 預設為空陣列，此時使用 v-for 範圍的標籤模板都不會顯示出來
      只有觸發 updateMessage 才會 push 資料到 messages 裡此時 alert 才會顯示
    -->
    <div
      v-for="(item, i) in messages"
      :key="i"
      :class="'alert-' + item.status"
      class="alert alert-dismissible"
    >
      {{ item.message }}
      <button
        type="button"
        class="close"
        aria-label="Close"
        @click="removeMessage(i)"
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
// 註解處為原本使用event bus 的寫法，現在是使用vuex的寫法

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters(['messages']),
  },
  created() {
    // const vm = this;
    // 自定義名稱 'messsage:push'
    // message: 傳入參數
    // status: 樣式，預設值為 warning
    // vm.$bus.$on('message:push', (message, status = 'warning') => { // 使用 $on 監聽1個新的自訂方法
    // vm.updateMessage(message, status);
    // });
    // vm.$bus.$emit('message:push'); // alert 是由外部元件去觸發的，所以使用 $emit
  },
  methods: {
    // ...mapActions('updateMessage','removeMessage','removeMessageWithTiming')
    updateMessage(message, status) {
      this.$store.dispatch('updateMessage', { message, status });
      // const timestamp = Math.floor(new Date() / 1000);
      // this.messages.push({
      //     message,
      //     status,
      //     timestamp,
      // });
      // this.removeMessageWithTiming(timestamp);
      // console.log('回饋訊息資料',this.messages);
    },
    removeMessage(num) {
      this.$store.dispatch('removeMessage', num);
      // this.messages.splice(num, 1);
    },
    removeMessageWithTiming(timestamp) {
      this.$store.dispatch('removeMessageWithTiming', timestamp);
      // const vm = this;
      // setTimeout(() => {
      //     vm.messages.forEach((item, i) => {
      //     if (item.timestamp === timestamp) {
      //         vm.messages.splice(i, 1);
      //     }
      //     });
      // }, 5000);
      // },
    },
  },
};

</script>

<style scope>
.message-alert {
  position: fixed;
  max-width: 50%;
  top: 56px;
  right: 20px;
  z-index: 1100;
}
</style>
