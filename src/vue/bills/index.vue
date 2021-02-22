<template>
    <section id='bills' class="">
      <div class="uk-padding uk-panel">
        <h4 class="uk-heading-line uk-text-center uk-heading-small"><span>Billing</span></h4>
      </div>
      <div class="uk-flex uk-flex-right uk-text-nowrap table-options">
          <button class="uk-button uk-button-default uk-text-middle uk-margin-small-right" type="button" v-on:click="getRecordsAsync()">Refresh <span class="uk-margin-small-left" uk-icon="refresh"></span></button>
          <button class="uk-button uk-button-default uk-text-middle uk-margin-small-left" type="button" v-on:click="addNewBill()">Add Bill <span class="uk-margin-small-left" uk-icon="plus"></span></button>
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
           <tr v-for="(row, index) in rows" :key="`new-bill-${index}`" :id="`new_bill_${index}`">
             <td>
               <select :id="`category_${index}`" v-model="row.category" >
                 <option>- - - -</option><br>
                 <option>daily</option>
                 <option>meal</option>
                 <option>bank</option>
                 <option>shopping</option>
                 <option>service</option>
                 <option>other</option>
               </select>
              </td>
             <td><input type="number" :id="`amount_${index}`" v-model="row.amount" /></td>
             <td>{{getDate}}</td>
             <td><textarea :id="`reason_${index}`" v-model="row.reason"></textarea></td>
             <td class="uk-flex uk-flex-around" :id="`options_${index}`">
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button">Save <span class="uk-margin-small-left" uk-icon="play-circle"></span></button>
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="cancelNewBill(index)">Cancel <span class="uk-margin-small-left" uk-icon="ban"></span></button>
             </td>
           </tr>
           <tr v-for="(record, index) in getRoute" :key="`bill-${index}`">
             <td>{{record.category}}</td>
             <td>$ {{record.amount}}</td>
             <td>{{record.date}}</td>
             <td class="abstract uk-text-truncate" v-bind:title="record.reason">{{record.reason !==  '' ? record.reason : 'N/A'}}</td>
             <td class="uk-flex uk-flex-around">
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button">Edit <span class="uk-margin-small-left" uk-icon="file-edit"></span></button>
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button">Delete <span class="uk-margin-small-left" uk-icon="trash"></span></button>
             </td>
           </tr>
         </tbody>
       </table>
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
      rows: []
    };
  },
  computed: {
    getRoute () {
      return store.getters['bills/getRecords']; // get state
    },
    getDate () {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
  },
  watch: {

  },
  methods: {
    addNewBill () {
      this.rows.push({});
    },
    cancelNewBill (index) {
      this.rows.splice(index, 1);
    },
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

    .table-button{
        margin: 0 5px;
      }

    @media screen and (min-width: 345px) {
      .table-options{
        padding-right: 40px;
      }
    }
</style>
