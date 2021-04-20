<template>
    <div class = "main">
       <section class="image-gallery">
      <div class="image" v-for="book in books" :key="book.id">
        <div class="info1">
            <div class="title">
              <h2>{{book.name}}</h2>
            </div>
            <div class="author">
              <p>By: {{book.author}}</p>
            </div>
        </div>
        <div class="bookCover">
          <router-link :to="{ name: 'Book', params: { id: book._id }}"><img :src="book.photoPath" /></router-link>
          <!-- <img :src="book.photoPath" /> -->
        </div>
        <div class="info2">
          <div class="description">
            <h3>{{book.description}}</h3>
          </div>
          <div class="description">
            <p><em>genre: </em>{{book.genre.name}}</p>
          </div>
          <!-- <div class="review">
            <p><em>Most recent review:</em></p>
          </div> -->
        </div>
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

.image-gallery {
  height: 100%;
}

.info1 {
  padding: 10px;
  border: dashed 2px #a13b0c;
  justify-content: center;
  text-align: center;
}
.info2 {
  padding: 10px;
  border: dashed 2px #a13b0c;
  justify-content: center;
  text-align: center;
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
  background-color: #eb7f4d;
  /* border: 4px solid #a13b0c; */

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


