<template>
<div class = "logIn">
  <div class = "img">
    <v-img class = "img1"
           :src = "require(`@/assets/user_logo.png`)"
    />
  </div>
  <v-divider
    />
  <h1 class = "mainTitle">INICIAR SESION</h1>
  <v-text-field
    solo = true
    outlined = true
    label="Escriba su nombre de usuario aqui"
    class = "textField"
    prefix="USUARIO"
  />
  <v-text-field
      solo = true
      outlined = true
      label="Escriba su contrasena aqui"
      class ="textField"
      prefix="CONTRASENA"
  />
  <div class = "btn1">
    <router-link class="links" to="/">
    <v-btn
        elevation="3"
        rounded
        color="blue"
        x-large>INICIE SESION
    </v-btn>
    </router-link>
    <router-link class="links" to="/mis_rutinas">
      <v-btn >
        No estas registrado? Registrate aqui
      </v-btn>
    </router-link>
  </div>

  <v-main>

  </v-main>
</div>
</template>

<script>
export default {
  name: "IniciarSesionView"
}
</script>

<style scoped>
  .logIn{
    margin-top: 200px;
  }

  .mainTitle{
    text-align: center;
  }

  .textField {
    width: 400px;
    margin: auto;
  }

  .btn1{
    text-align: center;
  }

  .img1{
    height: 170px;
    width: 150px;
    margin: auto;
  }
</style>