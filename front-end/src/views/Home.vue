<template>
  <div class="home">
    <div class="heading">
    <div class="heading1">
      <h1> Welcome to Booksy! </h1> 
    </div>
    <div class="heading2">
      <h4> Browse below to find your favorite books. Click on a book cover to see its reviews and add one of your own! </h4> 
    </div>
    </div>
    <BookCollection :books="books" />
  </div> <!--home-->
</template>

<script>
import axios from 'axios';
import BookCollection from '@/components/BookCollection.vue';
export default {
  name: 'Home',
  data () {
    return {
      books: [],
      error: '',
    }
  },
  components: {
    BookCollection,
  },
  created() {
    this.getBooks();
  },
  methods: {
    async getBooks() {
      try {
        let response = await axios.get("/api/books");
        this.books = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
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

body {
  height: 100%;
  width: 100%;
}

.home {
  height: 100%;
  padding: 3%;
  padding-left: 7%; 
  padding-right: 7%;
  /* background-color: #eb7f4d; */
  background-color: antiquewhite;
  color: #311204;
;
}

.heading1, .heading2 {
  text-align: center;
  padding-left: 20%;
  padding-right: 20%;
  margin-bottom: 2%;
  font-size: 1.3em; 
}

.heading1 {
  margin-top: 2%;
}

.heading {
  background-color: #eb7f4d;
  border-radius: 5px;
  padding: 1%;
  margin-bottom: 4%;
}

.image img {
  width: 100%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {

}
/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {

}
/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {

}
</style>

