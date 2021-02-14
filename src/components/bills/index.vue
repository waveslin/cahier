<template>
    <section id='bills' class="">

      <div class="uk-padding uk-panel">
        <p class="uk-h4">Secondary</p>
       <table class="uk-table uk-table-hover uk-table-justify uk-table-divider uk-table-striped">
         <thead>
           <tr>
             <td>Type</td>
             <td>Amount</td>
             <td>Date</td>
             <td>Reason</td>
             <td>Options</td>
           </tr>
         </thead>
         <tbody>
           <tr v-for="(record, index) in getRoute" :key="`bill-${index}`">
             <td>{{record.category}}</td>
             <td>{{record.amount}}</td>
             <td>{{record.date}}</td>
             <td>{{record.reason}}</td>
             <td>
              <button>Edit</button>
              <button>Delete</button>
             </td>
           </tr>
         </tbody>
       </table>
      </div>
    </section>
</template>

<script>
import store from '../../store/index';

console.log(store);
export default {
  name: 'Bills',
  props: {},
  components: {},
  data () {
    return {};
  },
  computed: {
    getRoute () {
      return store.getters['bills/getRecords']; // get state
    }
  },
  watch: {},
  methods: {
    getRecordsAsync () {
      // store.dispatch('bills/getRecordsAsync');
    }
  },
  created () {},
  mounted () {
    store.dispatch('bills/getRecordsAsync');
  }
};
</script>

<style>
    section#bills{
      /* background-color: #b41515; */
      border: 2px solid #444;
      min-height: 100vh;
      height: 100%;
      box-sizing: border-box;
    }
</style>
