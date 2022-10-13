<template>
  <div>
    <v-main>
      <SubBar/>
      <MainCard/>
      <MainFooter/>
    </v-main>
  </div>
</template>

<script>
// @ is an alias to /src
import SubBar from '@/components/SubBar.vue'
import MainCard from '@/components/MainCard.vue'
import MainFooter from "@/components/MainFooter";

export default {
  name: 'HomeView',
  components: {
    MainFooter,
    SubBar,
    MainCard
  }
}
</script>
