<template>
    <div class="background">
        <Menu />
        <section class="vh-100">
            <div class="container py-5 h-100" style="width: 50%;">
                <div class="row d-flex align-items-center justify-content-center h-100">
                    <div class="justify-content-center ms-auto btn btn-lg shadow border-dark">
                        <div id="post-form" class="container">
                            <div v-if="!userLoggedIn">
                                <h3 style="text-align: center;" class="text-danger">Login first </h3>
                            </div>
                            <div v-else-if="!getpost">
                                <h1 style="text-align: center">Comment Post</h1><br><br>
                                <form @submit.prevent="handleSubmit">
                                    <div class="form-group">
                                        <textarea class="form-control" rows="5" ref="first"
                                                  placeholder="Please enter at least 10 characters"
                                                  :class="{ 'has-error': submitting && invalidContent }" v-model="comment.content"
                                                  v-autofocus>
                                        </textarea>
                                    </div>
                                    <p v-if="error && submitting" class="alert alert-warning">
                                        fill out all required fields with valid data
                                    </p>
                                    <p style="float:left;"><button @click="cancel()" class="btn btn-warning">Cancel</button></p>
                                    <p style="float:right;"><button type="submit" class="btn btn-primary">Comment Post</button></p>

                                </form>
                            </div>
                            <div v-else>
                                <h3 style="text-align: center;" class="text-danger">Your Post, Can't Comment</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <Footer />
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
            comment: {
                content: '',
            },
            micropost: {
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

    },
    mounted() {
        this.getUser()
        this.getPost()
    },
    methods: {
        handleSubmit() {
            this.submitting = true
            if (this.$route.params.id !== this.micropost.id) {
                this.submitting = false
                this.$router.push('/message/9')
            }
            else if (this.invalidContent) {
                this.error = true
                return
            }
            else {
                this.commentPost(this.comment)
            }
        },
        commentPost(comment) {
            const data = {
                post: comment,
                session_id: this.user.session_id,
                post_id: this.micropost.id
            }
            this.$store.dispatch('comments/addComment', data)
            this.$router.push('/message/7')
        },
        cancel() {
            this.$router.push('/')
        },
        getUser() {
            this.user = this.$store.getters['user/getUser']
        },
        async getPost() {
            if (await this.$store.dispatch('microposts/getMicroposts')) {
                this.micropost = this.$store.getters[('microposts/getMicropost')](this.$route.params.id)
            }
        },
        checkUser (postId) {
            return postId == this.user.id
        },
    },



    computed: {
        invalidContent: function () {
            if (this.comment.content === '' || this.comment.content.length < 10 || this.comment.content.match(/<svg\/onload|<svg onload|<script>/g) != null) return true
            else return false
        },

        userLoggedIn: function () {
            this.getUser()
            for (var i in this.user) return true
            return false
        },
        getpost: function () {
            this.getPost()
            return this.checkUser(this.micropost.user_id)
        }
    },
    directives: {
        autofocus: {
            inserted(el) {
                el.focus()
            }
        }
    },
}
</script>

<style scoped>

.background {
    background-image: url("../assets/images/paisagem3.jpg");
    background-size: cover;
}

#post-form {
    margin: 0 auto;
    max-width: 800px;
}

form {
    margin-bottom: 20rem;
}

input.has-error,
input.has-error:hover,
input.has-error:focus,
input.has-error:active,
select.has-error,
select.has-error:hover,
select.has-error:focus,
select.has-error:active,
textarea.has-error,
textarea.has-error:hover,
textarea.has-error:focus,
textarea.has-error:active {
    border: 1px solid #d33c40;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 6px #f4cecf;
}

input.is-success,
input.is-success:hover,
input.is-success:focus,
input.is-success:active,
select.is-success,
select.is-success:hover,
select.is-success:focus,
select.is-success:active,
textarea.is-success,
textarea.is-success:hover,
textarea.is-success:focus,
textarea.is-success:active {
    border: 1px solid #29de7d;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.1), 0 0 6px #97efc0;
}
</style>