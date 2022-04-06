<template>
  <div>
    <h1 class="display-5" style="text-align: center;">Deleted Work Orders</h1>
    <hr class="my-4">
    <div class="card">
      <div class="card-header">
          <h6>View Details of Deleted Work Orders</h6>
      </div>
      <div class="card-body">
        <table class="table table-hover">
            <thead>
                <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Zip Code</th>
                <th>Vehicle Year</th>
                <th>Vehicle Model</th>
                <th>Service Date</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="order in orders" :key="order.work_order_id">
                    <td>{{ order.customer_first_name }}</td>
                    <td>{{ order.customer_last_name }}</td>
                    <td>{{ order.customer_zipcode }}</td>
                    <td>{{ order.vehicle_year }}</td>
                    <td>{{ order.model_name }}</td>
                    <td>{{ formatDate(order.pickup_date) }}</td>
                    <!-- <td><button class="btn btn-secondary" @click="showOrderInfo(order.work_order_id, order.current_mileage)">View/Edit Details</button></td> -->
                    <td>
                        <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="View Details" src="../../src/assets/view2.png" @click="showOrderInfo(order.work_order_id, order.current_mileage)" style="width:25px;height:25px" /></a>
                        <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="Restore" src="../../src/assets/restore.png" @click="restoreOrder(order.work_order_id)" style="width:25px;height:25px" type="button" data-toggle="modal" data-target="#restoreOrderModal" /></a>
                    </td>
                </tr>
            </tbody>
        </table>
      </div>
    </div>
    <div class="modal fade" id="restoreOrderModal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body">
                    <div class="row text-center">
                        <strong>Are you sure you want to restore this order?</strong>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary btn-sm mx-2" data-dismiss="modal" @click="restoreDetails = []">Cancel</button>
                    <button type="button" class="btn btn-danger btn-sm mx-2" @click="confirmRestore">Confirm</button>
                </div>
            </div>
        </div>
    </div>
    <div id="overlay" v-if="showDetails">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">View Service Order Details</h5>
              <button type="button" class="close" @click="showDetails=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-4">
              <div class="row my-4">
                <div class="col mx-auto">
                  <strong>Pickup Date:</strong> {{ formatDate(orderDate) }}
                </div>
                <div class="col mx-auto">
                  <strong>Mileage at Time of Service:</strong> {{ orderMileage }}
                </div>
              </div>
              <div class="row">
                <table class="table text-center">
                  <thead>
                    <tr>
                      <th>Service Type</th>
                      <th>Warranty Type</th>
                      <th>Expiration Date</th>
                      <th>Expiration Mileage</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detail in orderDetails" :key="detail.work_order_id">
                      <td>{{ detail.service_type }}</td>
                      <td class="text-center">{{ detail.warranty_name }}</td>
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
  </div>
</template>
<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      today: '',
      orders: [],
      orderDetails: [],
      orderDate: '',
      orderMileage: '',
      restoreDetails: [],
      showDetails: false
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getDeletedOrders'

    axios.get(apiURL).then((res) => {
      this.orders = res.data
    }).catch(error => {
      console.log(error)
    })
    this.today = moment().format('YYYY-MM-DD')
  },
  methods: {
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    restoreOrder (orderID) {
      this.restoreDetails = orderID
    },
    confirmRestore () {
      axios.put(`http://localhost:3000/restoreOrder/${this.restoreDetails}`).then(() => {
        location.reload()
      })
    },
    showOrderInfo (orderId, currentMileage) {
      const apiURL = `http://localhost:3000/getOrderDetails/${orderId}`
      axios.get(apiURL).then((res) => {
        this.orderDetails = res.data
        this.orderDate = this.orderDetails.pickup_date
        this.orderMileage = currentMileage
        console.log(this.expired)
      }).catch(error => {
        console.log(error)
      })
      this.showDetails = true
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

.detailsHead {
  font-weight: 500;
}
</style>
