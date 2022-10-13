<template>
    <v-app-bar color=#003D75 app>
      <div>
        <router-link class="links" to="/">
          <v-btn text color="white">FITLY</v-btn>
        </router-link>
          <!--      <img src="./assets/logofitly.png"/>-->
      </div>
      <v-spacer/>
      <router-link v-if="!$isLoggedIn" class="links" to="/iniciar_sesion">
      <v-btn text color="white">Iniciar Sesion
        <v-icon x-large>
          mdi-account-circle
        </v-icon>
      </v-btn></router-link>
      <router-link v-else-if = "$isLoggedIn" class="links" to="/perfil">
        <v-btn text color="white">
          <v-icon x-large>
            mdi-account-circle
          </v-icon>
        </v-btn>
    </router-link>



    </v-app-bar>
</template>

<script>
import {mapState} from "pinia";
import {useSecurityStore} from "@/store/SecurityStore";

export default {
  name: "IniciarSesion",
  computed: {
    ...mapState(useSecurityStore, {
      $user: state => state.user,
    }),
    ...mapState(useSecurityStore, {
      $isLoggedIn: 'isLoggedIn'
    }),
    getUsername(){
      return this.$user.username
    }
  }

}


</script>

<style scoped>
.links{
  text-decoration: none;
}

</style>