<template>
	<div>
		<Menu />
        <Home />
		<!-- BEGIN MICROPOSTS -->
            <div v-for="micropost in microposts" :key="micropost.id" class="container w-75">
                <div class="container mt-5" id="section1">
                    <div class="card">
                        <h5 class="card-header">
                            <span>Autor: {{micropost.name}}</span>
                        </h5>
                        <div><p v-html="micropost.content" class="row" style="margin-left:0.1rem"></p></div>
                        <div v-if="userLoggedIn && checkPost(micropost.user_id)">
                            <router-link :to="'/updatePost/'+micropost.id" class="active btn btn-danger">Update Post</router-link>
                        </div>
                        <div v-else-if="userLoggedIn && !checkPost(micropost.user_id)">
                            <router-link :to="'/commentPost/'+micropost.id" class="active btn btn-warning">Post Comment</router-link>
                        </div>
                        <div class="card-footer">
                            <small class="text-muted">Created At: {{micropost.created_at}}</small> <br>
                            <small class="text-muted"> Updated: {{micropost.updated_at}}</small>
                            <hr>
                            <div v-if="micropost.id != show">
                                <button  v-on:click="getComments(micropost.id)" class="btn btn-primary">Show Comments</button>
                            </div>
                            <div v-if="micropost.id == show">
                                <h3>Comentarios</h3><hr><br>
                            </div>
                            <div v-for="comment in comments" :key="comment.id" class="container">
                                <div v-if="comment.micropost_id === micropost.id" class="container">
                                    Created at: {{comment.created_at}}<br>
                                    {{comment.name}}: {{comment.content}}<br>
                                    <hr>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		<!-- END MICROPOSTS -->
		<Footer />
	</div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'
import Home from '@/views/Home.vue'

export default {
	components: {
        Home,
		Footer,
        Menu
	},
	data() {
		return {
			microposts: [],
			comments: [],
			user: {
				id: '', 
				name: '',
				email: '', 
				session_id: ''
			},
			show: '',
		}
	},
    //serve para usar os metodos
	mounted() {
        this.getPosts()
        if (this.userLoggedIn) {
            this.getUsers()
        }
	},
    //cria os metodos
	methods: {
		async getPosts() {
            if (await this.$store.dispatch('microposts/getMicroposts')) {
                this.microposts = this.$store.getters[('microposts/getMicroposts')]
            }
        },
        getUsers() {
            this.user = this.$store.getters['user/getUser']
        },
        checkPost (postId) {
            return postId === this.user.id
        },
        async getComments(postId) {
            if (await this.$store.dispatch('comments/getComments')) {
                this.comments = this.$store.getters[('comments/getPostComments')](postId)
            }
            this.show = postId
        }
	},
	computed: {
        userLoggedIn: function () {
            this.getUsers()
            for (var i in this.user) return true
            return false
        },
	}
}
</script>

<style scoped>

</style>