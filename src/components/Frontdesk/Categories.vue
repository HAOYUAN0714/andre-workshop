<template>
  <div>
    <section class="row">
      <div class="col-md-6 mt-4">
        <router-link
          :to="{ path: '/products', query: { category: filterCategories[2] } }"
          class="text-white"
          style="text-decoration:none"
        >
          <div class="bg-cover  bg-hunter-suit ">
            <div class="title-space  text-center font-weight-bold">
              <h3
                class="title-none"
                style="line-height: 300px;"
              >
                {{ filterCategories[2] }}
              </h3>
            </div>
            <div class="bg-cover bg-category bg-hunter-change">
              <div class="hover-color"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 mt-4">
        <router-link
          :to="{ path: '/products', query: { category: filterCategories[1] } }"
          class="text-white"
          style="text-decoration:none"
        >
          <div class="bg-cover  bg-soul-armor">
            <div class="title-space  text-center font-weight-bold">
              <h3
                class="title-none"
                style="line-height: 300px;"
              >
                {{ filterCategories[1] }}
              </h3>
            </div>
            <div class="bg-cover bg-category bg-armor-change">
              <div class="hover-color"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 mt-4">
        <router-link
          :to="{ path: '/products', query: { category: filterCategories[3] } }"
          class="text-white"
          style="text-decoration:none"
        >
          <div class="bg-cover bg-hunter-weapon">
            <div class="title-space  text-center font-weight-bold">
              <h3
                class="title-none"
                style="line-height: 300px;"
              >
                {{ filterCategories[3] }}
              </h3>
            </div>
            <div class="bg-cover bg-category bg-hunter-weapon-change">
              <div class="hover-color"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 mt-4">
        <router-link
          :to="{ path: '/products', query: { category: filterCategories[5] } }"
          class="text-white"
          style="text-decoration:none"
        >
          <div class="bg-cover  bg-soul-weapon">
            <div class="title-space  text-center font-weight-bold">
              <h3
                class="title-none"
                style="line-height: 300px;"
              >
                {{ filterCategories[5] }}
              </h3>
            </div>
            <div class="bg-cover bg-category bg-soul-weapon-change">
              <div class="hover-color"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 mt-4">
        <router-link
          :to="{ path: '/products', query: { category: filterCategories[4] } }"
          class="text-white"
          style="text-decoration:none"
        >
          <div class="bg-cover bg-items">
            <div class="title-space  text-center font-weight-bold">
              <h3
                class="title-none"
                style="line-height: 300px;"
              >
                {{ filterCategories[4] }}
              </h3>
            </div>
            <div class="bg-cover bg-category bg-items-change">
              <div class="hover-color"></div>
            </div>
          </div>
        </router-link>
      </div>
      <div class="col-md-6 mt-4">
        <router-link
          :to="{ path: '/products', query: { category: filterCategories[0] } }"
          class="text-white"
          style="text-decoration:none"
        >
          <div class="bg-cover bg-shield">
            <div class="title-space  text-center font-weight-bold">
              <h3
                class="title-none"
                style="line-height: 300px;"
              >
                {{ filterCategories[0] }}
              </h3>
            </div>
            <div class="bg-cover bg-category bg-shield-change">
              <div class="hover-color"></div>
            </div>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters('productsModules', ['allProducts']),
    filterCategories() { // 取得所有類別
      const vm = this;
      // 得到只有分類名稱的陣列
      const categoryArray = vm.allProducts.map((item) => (item.category));
      return categoryArray.filter((item, index, array) => array.indexOf(item) === index); // 過濾重複類別
    },
  },
};
</script>
