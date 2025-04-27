<template>
  <v-snackbar v-model="alert" :color="color" multi-line top>
    {{ text }}
    <v-btn dark text @click="close">
      <v-icon>mdi-close-circle</v-icon>
    </v-btn>
  </v-snackbar>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Alert',
  computed: {
    ...mapGetters('alert', ['status', 'color', 'text']),
    
    alert: {
      get() {
        return this.status
      },
      set(value) {
        this.setAlert({
          status: value,
          type: 'success', // default type (optional)
          text: 'test'     // default text (optional)
        })
      }
    }
  },
  methods: {
    ...mapActions('alert', ['setAlert']),
    
    close() {
      this.setAlert({
        status: false,
        type: '',
        text: ''
      })
    }
  }
}
</script>
