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
                <button class="edit" @click="openEdit(review)">Edit Review</button>
              </div>
              <div class="openEditForms" v-if="edit">
                  <div class="button">
                    <form class="form" @submit.prevent="editReview">
                    <input placeholder="edit review" v-model="reviewToEdit.review">
                    <button class="pure-button pure-button-primary">Submit</button>
                    </form>
                  </div>
                  <div class="button">
                    <button class="pure-button pure-button-primary" @click="deleteReview">Delete</button>
                  </div>
                  <div class="button">
                    <button class="pure-button pure-button-primary" @click="closeEdit">Close</button>
                  </div>
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
            edit: false,
            reviewToEdit: null,
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
        openEdit(review) {
            this.edit = true;
            this.reviewToEdit = review;
        },
        async editReview() {
            try {
                await axios.put("/api/reviews/" + this.reviewToEdit._id, {
                review: this.reviewToEdit.review,
                });
                this.getReviews();
            } catch (error) {
                this.error = error.response.data.message;
            }
            this.review = "";
        },
        closeEdit() {
            this.edit = false;
            this.reviewToEdit = null;
        },
        async deleteReview() {
            try {
                await axios.delete("/api/reviews/" + this.reviewToEdit._id);
            } catch (error) {
                this.error = error.response.data.message;
            }
            this.getReviews();
            this.closeEdit();
        }
    }
}
</script>
