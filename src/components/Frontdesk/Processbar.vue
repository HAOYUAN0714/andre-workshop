<template>
  <div class="my-4">
    <h1 class="text-warning text-center">結帳流程</h1>
    <div class="row">
      <div class="col-md-4">
        <div
          :class="{'bg-primary' :process === 'fillInfo','text-white' : process === 'fillInfo'}"
          class="alert process-bg text-center alert-rounded "
          role="alert"
        >
          1. 填寫資料
        </div>
      </div>
      <div class="col-md-4">
        <div
          :class="{'bg-primary':process === 'checkOrder','text-white' : process === 'checkOrder'}"
          class="alert process-bg text-center alert-rounded "
          role="alert"
        >
          2. 確認訂單
        </div>
      </div>
      <div class="col-md-4">
        <div
          :class="{'bg-primary':process === 'pay','text-white' : process === 'pay'}"
          class="alert process-bg text-center alert-rounded "
          role="alert"
        >
          3. 完成付款
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    process: {
      default: '',
      type: String,
    },
  },
};
</script>
