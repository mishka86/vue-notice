<template>
    <div class="comment-item">
        <strong>{{ comment.user.name }}</strong><span>{{ comment.createdAt }}</span>
        <div v-if="isEditing">
            <textarea v-model="editMessage" rows="3"></textarea>
            <button @click="onEdit">수정완료</button>
        </div>
        <p v-else>{{ comment.contents }}</p>
        <ul v-if="isMyComment">
            <li><button type="button" @click="toggleEditMode">{{editButtonText}}</button></li>
            <li><button type="button" @click="onDelete">삭제</button></li>
        </ul>

    </div>
</template>


<script>
import { mapState, mapGetters } from 'vuex'


export default {
    name: 'CommentItem',
    data() {
        return {
            isEditing: false,
            editMessage: ''
        }
    },
    methods:{
        toggleEditMode() {
            this.isEditing = !this.isEditing
            if(this.isEditing){
                this.editMessage = this.comment.contents
            }
        },
        onEdit(){
            if(this.isvalidComment){
                this.isEditing = false
                const{id} = this.comment
                this.$emit('edit',{id,comment:this.editMessage})
            }else{
                alert('댓글은 1자이상 255자 이하여야 합니다.')
            }
        },
        onDelete(){
            const {id} = this.comment 
            this.$emit('delete', id)
        }
    },
    props: {
        comment: {
            type: Object,
            required:true,
            validator(comment){
                const idValidCommentId = typeof comment.id === 'number'
                const isValidContents = comment.contents && comment.contents.length
                const isValidUser = !!comment.user
                return idValidCommentId && isValidContents && isValidUser
            }
        }
    },
    computed: {
        ...mapState(['me']),
        ...mapGetters(['isAuthorized']),
        isMyComment(){
            return this.isAuthorized && this.comment.user.id === this.me.id 
        },
        editButtonText(){
            return this.isEditing ? '수정 취소' : '수정'
        },
        isvalidComment(){
            return this.editMessage.length > 0 && this.editMessage.length < 256
        }
    }
}
</script>