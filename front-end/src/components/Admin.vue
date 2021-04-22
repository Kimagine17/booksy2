<template>
<div class = "admin">
  <h1>Admin: </h1>
    <!-- Genre -->
    <div class="set">
      <h2>Genres</h2>
      <div class="inputField-container">
        <div class="inputField">
          <div class="heading">
            <h3>Add a Genre</h3>
          </div>
          <div class="add">
            <div class="form">
              <div class="question">
                <input v-model="genreName" placeholder="Genre">
                <p></p>
              <button @click="uploadgenre">Upload Genre</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="inputField-container">
        <div class="inputField">
          <div class="heading">
            <h3>Edit/Delete a Genre</h3>
          </div>
          <div class="edit">
            <div class="form">
              <div class="question">
                <p>Choose a genre:</p>
                <multiselect label="name" v-model="findGenreItem" :options="genres"></multiselect>
              </div>
            </div>
            <div class="upload" v-if="findGenreItem">
              <input v-model="findGenreItem.name">
              <p></p>
            </div>
            <div class="actions" v-if="findGenreItem">
              <button @click="deleteGenre(findGenreItem)">Delete</button>
              <button @click="editGenre(findGenreItem)">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="set">
      <h2>Books</h2>
      <div class="inputField-container">
        <div class="inputField">
          <div class="heading">
            <h3>Add a Book</h3>
          </div>
          <div class="add">
            <div class="form">
              <div class="question">
                <p>Choose a genre:</p>
                <multiselect label="name" v-model="genre" :options="genres"></multiselect>
              </div>
              <div class="question">
                <p>Book Title:</p>
                <input v-model="bookTitle" placeholder="Title">
              </div>
              <div class="question">
                <p>Write a short description:</p>
                <input v-model="bookDescription" placeholder="Description">
              </div>
              <div class="question">
                <p>Author:</p>
                <input v-model="bookAuthor" placeholder="Author">
              </div>
              <div class="question">
                <input type="file" name="photo" @change="fileChanged">
                <button @click="uploadbook(genre)">Upload Book</button>
              </div>
            </div>
            <div class="upload" v-if="addBook">
              <h2>{{addBook.bookTitle}}</h2>
              <img :src="addBook.photoPath" width=100%/>
            </div>
          </div>
        </div>
      </div>
      <div class="inputField-container">
        <div class="inputField">
          <div class="heading">
            <h3>Edit/Delete a Book</h3>
          </div>
          <div class="edit">
            <div class="form">
              <div class="question">
              <p>Find book to edit:</p>
              <multiselect label="name" v-model="findBookItem" :options="books"></multiselect>
              </div>
            </div>
            <div class="upload" v-if="findBookItem">
              <input v-model="findBookItem.name">
              <p></p>
              <input v-model="findBookItem.description">
              <p></p>
              <img :src="findBookItem.path" />
              <p></p>
              <input v-model="findBookItem.author">
            </div>
            <div class="actions" v-if="findBookItem">
              <button @click="deleteBook(findBookItem)">Delete</button>
              <button @click="editBook(findBookItem)">Edit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Multiselect from 'vue-multiselect';
export default {
  components: { Multiselect },
  name: 'Admin',
  data() {
    return {
      genre: null,
      genres: [],
      genreName: "",
      findGenre: "",
      findGenreItem: null,
      addGenre: null,
      books: [],
      bookTitle: "",
      findBook: "",
      findBookItem: null,
      bookDescription: "",
      file: null,
      addBook: null,
      findName: "",
      findItem: null,
      bookAuthor: "",
    }
  },
  computed: {
    genreSuggestions() {
      let genres = this.genres.filter(genre => genre.name.toLowerCase().startsWith(this.findGenre.toLowerCase()));
      return genres.sort((a, b) => a.name > b.name);
    }
  },
  created() {
    this.getGenres();
    this.getBooks();
  },
  methods: {
    async uploadgenre() {
      try {
        let r1 = await axios.post('/api/genres', {
          name: this.genreName,
        });
        this.addItem = r1.data;
        this.genreName = "";
      } catch (error) {
        console.log(error);
      }
      this.getGenres();
    },
    async getGenres() {
      try {
          let response = await axios.get("/api/genres");
          this.genres = response.data;
          return true;
      } catch (error) {
          console.log(error);
      }
    },
    async getBooks() {
      try {
        let response = await axios.get("/api/books");
        this.books = response.data;
        return true;
      } catch (error) {
          console.log(error);
      }
    }, 
    selectGenre(item) {
      this.findGenre = "";
      this.findGenreItem = item;
    },
    async deleteGenre(item) {
      try {
        await axios.delete("/api/genres/" + item._id);
        this.findGenre = "";
        this.findGenreItem = null;
        this.getGenres();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editGenre(item) {
      try {
        await axios.put("/api/genres/" + item._id, {
          name: this.findGenreItem.name,
        });
        this.findGenreItem = null;
        this.getGenres();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteBook(item) {
      try {
        await axios.delete("/api/books/" + item._id);
        this.findBook = "";
        this.findBookItem = null;
        this.getGenres();
        this.getBooks();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editBook(item) {
      try {
        await axios.put("/api/books/" + item._id, {
          name: this.findBookItem.name,
          description: this.findBookItem.description,
          author: this.findBookItem.author,
        });
        this.findBookItem = null;
        this.getBooks();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    fileChanged(event) {
      this.file = event.target.files[0]
    },
    async uploadbook(genre) {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name, this.file.description)
        let r1 = await axios.post('/api/photos', formData);
        let r2 = await axios.post("/api/books/"+genre._id, {
          genre: this.genre,
          name: this.bookTitle,
          description: this.bookDescription,
          photoPath: r1.data.photoPath,
          author: this.bookAuthor,
        });
        this.addBook = r2.data;
        this.getBooks();
        this.bookTitle = "";
        this.genre = "";
        this.bookDescription = "";
        this.photoPath = "";
        this.bookAuthor = "";
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.admin {
    height:100%;
    width: 90%;
    margin: 20px auto;
    /* width: 90%; */
    /* margin: 5% auto auto auto; */
}
.set {
  padding: 15px;
  border-radius: 5px;
  margin: 5% auto auto auto;
  width: 90%;
  background-color:#cfe2fd;

}
.question {
  padding: 5px;
  margin: 8px;
}
.inputField {
    border: 2px solid #eb7f4d;
    background-color: #faebd7;
    padding: 10px;
    margin: 20px 15px;
    border-radius: 5px;
}

p {
  line-height: 1.5em;
  /* margin: 10px 0px; */
}
button {
  margin: 5px;
  padding: 5px;
}
/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
    margin-right: 50px;
}
.actions {
    padding: 3px;
    margin: 0px;
}
.action {
    margin: 15px;
}
.upload p, .actions p{
    margin: 0px;
    margin-bottom: 5px;
}

/* Suggestions */
.suggestions {
  width: 100%;
  border: 1px solid #ccc;
  margin-bottom: 15px;
  padding: 5px;
  padding-bottom: 0px;
  line-height: 15px;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #eb7f4d;
  color: antiquewhite;
}
/* Tablet Styles */
@media only screen and (min-width: 500px) and (max-width: 999px) {  
    .add,
    .edit {
        display: flex;
    }
}

/* Desktop Screen */
@media only screen and (min-width: 1000px) {
    .inputField-container {
        display: flex;
    }
    .add,
    .edit {
        display: flex;
    }
}
</style>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>
