<template>
    <div class = "main">
        <div class = "account-header">
            <div class="header-elements">
                <div class ="welcome-announcement">
                    <p>Welcome {{user.firstName}}!</p>
                </div>
                <div class = "welcome-announcement">
                    <button class="logout" @click="logout">Logout</button>
                </div>
            </div>
        </div>
        <div class="review-container">
            <h1> My Reviews: </h1>
            <div class = "my-reviews">
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

<style scoped>
.main {
    width: 100%;
}

.account-header {
    display: flex;
    justify-content: right;
    text-align: right;
    background-color:#cfe2fd;
    padding-top: 1%;
    padding-bottom: 1%;
}

.header-elements {
    width: 25%;
    margin-left: auto;
    display: flex;
    justify-content: center;
}

.welcome-announcement {
    padding: 1% 2% 1% 4%;
    color: #062d62;
    margin-top: auto;
    margin-bottom: auto;
}

.logout {
    padding: 6%;
    background-color: #062d62;
    color: antiquewhite;
    margin: auto;
}

.review-container {
    width: 90%;
    margin: 5% auto auto auto;
}

.my-reviews {
  background-color:#cfe2fd;
  /* border: 2px solid #062d62; */
  padding: 15px;
  margin: 5%;
  display: flex;
}

.review-loop {
    display: block;
}

</style>