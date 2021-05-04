
<script>

import axios from 'axios'

const SERVER_URL = 'http://localhost:3000'
const REFRESHING_INTERVAL_TIME = 3000;

export async function isServerOnline()
{
  return await axios
    .get(SERVER_URL)
    .then(res => res.data)
}

export default {
  name: 'App',
  data: () => (
  {
    offline: false
  }),
  components: {
    
  },
  mounted()
  {
    isServerOnline() 
      .catch(() => 
      {
        this.offline = true;
        const interval = setInterval(() => 
        {
          isServerOnline()
            .then(() => 
            { 
              this.offline = false
              clearInterval(interval) 
            })
            .catch(() => 
            { 
              this.offline = true 
            })
        }, REFRESHING_INTERVAL_TIME)
      })
  }
}

</script>

<template>
  <div id="app">  
    <v-app>
      <v-container id="main-container">
        <template v-if="offline">      
          <v-alert 
            border="right"
            colored-border
            type="error"
            elevation="2"
          > 
            It looks like our service is offline. <br>
            As Admin you can start the "backend server" with <br>
            <code>npm run start-backend</code>
          </v-alert>   
        </template>
        <template v-else>
          <router-view/>
        </template>
      </v-container>
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

#main-container
{
  max-width: 600px;
}

</style>
