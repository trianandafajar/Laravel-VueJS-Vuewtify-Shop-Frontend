<template>
  <div>
    <v-subheader>Your Profile</v-subheader>

    <v-card flat v-if="user">
      <v-container>
        <v-simple-table>
          <tbody>
            <tr v-for="(value, key) in user" :key="key">
              <td class="font-weight-bold">{{ formatKey(key) }}</td>
              <td>{{ value || '-' }}</td>
            </tr>
          </tbody>
        </v-simple-table>
      </v-container>
    </v-card>

    <!-- Skeleton Loader saat data belum siap -->
    <v-card flat v-else>
      <v-container>
        <v-skeleton-loader type="table-row"></v-skeleton-loader>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      user: "auth/user",
    }),
  },
  methods: {
    formatKey(key) {
      return key
        .replace(/_/g, " ") // Ganti underscore dengan spasi
        .replace(/\b\w/g, (char) => char.toUpperCase()); // Kapitalisasi huruf pertama
    },
  },
};
</script>
