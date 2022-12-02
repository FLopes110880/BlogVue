<template>
    <div class="fixed-top">
        <nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
                <div class="container-fluid">
                    <ul class="navbar-nav">
                        <li class="nav-item">
                            <span class="mx-2">Blog Wallpaper</span>
                        </li>
                    </ul>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse justify-content-end" id="navbarNavDropdown">
                        <ul class="navbar-nav">
                            <li class="nav-item">
                                <router-link class="nav-link active" aria-current="page" to="/microposts">{{menu1}}</router-link>
                            </li>
                            <li v-if="!userLoggedIn" class="navbar-nav">
                                <router-link class="nav-link active" aria-current="page" to="/login">{{menu2}}</router-link>
                            </li>
                            <li v-else class="nav-item">
                                <router-link class="nav-link active" to="/post">{{menu5}}</router-link>
                            </li>
                            <li v-if="!userLoggedIn" class="nav-item">
                                <router-link class="nav-link active" to="/register">{{menu3}}</router-link>
                            </li>
                            <li v-else class="nav-item">
                                <router-link class="nav-link active" to="/logout">{{menu4}}</router-link>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link active">{{welcome}}</a>
                            </li>
                        </ul>
                    </div>
                </div>
        </nav>
    </div>
</template>

<script>

export default {
	data() {
		return {
            menu1: "Home",
            menu2: "Login",
            menu3: "Register",
            menu4: "Logout",
            menu5: "Post Blog",
            welcome: "Welcome",

			user: {
				id: '', 
				name: '', 
				email: '', 
				session_id: ''
			},
		}
	},
	mounted() {
        this.helloUser()
	},
    methods: {
        helloUser() {
            if (this.userLoggedIn) {
                this.welcome = this.welcome.concat(" " + this.user.name)
            }
        },
        getUser() {
            this.user = this.$store.getters['user/getUser']
        },
	},
	computed: {
        userLoggedIn: function () {
            this.getUser()
            for (var i in this.user) {
                return true
            }
            return false
        },
	}
}
</script>

<style scoped>

</style>