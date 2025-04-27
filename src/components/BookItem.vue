<template>
  <div>
    <v-card :to="`/book/${book.slug}`" class="mb-4">
      <v-img
        :src="getImage(`/books/${book.cover}`)"
        class="white--text"
        height="200px"
      >
        <v-card-title
          class="fill-height align-end"
          v-text="book.title"
        />
      </v-img>

      <v-card-actions>
        <v-icon left>mdi-cash</v-icon>
        <span class="orange--text">Rp {{ formatPrice(book.price) }}</span>
        <v-spacer></v-spacer>
        <v-icon left>mdi-eye</v-icon>
        <span>{{ book.views }}</span>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'BookItem',
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  methods: {
    getImage(path) {
      // Sesuaikan kalau ada global base URL, atau sekadar return relative path
      return path
    },
    formatPrice(price) {
      return price.toLocaleString('id-ID')
    }
  }
}
</script>
