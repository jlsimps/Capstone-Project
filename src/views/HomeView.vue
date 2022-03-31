<template>
  <div class="home">
    <h1 class="display-5" style="text-align: center;">Check Warranty Status</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Details or Click View All</h4>
    <hr class="my-4">
    <div class="card">
      <div class="card-header">
        <div class="container">
          <div class="row">
              <div class="col-4 my-auto">
                <label class="mx-3">Last Name</label><input type="text" class="form-control" v-model="lName" required>
              </div>
              <div class="col-4 my-auto">
                <label class="mx-3">Zip Code</label><input type="text" class="form-control" v-model="zip" required>
              </div>
              <div class="col my-auto">
                <button @click.prevent="handleSearch" class="btn btn-secondary">Search</button>
              </div>
              <div class="col my-auto">
                <button @click.prevent="handleViewAll" class="btn btn-secondary">View All Orders</button>
              </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table table-hover">
          <thead>
            <tr>
              <th>Order Number</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Zip Code</th>
              <th>Vehicle Year</th>
              <th>Vehicle Model</th>
              <th>Service Date</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="order in orders" :key="order.work_order_id">
              <td>{{ order.work_order_id }}</td>
              <td>{{ order.customer_first_name }}</td>
              <td>{{ order.customer_last_name }}</td>
              <td>{{ order.customer_zipcode }}</td>
              <td>{{ order.vehicle_year }}</td>
              <td>{{ order.model_name }}</td>
              <td>{{ formatDate(order.completion_date) }}</td>
              <td><button class="btn btn-secondary" @click="showOrderInfo(order.work_order_id, order.current_mileage)">View Details</button></td>
          </tr>
      </tbody>
        </table>
      </div>
      <teleport to="body">
      <div id="overlay" v-if="showDetails">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Service Order Details</h5>
              <button type="button" class="close" @click="showDetails=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-4">
              <div class="row my-4">
                <div class="col mx-auto">
                  <strong>Order Date:</strong> {{ formatDate(orderDate) }}
                </div>
                <div class="col mx-auto">
                  <strong>Mileage at Time of Service:</strong> {{ orderMileage }}
                </div>
              </div>
              <div class="row">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Months Covered</th>
                      <th>Miles Covered</th>
                      <th>Expiration Date</th>
                      <th>Expiration Mileage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detail in orderDetails" :key="detail.work_order_id">
                      <td>{{ detail.service_type }}</td>
                      <td>{{ detail.warranty_option_months }}</td>
                      <td>{{ detail.warranty_option_mileage }}</td>
                      <td v-if="today<detail.work_order_expiration_date" style="color:green">{{ formatDate(detail.work_order_expiration_date) }}</td>
                      <td v-if="today>detail.work_order_expiration_date" style="color:red">{{ formatDate(detail.work_order_expiration_date) }}</td>
                      <td>{{ detail.work_order_expiration_mileage }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      </teleport>
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
      lName: '',
      zip: '',
      orders: [],
      orderDetails: [],
      orderDate: '',
      orderMileage: '',
      showDetails: false,
      today: '',
      expired: true
    }
  },
  created () {
    this.today = moment().format('YYYY-MM-DD')
  },
  methods: {
    handleSearch () {
      const lName = this.lName
      const zip = this.zip
      const apiURL = `http://localhost:3000/searchOrder/${lName}/${zip}`

      axios.get(apiURL).then((res) => {
        this.orders = res.data
      }).catch(error => {
        console.log(error)
      })
      this.lName = ''
      this.zip = ''
    },
    handleViewAll () {
      const apiURL = 'http://localhost:3000/getOrders'
      axios.get(apiURL).then((res) => {
        this.orders = res.data
      }).catch(error => {
        console.log(error)
      })
      this.lName = ''
      this.zip = ''
    },
    showOrderInfo (orderId, currentMileage) {
      const apiURL = `http://localhost:3000/getOrderDetails/${orderId}`
      axios.get(apiURL).then((res) => {
        this.orderDetails = res.data
        this.orderDate = this.orderDetails.completion_date
        this.orderMileage = currentMileage
        console.log(this.expired)
      }).catch(error => {
        console.log(error)
      })
      this.showDetails = true
    },
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}
</script>
<style scoped>
#overlay {
  position: fixed;
  top: 9%;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
