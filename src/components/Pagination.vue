<template>
  <div>
    <div class="row d-flex justify-content-center mt-5">
      <div class="col-md-4">
        <div class="justify-content-center d-flex ">
          <nav aria-label="Page navigation example">
            <ul class="pagination">
              <li
                :class="{'disabled': !paginationProp.has_pre}"
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Previous"
                  @click.prevent="updatePage(paginationProp.current_page -1 )"
                >
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li
                v-for="page in paginationProp.total_pages"
                :key="page"
                :class="{'active':paginationProp.current_page === page}"
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  @click.prevent="updatePage(page)"
                >
                  {{ page }}
                </a>
              </li>
              <li
                :class="{'disabled': !paginationProp.has_next}"
                class="page-item"
              >
                <a
                  class="page-link"
                  href="#"
                  aria-label="Next"
                  @click.prevent="updatePage(paginationProp.current_page + 1)"
                >
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    paginationProp: {
      default() {
        return {};
      },
      type: Object,
    },
  },
  methods: {
    // 分頁數由後端回傳過來，我們主要處理的是 api 請求需藉由改變 query 參數 page 的值來切換請求獲取不同分頁顯示的內容
    updatePage(page) {
      this.$emit('emit-update-page', page);
    },
  },
};
</script>
