<template>
    <header class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left">
        <h1 class="uk-heading-medium uk-margin-remove-bottom">CAHIER</h1>
      </div>
      <div class="uk-navbar-right">
        <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-reveal">
          <span uk-icon="icon: list; ratio: 1.5" class="uk-margin-small-left uk-margin-small-right"></span>
        </button>
      </div>
      <div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true; flip: true">
        <div class="uk-offcanvas-bar">
          <button v-on:click="changeRoute('dashboard')"> Dashboard </button> |
          <button v-on:click="changeRoute('bills')"> Bills </button> |
          <button v-on:click="changeRoute('copies')"> Copies </button> |
          <button v-on:click="changeRoute('todos')"> Todos </button>
        </div>
      </div>
    </header>
</template>

<script>
import store from '../../store/index';

export default {
  name: 'Navigation',
  props: {},
  components: {},
  data () {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
    changeRoute (route) {
      store.commit('setRoute', route);
    }
  },
  created () {},
  mounted () {}
};
</script>

<style lang="css" scoped>
  header{
    margin: 0;
    padding: 20px;
    background: #fff;
  }

  button{
    border: none;
    padding: 0;
  }

  button:hover{
    background-color: #ddd;
  }

  .uk-navbar-container:not(.uk-navbar-transparent){
    background: #fff;
  }

  .uk-offcanvas-bar{
    background: #f8f8f8;
  }
</style>
