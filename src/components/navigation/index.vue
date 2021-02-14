<template>
    <header>
      <button v-on:click="changeRoute('dashboard')"> Dashboard </button> |
      <button v-on:click="changeRoute('bills')"> Bills </button> |
      <button v-on:click="changeRoute('copies')"> Copies </button> |
      <button v-on:click="changeRoute('todos')"> Todos </button>
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
    padding: 50px;
    background-color: #6ef5ee;
  }
</style>
