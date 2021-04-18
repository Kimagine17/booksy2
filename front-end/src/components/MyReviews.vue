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
        <div class = "my-reviews">
            <h3> My Reviews: </h3>
              <div class = "review-loop" v-for="review in reviews" v-bind:key="review._id">
                <p>Review: {{review.review}}</p>
                <p>Book: {{review.book.name}}</p>
              </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
    name: 'MyReviews',
    data() {
        return {
            review: "",
            reviews: [],
        }
    },
    async created() {
        this.getReviews()
    },
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
        },
        async getReviews() {
            try {
                let response = await axios.get("/api/reviews");
                this.reviews = response.data;
                console.log(this.reviews);
            } catch(error) {
                this.$root.data.user = null;
            }
        },
        formatDate(date) {
            if (moment(date).diff(Date.now(), 'days') < 15)
                return moment(date).fromNow();
            else
                return moment(date).format('d MMMM YYYY');
        },
    }
}
</script>
