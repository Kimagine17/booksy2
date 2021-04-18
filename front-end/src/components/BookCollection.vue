<template>
    <div class = "main">
       <section class="image-gallery">
      <div class="image" v-for="book in books" :key="book.id">
        <div class="title">
          <h2>Title: {{book.name}}</h2>
        </div>
        <div class="description">
          <h3>Description: {{book.description}}</h3>
        </div>
        <div class="bookCover">
          <router-link :to="{ name: 'Book', params: { id: book._id }}"><img :src="book.photoPath" /></router-link>
          <!-- <img :src="book.photoPath" /> -->
        </div>
        <!-- <h2>{{book.genre}}</h2> -->
        <!-- <h2>{{book.genre.name}}</h2> -->
      </div>
    </section>
    </div>
</template>

<script>
// @ is an alias to /src
export default {
  name: 'BookCollection',
  props: {
    books: Array,
  },
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
  /* border: 4px dashed red; */
}

.main-container {
  background-color: #eb7f4d;
}

.image-gallery {
  height: 100%;
}

.home {
  height: 100%;
  padding: 3%;
  padding-left: 7%; 
  padding-right: 7%;
  background-color: #eb7f4d;
  color:black;
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
  background-color: antiquewhite;
  padding: 1%;
  margin-bottom: 4%;
  /* margin-left: 20%;
  margin-right: 20%; */
  border: 4px solid #a13b0c;
}

/* Masonry */
*,
*:before,
*:after {
  box-sizing: inherit;
}
.image-gallery {
  column-gap: 1.5em;
}
.image {
  margin: 0 0 1.5em;
  display: inline-block;
  width: 100%;
  padding: 10%;
  background-color: antiquewhite;
  border: 4px solid #a13b0c;
}
.image img {
  width: 100%;
}

.title, .description, .bookCover {
  margin: 1%;
  padding-top: 1%;
  padding-bottom: 1%;
}

/* Masonry on large screens */
@media only screen and (min-width: 1024px) {
  .image-gallery {
    column-count: 4;
  }
}
/* Masonry on medium-sized screens */
@media only screen and (max-width: 1023px) and (min-width: 768px) {
  .image-gallery {
    column-count: 3;
  }
}
/* Masonry on small screens */
@media only screen and (max-width: 767px) and (min-width: 540px) {
  .image-gallery {
    column-count: 2;
  }
}
</style>


