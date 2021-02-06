
<template>
  <main id="app">
    <Navigation />
    
      <img alt="Vue logo" src="./assets/logo.png">
      <Dashboard />

    <Footer />
  </main>
</template>

<script>
import Navigation from './components/navigation/index';
import Footer from './components/footer/index';
import Dashboard from './components/dashboard/index';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Dashboard
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
