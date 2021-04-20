<template>
    <div class="userpage">
        <MyReviews v-if="user" />
        <Login v-else />
        <div class="admin" v-if="user">
            <Admin v-if="user.role === 'admin'" />
        </div>
    </div>
</template>

<script>
import MyReviews from '@/components/MyReviews.vue';
import Login from '@/components/Login.vue';
import Admin from '@/components/Admin.vue';
import axios from 'axios';
export default {
    name: 'UserPage',
    components: {
        MyReviews,
        Login,
        Admin,
    },
    async created() {
      try {
        let response = await axios.get('/api/users');
        this.$root.$data.user = response.data.user;
      } catch (error) {
        this.$root.$data.user = null;
      }
    },
    computed: {
    user() {
      return this.$root.$data.user;
    }
  }
}
</script>


<style scoped>
.userpage {
    color: black;
    /* background-color: antiquewhite; */
}

</style>