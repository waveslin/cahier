<template>
  <main id="cahier">
    <Navigation />

    <section id='main' class="uk-container-expand">
      <Dashboard v-if="getRoute === 'dashboard'" />
      <Bills v-if ="getRoute === 'bills'" />
      <Todos v-if ="getRoute === 'todos'" />
      <Jobs v-if ="getRoute === 'jobs'" />
    </section>

    <Footer />
  </main>
</template>

<script>
import store from './store/index';
import Navigation from './components/navigation/index';
import Footer from './components/footer/index';
import Dashboard from './components/dashboard/index';
import Bills from './components/bills/index';
import Todos from './components/todos/index';
import Jobs from './components/jobs/index';

export default {
  name: 'App',
  components: {
    Navigation,
    Footer,
    Dashboard,
    Bills,
    Todos,
    Jobs
  },
  computed: {
    getRoute () {
      return store.getters.getRoute; // get state
    }
  },
  created () {
    store.dispatch('bills/initial');
  },
  mounted () {
    store.commit('setRoute', 'dashboard');
  },
  destroyed () {
    console.log('close');
  }
};
</script>

<style>
@import url("../node_modules/uikit/dist/css/uikit.min.css");

body,
html{
  margin: 0;
  padding: 0;
  cursor: default;
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
  width: 100%;
  height: 100%;
  min-height: 100vh;
}

button{
  font-size: 20px;
  cursor: default;
}

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}

.truncate{
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

.uk-table td {
    vertical-align: middle;
}

</style>
