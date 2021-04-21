<template>
<div class = "book-vue">
  <h1> More About <em>{{book.name}}</em></h1>
  <div class = "main-container">
    <div class="content1">
      <div class="book" v-if="book">
        <div class="info1">
          <div class="info-item1">
            <h2>{{book.name}}</h2>
          </div>
          <div class="info-item1">
            <p>By: {{book.author}}</p>
          </div>
        </div>
        <div class="cover">
          <img :src="book.photoPath" width=100%/>
        </div>
        <div class="info2">
          <div class="info-item2"> 
            <p><em>Genre: </em>{{book.genre.name}}</p>
          </div>
          <div class="info-item2">
            <p>Description: {{book.description}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="all-reviews">
        <div class="add-reviews" v-if="user">
          <form class="form" @submit.prevent="submitReview">
            <h4>Add your own review:</h4>
              <input placeholder="add review" v-model="review">
              <button class="pure-button pure-button-primary">Submit</button>
          </form>
        </div> 
        <div class="add-reviews" v-else>
          <p>Login to add your own review</p>
        </div>
        <div class="display-reviews"> 
          <h3> Reviews: </h3>
          <div class = "review-loop" v-for="review in reviews" v-bind:key="review._id">
            <p>{{review.review}}</p>
            <p> &nbsp;—{{review.user.username}}, {{formatDate(review.created)}}</p>
          </div>
          <div class="no-reviews" v-if="reviews.length===0">
            <p>No reviews? Be the first!</p>
            </div>
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
      let response = await axios.get("/api/books/book/" + this.$route.params.id);
      this.book = response.data;
      } catch (error) {
      this.error = error.response.data.message;
      }
    },
    async getReviews() {
      try {
        let response = await axios.get("/api/reviews/" + this.$route.params.id);
        this.reviews = response.data;
                console.log(this.reviews);

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
      this.review = "";
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
.body {
    background-color: #faebd7;
}
.book-vue {
  padding: 30px;
  line-height: 1.5em;
  background-color: #faebd7;

}
.main-container {
    height: 100%;
    width: 100%;
    align-content: center;
}
.content1 {
  margin: 20px;
  display: inline-block;
  width: 90%;
  padding: 2%;
}
.content {
  margin: 20px;
  display: inline-block;
  width: 90%;
  padding: 2%;
}
.book {
  background-color: #eb7f4d;
  padding: 15px;
  border-radius: 5px;
}
.all-reviews {
  background-color:#93b0d8;
  border-radius: 5px;
  padding: 15px;
}
.cover {
  width: 70%;
  margin: 15px auto;
}

.info1 {
  background-color: #F3B592;
  border-radius: 5px;
  margin: 15px 15px;
  padding: 15px 0px;
}

.info-item1 {
  text-align: center;
}

.info2 {
  margin: 15px 15px;
  padding: 10px 10px;
  background-color: #F3B592;
}
.info-item {
  line-height: 1.25em;
  padding-top: 1.5%;
  padding-bottom: 1%;
}

.add-reviews {
  margin: 10px;
  padding: 5%;
  margin: 3%;
  background-color: #cfe2fd;
  border-radius: 5px;
}

.display-reviews{
  padding: 2%;  
  margin: 3%;
  background-color: #cfe2fd;
  border-radius: 5px;
}
.review-loop {
  margin: 20px 5px;
  padding: 2%;
  background-color:#e4eefc;
  border-radius: 5px;
}
@media only screen and (min-width: 600px) {
  .main-container {
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
  } 
  .content{
    width: 48%;
  }
  .content1{
    width: 48%;
    max-width: 400px;
  }
}
</style>