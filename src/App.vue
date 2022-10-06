
<template>
  <v-app>
  <div id="app">
    <Bar/>
      <router-link to="/"></router-link>
      <router-link to="/about"></router-link>
    <router-view/>
  </div>
</v-app>
</template>

<script>
import Bar from '@/components/Bar.vue'

export default {
  name: 'App',
  components: {
    Bar,
  }
}
</script>

