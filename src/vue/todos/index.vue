<template>
    <section id='todos' class="uk-card-secondary">

      <div class="uk-background-secondary uk-light uk-padding uk-panel">
        <p class="uk-h4">Todos</p>
      </div>
      <a class="uk-button uk-button-default uk-margin-bottom uk-text-middle uk-margin-small-left" href="#add-new-bill" uk-toggle>Add Bill <span class="uk-margin-small-left" uk-icon="plus"></span></a>
      <div id="add-new-bill" class="uk-modal-full" uk-modal>
        <div class="uk-modal-dialog">
            <button class="uk-modal-close-full uk-close-large" type="button" uk-close></button>
            <div class="uk-grid-collapse uk-child-width-1-2@s uk-flex-middle" uk-grid>
                <div class="uk-background-cover" style="background-image: url('images/add_new_bill_form.jpg');" uk-height-viewport></div>
                <div class="uk-padding-large">
                    <h1>Headline</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </div>
            </div>
        </div>
      </div>
    </section>
</template>

<script>
export default {
  name: 'Todos',
  props: {},
  components: {},
  data () {
    return {};
  },
  computed: {},
  watch: {},
  methods: {},
  created () {},
  mounted () {}
};
</script>

<style>
    section#todos{
      background-color: #e97070;
      padding: 40px;
      height: 100%;
    }
</style>
