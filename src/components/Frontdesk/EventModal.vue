<template>
  <div
    id="eventAlert"
    class="modal mt-5"
    tabindex="-1"
    role="dialog"
  >
    <div
      class="modal-dialog  modal-max-width"
      role="document"
    >
      <div class="modal-content ">
        <div class="modal-header bg-white border-0 p-0 pr-3 pt-3">
          <h5 class="modal-title text-warning font-weight-bold "></h5>
          <button
            class="close"
            type="button"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <p class="h3 text-danger text-center text-shadow"> <b>工坊歡慶10周年，8折優惠券大放送!</b> </p>
          <div class="d-flex justify-content-center align-items-center">
            <img class="modal-img" src="../../assets/images/dark/modal-img.png">
          </div>
        </div>
        <div class="modal-footer border-0 p-0"
          style="height:48px"
        >
          <!-- <button
            class="btn btn-danger"
            type="button"
            data-dismiss="modal"
          >
            關閉
          </button> -->
          <button
            class="btn btn-danger modal-button-set"
            type="button"
            data-dismiss="modal"
          >
            <i class="fas fa-share-square mr-1"/>待會自行前往
          </button>
          <button
            class="btn btn-primary modal-button-set"
            type="button"
            @click.prevent="toEvent"
          >
            <i class="fas fa-glass-cheers mr-1"/>前往活動詳情
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      show: false, // 要搭配mounted加入判別式確認資料讀取到後來自動打開modal
    };
  },
  mounted() {
    const vm = this;
    vm.alertEvent();
  },
  methods: {
    alertEvent() {
      const vm = this;
      if (!vm.show) { // 加入判別式確認資料讀取到後再自動打開modal
        $('#eventAlert').modal('show');
      }
    },
    toEvent() { // 點擊前往活動詳情時，將modal 關閉 否則跳轉的畫面會是modal顯示時的disabled畫面
      const vm = this;
      $('#eventAlert').modal('hide');
      vm.show = false;
      vm.$router.push('/event');
    },
  },
};
</script>
