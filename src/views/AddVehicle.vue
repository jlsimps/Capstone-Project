<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Add New Vehicle</h1>
        <hr class="my-4">
        <div class="card">
            <div class="card-header">
                <h5>Select Vehicle Owner</h5>
            </div>
            <div class="card-body">
                <div class="search row d-flex">
                    <div class="col-4 my-auto" style="border-style:rounded">
                        <label class="mx-3">Phone Number</label><input type="text" v-model="phoneSearch">
                    </div>
                    <div class="col-2 my-auto d-flex justify-content-start">
                        <button @click.prevent="handleSearch" class="btn btn-secondary">Search</button>
                    </div>
                    <div class="col-6 my-auto d-flex justify-content-end px-5">
                        <button @click.prevent="handleViewAll" class="btn btn-secondary">View All Customers</button>
                    </div>
                </div>
                <div style="overflow-y:auto;max-height:375px;">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Last Name</th>
                                <th>First Name</th>
                                <th>Zip Code</th>
                                <th>Phone Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="customer in customers" :key="customer.customer_id">
                                <td><button class="btn btn-secondary" @click="handleCustomer(customer.customer_id)">Select</button></td>
                                <td>{{ customer.customer_last_name }}</td>
                                <td>{{ customer.customer_first_name }}</td>
                                <td>{{ customer.customer_zipcode }}</td>
                                <td>{{ customer.customer_phone }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios'

export default {
  data () {
    return {
      customers: [],
      customerSelected: false,
      customerId: '',
      phoneSearch: ''
    }
  },
  created () {
    // const apiURL = 'http://localhost:3000/getCustomers'

    // axios.get(apiURL).then((res) => {
    //   this.customers = res.data
    // }).catch(error => {
    //   console.log(error)
    // })
  },
  methods: {
    handleCustomer (customerId) {
      this.customer_id = customerId
      this.customerSelected = true
      console.log(this.customer_id)
    },
    handleViewAll () {
      const apiURL = 'http://localhost:3000/getCustomers'
      axios.get(apiURL).then((res) => {
        this.customers = res.data
        console.log(this.customers)
      }).catch(error => {
        console.log(error)
      })
      this.phoneSearch = ''
    },
    handleSearch () {
      const phoneSearch = this.phoneSearch
      const apiURL = `http://localhost:3000/searchCustomer/${phoneSearch}`

      axios.get(apiURL).then((res) => {
        this.customers = res.data
      }).catch(error => {
        console.log(error)
      })
      this.phoneSearch = ''
    }
  }
}
</script>
<style scoped>
.search {
    border-radius: 10px;
    border: 1px solid #e9e9e9;
    padding-top: 15px;
    padding-bottom: 15px;
    margin:20px;
    background-color: rgb(243, 243, 243);
}
</style>
