<template>
  <div class="home">
    <h1 class="display-5" style="text-align: center;">Check Warranty Status</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Details Below</h4>
    <hr class="my-4">
    <div class="card">
      <div class="card-header">
        <div class="container">
          <div class="row">
            <div class="col my-auto">
              <label class="mx-3">Last Name</label><input type="text">
            </div>
            <div class="col my-auto">
              <label class="mx-3">Zip Code</label><input type="text">
            </div>
            <div class="col">
              <button class="btn btn-secondary my-1">Search</button>
            </div>
          </div>
        </div>
      </div>
      <div class="card-body">
      </div>
    </div>
    <!-- <table class="table">
      <thead>
        <tr>
          <th>Order ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Vehicle Year</th>
          <th>Vehicle Model</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orders" :key="order.work_order_id">
          <td>{{ order.work_order_id }}</td>
          <td>{{ order.customer_first_name }}</td>
          <td>{{ order.customer_last_name }}</td>
          <td>{{ order.vehicle_year }}</td>
          <td>{{ order.model_name }}</td>
          <td>{{ formatDate(order.completion_date) }}</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'HomeView',
  data () {
    return {
      orders: []
    }
  },
  created () {
    axios.get('http://localhost:3000/recentOrders').then(res => {
      this.orders = res.data
      console.log(res.data)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
