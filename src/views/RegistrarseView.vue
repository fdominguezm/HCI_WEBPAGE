<template>
  <v-app>
  <div class = "register">
    <div class = "img">
      <v-img class = "img1"
             :src = "require(`@/assets/register_logo.png`)"
      />
    </div>
    <v-divider inset
    />
    <h1 class = "mainTitle">REGISTRARSE</h1>

    <v-row justify="center">
      <v-col md = "auto">
        <h4>Nombre</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su nombre aqui"
            class = "textField"
            background-color= #6797C5
            color="white"
        />
        <h4>Nombre de usuario</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su nombre de usuario aqui"
            class = "textField"
            background-color= #6797C5
            color="white"
        />
        <h4>Contraseña</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su contraseña aqui"
            class = "textField"
            background-color= #6797C5
            color="white"
        />
      </v-col>
      <v-col md = "auto">
        <h4>Apellido</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su apellido aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
        />
        <h4>E-mail</h4>
        <v-text-field
            solo = true
            outlined = true
            label="Ingrese su e-mail aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
        />
        <h4>Repita su contraseña</h4>

        <v-text-field
            solo = true
            outlined = true
            label="Repita su contraseña aqui"
            class ="textField"
            background-color= #6797C5
            color = "white"
        />
      </v-col>
    </v-row>
    <div class = "alignBtn">
      <v-btn
          class = "btn1"
          elevation="3"
          rounded
          color = #003D75
          x-large
          to = "/iniciar_sesion">REGISTRESE
      </v-btn>
    </div>
    <div class="alignBtn">
      <router-link class="links" to="/iniciar_sesion">
        <v-btn
            plain>
          ¿Ya estas registrado? Inicie sesion
        </v-btn>
      </router-link>
    </div>

    <v-main>

    </v-main>
  </div>
  </v-app>
</template>

<script>

export default {
  name: "RegistrarseView"
}
</script>

<style scoped>
.register{
  margin-top: 10rem;
}

.img1{
  height: 170px;
  width: 150px;
  margin: auto;
}


.mainTitle{
  text-align: center;
}

.textField {
  width: 400px;
  margin: auto;
  color: white;
}

.btn1{
  color: white;
  width: 15rem;
}


.alignBtn{
  text-align: center;
}
</style>