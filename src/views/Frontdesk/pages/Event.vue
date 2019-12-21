<template>
  <div class="container">
    <div class="border border-warning rounded my-4 event-border">
      <img
        src="../../../assets/images/dark/event-banner-sm.jpg"
        class="d-block w-100 img-fluid"
      >
      <div class="bg-secondary  text-white ">
        <h3 class="text-center p-3 text-warning"> <b>安德烈工坊 歡慶10周年</b> </h3>
        <div class="px-3">
          <h5><b>活動說明</b></h5>
          <h6 class="text-danger"><b>活動期間: 2019 / 9 / 26 ~ 2019 / 12 / 31</b></h6>
          <p >
            本次活動將所有商品以更實惠的價格重新上架，新的價格於活動結束後繼續沿用，不會因為活動結束而調回原價 !
            不只如此，活動期間可於本活動頁面下方免費領取8折優惠券代碼，並在購物車加入商品的總金額合計
            <b class="text-danger">滿3000</b> 時，
            即可開啟優惠券輸入功能及運費全免，輸入本頁面取得之代碼即可獲得折扣優惠。本次活動提供之代碼沒有使用次數限制，
            歡迎多多利用節省荷包。
          </p>
        </div>
        <div class="bg-dark p-3">
          <div class="text-center">
            <button
              v-if="!isCliked"
              class="btn btn-danger"
              type="button"
              @click.prevent="getCoupon"
            >
              顯示優惠代碼
            </button>
            <div
              v-if="isCliked & !codeGet"
              class="input-group"
            >
              <input
                id="codeId"
                v-model="couponCode"
                class="form-control"
                type="text"
                aria-label="Recipient's username"
                aria-describedby="button-addon2"
                disabled
              >
              <div class="input-group-append">
                <button
                  id="button-addon2"
                  :data-clipboard-text="couponCode"
                  class="btn btn-success copyBtn"
                  type="button"
                  @click="copy('.copyBtn')"
                >
                  複製代碼
                </button>
              </div>
            </div>
            <router-link
              v-if="isCliked & codeGet"
              to="/products"
              class="btn btn-danger"
              @click.prevent="getCoupon"
            >
              複製成功，繼續購物
            </router-link>
          </div>
        </div>
        <div class="bg-primary py-3">
          <div class="px-3">
            <h5 class="text-danger text-danger "><b>注意事項</b></h5>
            <ol style="line-height: 24px;">
              <li> 本次活動發配之優惠券只能於活動期間使用，請於活動結束前使用完畢 !</li>
              <li> 本次活動之優惠券代碼為官方無條件免費提供請勿轉售，違者將被追究相關法律責任 !</li>
              <li> 本公司所推出之所有相關活動，均得視實際情況，保留活動終止及修改之權利，內容異動均以活動網頁與官網公告為準。</li>
              <li> 活動開始後，所有參與活動之消費者視同同意最後公告之內容。</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Clipboard from 'clipboard'; // 註冊clipboard.js套件複製剪貼簿

export default {
  data() {
    return {
      isCliked: false,
      codeGet: false, // 確認是否已點擊複製
      couponCode: 'LOL-10years-LOL-ShupUpAndGiveMeTheMoney', // 優惠碼
    };
  },
  methods: {
    getCoupon() {
      const vm = this;
      vm.isCliked = true;
    },
    copy(bind) { // bind為綁定className或id 用來註冊copy按鈕
      const vm = this;
      const clipboard = new Clipboard(bind); // 給予綁定按鈕作為實現複製功能套件的目標
      console.log(clipboard);
      vm.codeGet = true;
    },
  },
};
</script>

<style lang="css">
  .event-border{
    border-width: 10px !important;
  }
</style>
