<template>
  <!-- App.vue -->

  <v-app>

    <!-- Sizes your content based upon application components -->
    <v-main>
      <Bar/>
    </v-main>

    <v-footer app>
    </v-footer>
  </v-app>
</template>

<script>
import Bar from "@/components/Bar";

export default {
  name: 'App',

  components: {
    Bar,
  },

  data: () => ({
    //
  }),
};
</script>