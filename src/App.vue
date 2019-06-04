<template>
  <div id="app">
    <ul>
      <li><router-link :to="{ name: 'home' }">Home</router-link></li>
      <li><router-link :to="{ name: 'dashboard' }">Dashboard</router-link></li>
      <li><router-link :to="{ name: 'config' }">Config</router-link></li>
    </ul>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>