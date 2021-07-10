<template>
    <section id='bills' class="uk-card-secondary">
      <div class="uk-padding uk-panel">
        <h4 class="uk-heading-line uk-text-center uk-heading-small"><span>Jobs</span></h4>
      </div>
      <div class="uk-flex uk-flex-right uk-text-nowrap table-options">
        <button class="uk-button uk-button-default uk-text-middle uk-margin-small-right" type="button" v-on:click="refreshRecords()">Refresh <span class="uk-margin-small-left" uk-icon="refresh"></span></button>
        <button class="uk-button uk-button-default uk-text-middle uk-margin-small-left" type="button" v-on:click="addNewBill()">Add Bill <span class="uk-margin-small-left" uk-icon="plus"></span></button>
      </div>
      <div class="uk-padding uk-panel uk-overflow-auto">
       <table class="uk-table uk-table-hover uk-table-justify uk-table-divider uk-table-striped">
         <thead>
           <tr>
             <td><h3>Title</h3></td>
             <td><h3>Company</h3></td>
             <td><h3>Location</h3></td>
             <td><h3>Stage</h3></td>
             <td><h3>Status</h3></td>
             <td><h3>Options</h3></td>
           </tr>
         </thead>
         <tbody>

           <tr v-for="(row, index) in rows" :key="`new-bill-${index}`" :id="`new_bill_${index}`">

            <td><input type="number" :id="`amount_${index}`" v-model="row.amount" /> </td>

            <td><input type="number" :id="`amount_${index}`" v-model="row.amount" /> </td>

            <td><input type="number" :id="`amount_${index}`" v-model="row.amount" /> </td>

            <td>
              <select :id="`category_${index}`" v-model="row.category" >
                <option v-for="(option, index) in getCategoryOptions" :key="`categories-${index}`">{{option}}</option>
              </select>
            </td>

            <td>
              <select :id="`category_${index}`" v-model="row.category" >
                <option v-for="(option, index) in getCategoryOptions" :key="`categories-${index}`">{{option}}</option>
              </select>
            </td>

            <td class="uk-flex uk-flex-around" :id="`options_${index}`">
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="saveNewRecord(index)"> Save <span class="uk-margin-small-left" uk-icon="play-circle"></span></button>
              <button class="uk-button uk-button-default uk-text-middle uk-text-nowrap table-button" type="button" v-on:click="cancelNewRecord(index)"> Cancel <span class="uk-margin-small-left" uk-icon="ban"></span></button>
            </td>
           </tr>

           <tr v-for="(record, index) in getRecords" :key="`bill-${index}`">

            <td v-if="record.edit">$ <input type="number" v-model="record.amount" /> </td>
            <td v-else>$ {{record.amount}}</td>

            <td v-if="record.edit">$ <input type="number" v-model="record.amount" /> </td>
            <td v-else>$ {{record.amount}}</td>

            <td v-if="record.edit">$ <input type="number" v-model="record.amount" /> </td>
            <td v-else>$ {{record.amount}}</td>

            <td v-if="record.edit">
              <select v-model="record.category" >
                <option v-for="(option, index) in getCategoryOptions" :key="`categories-${index}`">{{option}}</option>
              </select>
            </td>
            <td v-else>{{record.category}}</td>

            <td v-if="record.edit">
              <select v-model="record.category" >
                <option v-for="(option, index) in getCategoryOptions" :key="`categories-${index}`">{{option}}</option>
              </select>
            </td>
            <td v-else>{{record.category}}</td>

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
      <div class="uk-flex uk-flex-right uk-text-nowrap table-options bottom-table-options" v-if="getRecords.length > 0">
        <button class="uk-button uk-button-default uk-text-middle uk-margin-small-right" type="button" uk-toggle="target: #download_bills"> Download CSV <span class="uk-margin-small-left" uk-icon="download"></span></button>
      </div>
      <div id="download_bills" uk-modal>
          <div class="uk-modal-dialog uk-modal-body">
              <h2 class="uk-modal-title">Download CSV Files</h2>
              <div>
                <select v-model="download_csv" >
                  <option v-for="({ year, month }, index) in year_month_list" :key="`year-month-${index}`" >{{year}} - {{month.toString().padStart(2, '0')}}</option>
                </select>
              </div>
              <div class="uk-flex uk-flex-right uk-text-nowrap">
                <button class="uk-modal-close" type="button">Download</button>
                <button class="uk-modal-close" type="button">Cancel</button>
              </div>
          </div>
      </div>
    </section>
</template>

<script>
import UIkit from 'uikit';
import store from '../../store/index';

export default {
  name: 'Jobs',
  props: {},
  components: {},
  data () {
    return {
      rows: [],
      modified_time: 0,
      download_csv: {},
      year_month_list: [],
      uikit_Notification_Position: 'top-center'
    };
  },
  computed: {
    getRecords () {
      return store.getters['bills/getRecords']; // get state
    },
    getCategoryOptions () {
      return store.getters['options/getCategoryOptions'];
    },
    getDateLocale () {
      return store.getters['formats/getDateLocale'];
    },
    getDateFormat () {
      return store.getters['formats/getDateFormat'];
    }
  },
  watch: {
    rows: function (newRows, oldRows) {
      const date = new Date();
      this.rows.forEach(function (row) {
        row.month = date.getMonth() + 1;
        row.year = date.getFullYear();
        row.bill_date = [row.year.toString(), row.month.toString().padStart(2, '0'), date.getDate().toString().padStart(2, '0')].join('-');
        row.id = Date.now();
      });
    },
    getRecords: function (oldRecords, newRecords) {
      var list = newRecords.map(function ({ year, month }) { return { year, month }; });

      this.year_month_list = [...new Set(list)];
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
      if (!record.bill_date.toString().includes(store.getters['bills/getInitialHMS'])) {
        record.bill_date = record.bill_date.toString().split()[0] + store.getters['bills/getInitialHMS'];
      }
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
      const row = this.rows[index];
      const validation = Object.values(row).every(function (value) { return value !== null && value !== undefined; });
      const hasAllProp = ['bill_date', 'description', 'category'].every(function (key) { return key in row; });
      const hasAmount = 'amount' in row && Number(row.amount) > 0;
      if (validation && hasAllProp && hasAmount) {
        this.rows[index].amount = Number(row.amount);
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
    refreshRecords () {
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

    .row-datetime,
    .row-datetime:focus{
      width: 100%;
      height: 100%;
      border: none;
      outline: none;
      background: none;
      font-size: 16px;
      text-align: center;
    }

    @media screen and (min-width: 345px) {
      .table-options{
        padding-right: 40px;
      }
    }

    @media screen and (max-width: 750px) {
      .bottom-table-options{
        justify-content: center;
      }

      .bottom-table-options button {
        margin: 0 !important;
      }
    }
</style>
