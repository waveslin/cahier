<template>
  <main id="cahier">
    <Navigation />

    <button v-on:click="changeRoute('dashboard')"> Dashboard </button> |
    <button v-on:click="changeRoute('bookkeeping')"> Bookkeeping </button>

    <section id='main'>
      <img alt="Vue logo" src="./assets/logo.png">
      <Dashboard v-if="getRoute === 'dashboard'" />
      <Bookkeeping v-if ="getRoute === 'bookkeeping'" />
    </section>

    <Footer />
  </main>
</template>

<script>
import store from './store/index';
import Navigation from './components/navigation/index';
import Footer from './components/footer/index';
import Dashboard from './components/dashboard/index';
import Bookkeeping from './components/bookkeeping/index';

console.log({ here: store });
export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Dashboard,
    Bookkeeping
  },
  computed: {
    getRoute () {
      return store.getters.getRoute; // get state
    }
  },
  methods: {
    changeRoute (route) {
      store.commit('setRoute', route);
    }
  }
};
</script>

<style>
body, html{
  margin: 0;
  padding: 0;
}

#cahier {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  padding: 0;
  margin: 0;
}

section#main{
  min-height: 100vh;
}

</style>
