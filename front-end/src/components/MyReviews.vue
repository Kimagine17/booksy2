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
        <div class="no-reviews" v-if="reviews.length===0">
            <h2>When you submit your first review, it will pop up here. You can edit, delete, and read over
                    your reviews again and again.</h2>
        </div>
        <div class="review-container" v-else>
                <h1> My Reviews: </h1>
                <div class="openEditForms" v-if="edit">
                    <div class="button">
                        <textarea class="form" @submit.prevent="editReview" v-model="reviewToEdit.review" placeholder="edit review" />
                    </div>
                    <div class="button">
                        <button class="pure-button pure-button-primary" @click="editReview">Submit</button>
                        <button class="pure-button pure-button-primary" @click="deleteReview">Delete</button>
                        <button class="pure-button pure-button-primary" @click="closeEdit">Close</button>
                    </div>
                </div>
                <div class = "my-reviews" v-else>
                    <div class = "reviews-box">
                    <div class = "review-loop" v-for="review in reviews" v-bind:key="review._id">
                        <p><strong>Review: </strong> {{review.review}}</p>
                        <p><strong>Book: </strong>{{review.book.name}}</p>
                        <button class="edit" @click="openEdit(review)">Edit / Delete</button>
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
            this.closeEdit();
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
        },
    }
}
</script>

<style scoped>
.main {
    width: 100%;
    background-color:#f8f9fc;
    height: 100%;
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
  padding: 15px;
  border-radius: 5px;
  margin: 5%;
  display: flex;
}

.review-loop {
    display: block;
    background-color:#e4eefc;
    padding: 2%;
    margin: 2%;
    border-radius: 5px;
    line-height: 1.5em;
}

.reviews-box {
    width: 60%;
    margin: auto auto auto 0%;
}

.button {
    display: flex;
}

.edit, .pure-button {
    padding: 1% 2% 1% 2%;
    margin: 2%;
    background-color: #062d62;
    color: antiquewhite;
}

.no-reviews {
    margin: 10% 20% 10% 20%;
}

.openEditForms {
    width: 90%;
    padding: 25px;
    background-color:#cfe2fd;
    margin: 30px auto;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
}

</style>