<template>
  <v-app>
    
    <v-main>
      <!-- <HelloWorld/> -->
      <ImageUpload/>
    </v-main>
  </v-app>
</template>

<script>
//import HelloWorld from './components/HelloWorld';
import ImageUpload from './components/ImageUpload';
export default {
  name: 'App',

  components: {
   // HelloWorld,
    ImageUpload,
  },

  data: () => ({
    //
  }),
};
</script>
