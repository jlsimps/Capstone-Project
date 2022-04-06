<template>
  <div>
    <h1 class="display-5" style="text-align: center;">View Customers</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Phone Number or Click View All</h4>
    <hr class="my-4">
    <div class="card">
      <div class="card-header">
        <div class="container">
          <form @submit.prevent="handleSearch">
          <div class="row d-flex">
              <div class="col-4 my-auto">
                <label class="mx-3">Phone Number:</label><input type="text" v-model="phoneSearch" placeholder="XXX-XXX-XXXX" pattern="^\d{3}-\d{3}-\d{4}$" title="XXX-XXX-XXXX" required>
              </div>
              <div class="col-2 my-auto d-flex justify-content-start">
                <button class="btn btn-secondary">Search</button>
              </div>
              <div class="col-6 my-auto d-flex justify-content-end px-5">
                <button @click.prevent="handleViewAll" class="btn btn-secondary">View All Customers</button>
              </div>
          </div>
          </form>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Last Name</th>
              <th>First Name</th>
              <th>Zip Code</th>
              <th>Phone Number</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.customer_id">
              <td>{{ customer.customer_last_name }}</td>
              <td>{{ customer.customer_first_name }}</td>
              <td>{{ customer.customer_zipcode }}</td>
              <td>{{ customer.customer_phone }}</td>
              <td>
                <router-link :to="{name: 'EditCustomer', params: { id: customer.customer_id }}">
                  <img src="../../src/assets/edit2.png" @click="showOrderInfo(order.work_order_id, order.current_mileage)" style="width:25px;height:25px" />
                </router-link>
              </td>
            </tr>
          </tbody>
        </table>
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
      phoneSearch: ''
    }
  },
  created () {

  },
  methods: {
    handleSearch () {
      const phoneSearch = this.phoneSearch
      const apiURL = `http://localhost:3000/searchCustomer/${phoneSearch}`

      axios.get(apiURL).then((res) => {
        this.customers = res.data
      }).catch(error => {
        console.log(error)
      })
      this.phoneSearch = ''
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
    }
  }
}
</script>
