<template>
    <div class = "main-container">
        <div class = "book-container">
            <div class="book" v-if="book">
                <img :src="book.photoPath" width=20%;/>
            <!-- <h2> Photo Details: {{photo}} </h2> -->
            <h2> Title: {{book.title}} </h2>
            <h2> Description: {{book.description}} </h2>
            <h2> Created by {{book.user.username}} on {{book.created}} </h2>
            <div class="reviewing" v-if="user">
              <form class="form" @submit.prevent="submitReview">
                  <input placeholder="add review" v-model="review">
                  <button class="pure-button pure-button-primary">Submit</button>
              </form>
            </div> 
            <div class="all-reviews"> 
              <h3> Comments: </h3>
              <div class = "review-loop" v-for="review in reviews" v-bind:key="review._id">
                <p>{{review.review}}</p>
                <p>{{review.user.username}}, {{formatDate(review.created)}}</p>
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
  name: 'Review',
  data() {
    return {
      title: '',
      date: '',
      user: null,
      description: '',
      book: null,
      review: '',
      reviews: [],
    }
  },
  async created() {
      this.getBook();
      this.getReviews();
      try {
        let response = await axios.get("/api/users");
        this.user = response.data.user;
      } catch (error) {
        this.error = error.response.data.message;
      }
  },
  methods: {
    async getBook() {
      try {
      console.log("this.$route.params.id: " + this.$route.params.id);
      let response = await axios.get("/api/books/" + this.$route.params.id);
      this.book = response.data;
      console.log("this.book: " + this.book);
      } catch (error) {
      this.error = error.response.data.message;
      }
    },
    async getReviews() {
      try {
        let response = await axios.get("/api/reviews/" + this.$route.params.id);
        this.reviews = response.data;
      } catch(error) {
        this.$root.data.user = null;
      }
    },
    async submitReview() {
      try {
        await axios.post("/api/reviews/" + this.$route.params.id, {
          review: this.review,
        });
        this.getReviews();
      } catch (error) {
        this.error = error.response.data.message;
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

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: Arial, Helvetica, sans-serif;
} 

.main-container {
    height: 100%;
    width: 100%;
    border: 1px solid white;
}

.photo-container {
    margin-left: auto;
    margin-right: auto;
    margin-top: 100px;
    /* border: 4px solid blue; */
}

.photo {
    justify-content: center;
    text-align: center;
}

</style>