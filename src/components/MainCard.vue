<template>
  <div>
    <v-divider/>
    <v-row>
      <v-col>
        <h1 class="text1">
          Crea tu proxima rutina de la manera mas simple posible,<p></p> comenza clickeando en “Crear rutina”
        </h1>
      </v-col>
      <v-col>
        <v-img class="img1"
               max-height="400"
               max-width="450"
               src="https://www.lanacion.com.ar/resizer/LmQ0IdGvJZGgjCmY7F4wDL8zdNg=/1200x800/smart/filters:format(webp):quality(80)/cloudfront-us-east-1.images.arcpublishing.com/lanacionar/UEDSYPTFZRANLI62Z7U4PXTLNE.jpg"
        ></v-img>
      </v-col>
    </v-row>
    <v-divider/>
    <v-row>
      <v-col>
        <v-img class="img2"
               max-height="400"
               max-width="450"

               src="https://www.musculaciontotal.com/wp-content/uploads/2014/09/banco-plano-con-manos-juntas.jpg.webp"
        ></v-img>
      </v-col>
      <v-col>
        <h1 class="text2">
          En “Ejercicios” puedes encontrar todos los ejercicios que<p></p>  necesitas para armar tu rutina
        </h1>
      </v-col>
    </v-row>
    <v-divider/>
    <h2 class="bottom_text">“Da siempre lo mejor de ti. Lo que siembres hoy dará su fruto mañana”</h2>
  </div>
</template>

<script>
export default {
  name: "MainCard"
}
</script>

<style scoped>
.text1{
  margin-left: 130px;
  margin-top: 150px;
  font-weight: bold;
  font-size: x-large;
}
.img1{
  margin-left: 250px;
  margin-top: 50px;
  border-radius: 5%;
}
.text2{
  margin-left: 80px;
  margin-top: 100px;
  font-weight: bold;
  font-size: x-large;
}
.img2{
  margin-left: 100px;
  border-radius: 5%;
}
.bottom_text {
  font-weight: bold;
  text-align: center;
  font-size: xx-large;
  margin-top: 100px;
}
</style>