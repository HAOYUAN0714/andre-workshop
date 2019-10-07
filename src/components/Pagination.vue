<template>
    <div>
        <div class="row d-flex justify-content-center mt-5">
            <div class="col-md-4">        
                <div class="justify-content-center d-flex ">
                    <nav aria-label="Page navigation example">
                        <ul class="pagination">
                            <li class="page-item" :class="{'disabled': !paginationProp.has_pre}">
                            <a class="page-link" href="#" aria-label="Previous" @click.prevent='updatePage(paginationProp.current_page -1 )'>
                                <span aria-hidden="true">&laquo;</span>
                            </a>
                            </li>
                            <li class="page-item"  v-for="page in paginationProp.total_pages"  :key="page" :class="{'active':paginationProp.current_page === page}"><a class="page-link" href="#" @click.prevent='updatePage(page)'>{{page}}</a></li>
                            <li class="page-item" :class="{'disabled': !paginationProp.has_next}">
                            <a class="page-link" href="#" aria-label="Next" @click.prevent='updatePage(paginationProp.current_page + 1)'>  
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
    props:{
        paginationProp:{},
    },
    methods:{
        updatePage(page){
            this.$emit('emit-update-page',page)  
        }
    },

    
}
</script>