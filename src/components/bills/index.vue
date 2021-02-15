<template>
    <section id='bills' class="">
      <div class="uk-padding uk-panel">
        <h4 class="uk-heading-line uk-text-center uk-heading-small"><span>Billing</span></h4>
      </div>
      <div class="uk-flex uk-flex-right uk-text-nowrap table-options">
          <button class="uk-button uk-button-default uk-margin-bottom uk-text-middle uk-margin-small-right" type="button" v-on:click="getRecordsAsync()">Refresh <span class="uk-margin-small-left" uk-icon="refresh"></span></button>
          <a class="uk-button uk-button-default uk-margin-bottom uk-text-middle uk-margin-small-left" href="#add-new-bill" uk-toggle>Add Bill <span class="uk-margin-small-left" uk-icon="plus"></span></a>
      </div>
      <div class="uk-padding uk-panel uk-overflow-auto">
       <table class="uk-table uk-table-hover uk-table-justify uk-table-divider uk-table-striped">
         <thead>
           <tr>
             <td><h3>Type</h3></td>
             <td><h3>Amount</h3></td>
             <td><h3>Date</h3></td>
             <td><h3>Reason</h3></td>
             <td><h3>Options</h3></td>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(record, index) in getRoute" :key="`bill-${index}`">
             <td>{{record.category}}</td>
             <td>$ {{record.amount}}</td>
             <td>{{record.date}}</td>
             <td class="abstract uk-text-truncate">{{record.reason !==  '' ? record.reason : 'N/A'}}</td>
             <td class="uk-flex uk-flex-around@s uk-flex-wrap">
              <button class="uk-button uk-button-default uk-margin-bottom uk-text-middle uk-text-nowrap" type="button">Edit <span class="uk-margin-small-left" uk-icon="file-edit"></span></button>
              <button class="uk-button uk-button-default uk-margin-bottom uk-text-middle uk-text-nowrap" type="button">Delete <span class="uk-margin-small-left" uk-icon="trash"></span></button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
      <div>
        <hr class="uk-divider-icon">
      </div>
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
import UIkit from 'uikit';
import store from '../../store/index';

export default {
  name: 'Bills',
  props: {},
  components: {},
  data () {
    return {
      notificationPos: 'top-center'
    };
  },
  computed: {
    getRoute () {
      return store.getters['bills/getRecords']; // get state
    }
  },
  watch: {

  },
  methods: {
    getRecordsAsync () {
      let position = 'top-center';
      if (window.innerWidth <= 340) { position = 'bottom-center'; }
      UIkit.notification({ message: '<span  class="uk-margin-right" uk-icon="icon: info"></span> already refreshed', status: 'primary', pos: position, timeout: 1000 });
      store.dispatch('bills/getRecordsAsync');
    }
  },
  created () {

  },
  destroyed () {

  },
  mounted () {
    store.dispatch('bills/getRecordsAsync');
  }
};
</script>

<style scoped>
    section#bills{
      min-height: 100vh;
      height: 100%;
      box-sizing: border-box;
      font-size: 1rem;
    }

    table{
      border-top: 1px solid #888;
      border-bottom: 1px solid #888;
    }

    @media screen and (min-width: 345px) {
      .table-options{
        padding-right: 40px;
      }
    }
</style>
