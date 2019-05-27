<template>
    <div class="post-view-page">
        <div class="post-view">
            <post-view v-if="post" :post="post"/>
            <p v-else>게시글 불러오는중...</p>
            <router-link :to="{ name: 'PostListPage' }">목록</router-link>
        </div>
    </div>

</template>

<script>
import { mapActions,mapState } from 'vuex'
import PostView from '@/components/PostView'
export default {
    name: 'PostViewPage',
    methods: {
        ...mapActions([ 'fetchPost' ])
    },
    computed: {
        ...mapState(['post'])
    },
    props: {
        postId: {
            type: String,
            required: true
        }
    },
    created(){
        this.fetchPost(this.postId)
            .catch(err => {
                alert(err.response.data.msg)
                this.$router.back()
            })
    },
    components: { PostView },
}
</script>
