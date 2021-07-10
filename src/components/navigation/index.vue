<template>
    <header class="uk-navbar-container" uk-navbar>
      <div class="uk-navbar-left ">
        <h1 class="uk-heading-medium uk-margin-remove-bottom">CAHIER</h1>
      </div>
      <div class="uk-navbar-right">
        <button class="uk-button uk-button-default uk-margin-small-right" type="button" uk-toggle="target: #offcanvas-reveal">
          <span uk-icon="icon: list; ratio: 1.5" class="uk-margin-small-left uk-margin-small-right"></span>
        </button>
      </div>
      <div id="offcanvas-reveal" uk-offcanvas="mode: reveal; overlay: true; flip: true; esc-close: true">
        <div class="uk-offcanvas-bar">
          <div class="offcanvas-heading">
            <h1 class="uk-heading-medium">CAHIER</h1>
          </div>
          <ul class="uk-nav-default uk-nav-parent-icon" uk-nav>
            <li><button class="uk-offcanvas-close" v-on:click="changeRoute('dashboard')"> Dashboard </button></li>
            <li><button class="uk-offcanvas-close" v-on:click="changeRoute('bills')"> Bills </button></li>
            <li><button class="uk-offcanvas-close" v-on:click="changeRoute('jobs')"> Jobs </button></li>
            <li><button class="uk-offcanvas-close" v-on:click="changeRoute('todos')"> Todos </button></li>
          </ul>
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
    cursor: default;
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
    border: 1px solid #444;
  }

  .uk-offcanvas-bar{
    background: #f8f8f8;
  }

  .uk-offcanvas-close{
    position: initial;
    top: initial;
    right: initial;
  }

  .offcanvas-heading h1{
    padding: 20px 10px 150px 10px;
    color: #222 !important;
  }

  ul{
    padding: 0 0 30px 0;
  }

  li{
    height: 50px;
  }

  li button{
    box-sizing: border-box;
    width: 100%;
    height: 100%;
    background-color: #f8f8f8;
  }
</style>
