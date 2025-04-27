<template>
  <v-card>
    <v-toolbar dark color="primary">
      <v-btn icon dark @click.native="close">
        <v-icon>mdi-close</v-icon>
      </v-btn>

      <v-text-field
        v-model="keyword"
        flat
        hide-details
        append-icon="mdi-microphone"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        autofocus
        @input="doSearch"
      />
    </v-toolbar>

    <v-card-text>
      <v-subheader v-if="keyword.length > 0">
        Result search "{{ keyword }}"
      </v-subheader>

      <v-alert
        :value="books.length === 0 && keyword.length > 0"
        color="warning"
        outlined
      >
        Sorry, but no results were found.
      </v-alert>

      <v-container class="ma-0 pa-0" grid-list-sm>
        <v-layout wrap>
          <v-flex
            v-for="book in books"
            :key="`book-${book.id}`"
            xs6
          >
            <book-item :book="book" />
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: 'Search',
  components: {
    BookItem: () => import(/* webpackChunkName: "book-item" */ '@/components/BookItem.vue'),
  },
  data() {
    return {
      keyword: '',
      books: [],
    };
  },
  methods: {
    async doSearch() {
      if (this.keyword.length > 0) {
        try {
          const response = await this.axios.get(`/books/search/${this.keyword}`);
          this.books = response.data.data;
        } catch (error) {
          console.error('Search failed:', error);
        }
      } else {
        this.books = [];
      }
    },
    close() {
      this.$emit('closed', false);
    },
  },
};
</script>
