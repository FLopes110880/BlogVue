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
                        <div v-else>
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
            content: '',
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

	},
	
	methods: {
        async handleSubmit(){
            this.submitting = true
            if (this.post.content === '') {
                alert('Por Favor escreva algo no blog!')
            }
            else {
                await this.$store.dispatch('microposts/addMicropost', this.post)
                this.changeRouter()
            }
        },
        changeRouter() {
            this.$router.push('/message/3')
        },
	},
	
	computed: {
        userLoggedIn: function () {
            let user =  this.$store.getters['user/getUser']
            for (var i in user) return true
            return false
        },
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