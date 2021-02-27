<template>
    <section id='bills' class="">
      <div class="uk-padding uk-panel">
        <h4 class="uk-heading-line uk-text-center uk-heading-small"><span>Billing</span></h4>
      </div>
      <div class="uk-flex uk-flex-right uk-text-nowrap table-options">
          <button class="uk-button uk-button-default uk-text-middle uk-margin-small-right" type="button" v-on:click="getRecords()">Refresh <span class="uk-margin-small-left" uk-icon="refresh"></span></button>
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
                 <option>daily</option>
                 <option>meal</option>
                 <option>bank</option>
                 <option>shopping</option>
                 <option>service</option>
                 <option>other</option>
               </select>
              </td>

             <td>$ <input type="number" :id="`amount_${index}`" v-model="row.amount" /> </td>

             <td><input type="text" :id="`datetime_${index}`" v-model="row.datetime" class="row-datetime" readonly/></td>

             <td><textarea :id="`reason_${index}`" v-model="row.reason"></textarea></td>

             <td class="uk-flex uk-flex-around" :id="`options_${index}`">
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="saveNewRecord(index)"> Save <span class="uk-margin-small-left" uk-icon="play-circle"></span></button>
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="cancelNewRecord(index)"> Cancel <span class="uk-margin-small-left" uk-icon="ban"></span></button>
             </td>
           </tr>

           <tr v-for="(record, index) in getRoute" :key="`bill-${index}`">

              <td v-if="record.edit">
                <select v-model="record.category" >
                  <option>daily</option>
                  <option>meal</option>
                  <option>bank</option>
                  <option>shopping</option>
                  <option>service</option>
                  <option>other</option>
                </select>
              </td>
              <td v-else>{{record.category}}</td>

              <td v-if="record.edit">$ <input type="number" v-model="record.amount" /> </td>
              <td v-else>$ {{record.amount}}</td>

              <td v-if="record.edit"><input type="text" v-model="record.bill_date" class="row-datetime" readonly/></td>
              <td v-else>{{record.bill_date}}</td>

              <td v-if="record.edit"><textarea v-model="record.reason"></textarea></td>
              <td v-else class="abstract uk-text-truncate" v-bind:title="record.reason">{{record.reason !==  '' ? record.reason : 'N/A'}}</td>

              <td v-if="record.edit" class="uk-flex uk-flex-around">
                <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="saveEditedRecord(record)"> Save <span class="uk-margin-small-left" uk-icon="play-circle"></span></button>
                <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="cancelEditRecord(record)"> Cancel <span class="uk-margin-small-left" uk-icon="ban"></span></button>
              </td>
              <td v-else class="uk-flex uk-flex-around">
                <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="EditRecord (record)"> Edit <span class="uk-margin-small-left" uk-icon="file-edit"></span></button>
                <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="deleteRecord (record.id)"> Delete <span class="uk-margin-small-left" uk-icon="trash"></span></button>
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
      rows: [],
      modified_time: 0,
      uikit_Notification_Position: 'top-center'
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
    rows: function (newRows, oldRows) {
      const date = new Date();
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      const datetime = date.toLocaleDateString(undefined, options);
      const month = datetime.split(' ')[2];
      const year = datetime.split(' ')[3];
      this.rows.forEach(function (row) {
        row.datetime = datetime;
        row.month = month;
        row.year = year;
        row.id = Date.now();
      });
    },
    modified_time: function (oldModified, newModified) {
      this.getRecords();
    },
    uikit_Notification_Position: function (newPosition, oldPosition) {
      if (window.innerWidth <= 340) { this.uikit_Notification_Position = 'bottom-center'; }
    }
  },
  methods: {
    EditRecord (record) {
      record.edit = true;
      this.rows.push();
    },
    cancelEditRecord (record) {
      record.edit = false;
      this.rows.pop();
    },
    saveEditedRecord (record) {
      store.dispatch('bills/editRecordAsync', record);
      record.edit = false;
      this.rows.pop();
    },
    addNewBill () {
      this.rows.push({});
    },
    cancelNewRecord (index) {
      this.rows.splice(index, 1);
    },
    saveNewRecord (index) {
      if (Object.values(this.rows[index]).length >= 4) {
        store.dispatch('bills/addNewRecordAsync', this.rows[index]);
        this.rows.splice(index, 1);
        this.modified_time += 1;
      } else {
        UIkit.notification({ message: '<span  class="uk-margin-right" uk-icon="icon: info"></span> Imcompleted record cannot be save.', status: 'primary', pos: this.uikit_Notification_Position, timeout: 1000 });
      }
    },
    deleteRecord (id) {
      store.dispatch('bills/deleteRecordAsync', id);
      this.modified_time += 1;
    },
    getRecords () {
      UIkit.notification({ message: '<span  class="uk-margin-right" uk-icon="icon: info"></span> already refreshed', status: 'primary', pos: this.uikit_Notification_Position, timeout: 1000 });
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

    input,
    select,
    textarea {
      font-size: 16px;
    }

    input[type=number] {
      max-width: 60px;
    }

    .table-button{
        margin: 0 5px;
      }

    .row-datetime{
      width: 100%;
      height: 100%;
      border: none;
      background: none;
      font-size: 16px;
      text-align: center;
    }

    @media screen and (min-width: 345px) {
      .table-options{
        padding-right: 40px;
      }
    }
</style>
