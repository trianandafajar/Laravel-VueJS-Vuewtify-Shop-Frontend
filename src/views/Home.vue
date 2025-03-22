<template>
  <div>
    <!-- Categories -->
    <v-container class="ma-0 pa-0" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/categories" class="blue--text">
          All Categories <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="category in categories" :key="`category-` + category.id" xs6>
          <v-card :to="'/category/' + category.slug">
            <v-img :src="getImage(category.image)" class="white--text">
              <v-card-title class="fill-height align-end">{{ category.name }}</v-card-title>
            </v-img>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Books -->
    <v-container class="ma-0 pa-0 mt-2" grid-list-sm>
      <div class="text-right">
        <v-btn small text to="/books" class="blue--text">
          All Books <v-icon>mdi-chevron-right</v-icon>
        </v-btn>
      </div>
      <v-layout wrap>
        <v-flex v-for="book in books" :key="`book-` + book.id" xs6>
          <book-item :book="book" />
        </v-flex>
      </v-layout>
    </v-container>

    <!-- Loading Indicator -->
    <v-container v-if="loading" class="text-center">
      <v-progress-circular indeterminate color="blue"></v-progress-circular>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";

export default {
  components: {
    BookItem: () => import("@/components/BookItem.vue"),
  },
  data() {
    return {
      categories: [],
      books: [],
      loading: false, // Tambahkan state loading
    };
  },
  async created() {
    this.loading = true;
    try {
      // Jalankan kedua request bersamaan agar lebih cepat
      const [categoriesRes, booksRes] = await Promise.all([
        axios.get("/categories/random/2"),
        axios.get("/books/top/4"),
      ]);

      this.categories = categoriesRes.data.data;
      this.books = booksRes.data.data;
    } catch (error) {
      console.error("Error fetching data:", error.response?.data || error.message);
    } finally {
      this.loading = false; // Matikan loading setelah request selesai
    }
  },
  methods: {
    getImage(image) {
      return `/categories/${image}`;
    },
  },
};
</script>
