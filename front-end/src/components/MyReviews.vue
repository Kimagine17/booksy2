<template>
    <div class = "main">
        <div class = "account-header">
            <div class = "welcome-announcement">
                <p>Welcome {{user.firstName}}!</p>
            </div>
            <div class = "welcome-announcement">
                <button class="logout" @click="logout">Logout</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: 'MyReviews',
    // data() {

    // },
    computed: {
        user() {
            return this.$root.$data.user;
        }
    },
    methods: {
        async logout() {
            try {
            await axios.delete("/api/users");
            this.$root.$data.user = null;
            } catch (error) {
                this.$root.$data = null;
            }
        }
    }
}
</script>
