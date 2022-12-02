<template>
    <div class="body">
        <Menu />

        <section class="vh-100">
            <div class="container py-5 h-100" style="width: 50%;">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="justify-content-center ms-auto btn btn-lg shadow border-dark">
                        <div v-if="!userLoggedIn" >
                            <h3 style="text-align: center;">Login first </h3>
                        </div>
                        <div v-else-if="getpost">
                            <h1 style="text-align: center">New Post</h1>
                            <form @submit.prevent="handleSubmit">
                                <!-- Email input -->
                                <div class="form-outline mb-4">
                                    <textarea type="text" v-model="post.content" class="form-control form-control-lg shadow" placeholder="Blog"></textarea>
                                </div>
                                <!-- Submit button -->
                                <button type="submit" class="btn btn-primary btn-lg btn-block text-light">Go</button>
                            </form>
                        </div>
                        <div v-else-if="!getpost">
                            <h3 style="text-align: center;">Not your Post</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer class="fixed-bottom"/>
    </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import Menu from '@/components/Menu.vue'
export default {  
    components: {
		Footer,
        Menu
	},	
	data() {
      return {
		submitting: false,
		error: false,
        post: {
            id:'',
            content:'',
            user_id:'',
            author:'',
            created_at:'',
            updated_at:'',
            likes:'',
        },
		user: {
			id: '', 
			name: '', 
			email: '', 
			session_id: ''
		},
      }
    },
	created: function () {
        this.getPost()
	},
    mounted() {

    },
    methods: {
        async handleSubmit(){
            this.submitting = true
            if (this.$route.params.id !== this.post.id) {
                this.$router.push('/message/8')
            }
            else if (this.post.content === '') {
                alert('Por Favor escreva algo no blog!')
            }
            else {
                await this.$store.dispatch('microposts/updateMicropost', this.post)
                this.submitting = false
                this.changeRouter()
            }
        },
        changeRouter() {
            this.$router.push('/message/1')
        },
        async getPost() {
            if (this.userLoggedIn) {
                this.post = await this.$store.getters[('microposts/getMicropost')](this.$route.params.id)
            }
        },
        checkUser (postId) {
            return postId == this.user.id
        },
        getUser() {
            this.user = this.$store.getters['user/getUser']
        }
	},
	computed: {
        userLoggedIn: function () {
            this.getUser()
            for (var i in this.user) return true
            return false
        },
        getpost: function () {
            this.getPost()
            return this.checkUser(this.post.user_id)
        }
	},
	directives: {

	},
}
</script>

<style scoped>
    .body {
        background-image: url("../assets/images/paisagem2.jpg");
        background-size: cover;
    }
</style>