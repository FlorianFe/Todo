
<script>

export default {
  name: 'App',
  data: () => (
  {
    offline: false
  }),
  components: {
    
  }
}

</script>

<template>
  <div id="app">
    <v-app>
      <template v-if="offline">      
        <v-alert 
          border="right"
          colored-border
          type="error"
          elevation="2"
        > 
          It looks like our service is offline
        </v-alert>   
      </template>
      <template v-else>
        <router-view/>
      </template>
    </v-app>
  </div>
</template>

<style>

a 
{ 
  text-decoration: none; 
}

#app 
{
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#nav 
{
  padding: 30px;
}

</style>
