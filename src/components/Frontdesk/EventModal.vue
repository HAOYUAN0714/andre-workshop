<template>
  <div 
    id="eventAlert" 
    class="modal mt-5" 
    tabindex="-1" 
    role="dialog"
  >
    <div 
      class="modal-dialog modal-max-width" 
      role="document"
    >
      <div class="modal-content ">
        <div class="modal-header bg-danger ">
          <h5 class="modal-title text-white ">本視窗 {{ seconds }} 秒後自動關閉</h5>
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
          <p class="h3 text-danger text-center"> <b>工坊歡慶10周年，8折優惠券大放送!</b> </p>
        </div>
        <div class="modal-footer">
          <button 
            class="btn btn-danger" 
            type="button" 
            data-dismiss="modal"
          >
            關閉
          </button>
          <button 
            class="btn btn-primary" 
            type="button" 
            @click.prevent="toEvent"
          >
            活動詳情
          </button>
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import $ from 'jquery';

export default {
  data(){
    return{
      show : false, // 要搭配mounted加入判別式確認資料讀取到後來自動打開modal
      seconds: 3, // 顯示剩餘秒數
    }
  },
  mounted(){
    const vm =this;
    vm.alertEvent();
  },  
  methods:{
    alertEvent(){ 
      const vm =this;
      if(!vm.show){ // 加入判別式確認資料讀取到後再自動打開modal
        $('#eventAlert').modal('show');
        vm.show = true;
        vm.closeModal();
      }
    },
    closeModal(){
      const vm =this;
      if(vm.show){ // 判斷modal為顯示狀態時，再執行非同步事件
        setTimeout(function(){
          $('#eventAlert').modal('hide');
          vm.show = false;
        },3000)
        setTimeout(function(){ // 到數 3 2 1
          vm.seconds = 2
        },1000)
        setTimeout(function(){
          vm.seconds = 1
        },2000)
      }
    },
    toEvent(){ // 點擊前往活動詳情時，將modal 關閉 否則跳轉的畫面會是modal顯示時的disabled畫面
      const vm =this;
      $('#eventAlert').modal('hide');
      vm.show = false;
      vm.$router.push('/event');
    }
  },
    
}
</script>

