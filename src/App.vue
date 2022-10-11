
<template>
  <v-app>
  <div id="app">
    <Bar/>
    <v-main>
    <SubBar/>
    </v-main>
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
    <router-view/>
  </div>
</v-app>
</template>

<script>
import Bar from '@/components/Bar.vue'
import SubBar from "@/components/SubBar";

export default {
  name: 'App',
  components: {
    Bar,
    SubBar
  }
}
</script>

