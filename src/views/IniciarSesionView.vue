<template>
  <v-app>
<div class = "logIn">
  <div class = "img">
    <v-img class = "img1"
           :src = "require(`@/assets/user_logo.png`)"
           transition = "false"
    />
  </div>
  <v-divider
    />
  <h1 class = "mainTitle">INICIAR SESION</h1>
  <v-text-field
      solo = true
      outlined = true
      label="Ingrese su nombre de usuario aqui"
      class = "textField"
      background-color= #6797C5
      color="white"
      prepend-inner-icon="mdi-account-box"
  />
  <v-text-field
      solo = true
      outlined = true
      label="Ingrese su contraseña aqui"
      class ="textField"
      background-color= #6797C5
      color = "white"
      prepend-inner-icon="mdi-lock"
  />

  <div class = "alignBtn">
    <v-row justify="center">
    <v-col md="auto">
      <v-btn
          class = "btn1"
          elevation="3"
          rounded
          color= #003D75
          x-large
          to = "/">INICIE SESION
      </v-btn>
    </v-col>

      <v-col md="auto">
        <v-checkbox label = "¿Recordar la sesion?"
                    />
      </v-col>
    </v-row>
  </div>
  <div class = "alignBtn">

  <router-link class="links" to="/registrarse">
      <v-btn
      plain>
        ¿No estas registrado? Registrate aqui
      </v-btn>
    </router-link>
  </div>

  </div>
  </v-app>
</template>

<script>
export default {
  name: "IniciarSesionView"
}
</script>

<style scoped>
  .logIn{
    margin-top: 10rem;
  }

  .mainTitle{
    text-align: center;
  }

  .textField {
    width: 400px;
    margin: auto;
  }

  .btn1{
    color: white;
    width: 15rem;
  }

  .alignBtn{
    text-align: center;
  }

  .img1{
    height: 170px;
    width: 150px;
    margin: auto;
  }
</style>