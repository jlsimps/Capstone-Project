<template>
  <div class="home">
    <h1 class="display-5" style="text-align: center;">Existing Work Orders</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Last Name &amp; Zip Code or Click View All</h4>
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
              <th>Details</th>
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
              <!-- <td><button class="btn btn-secondary" @click="showOrderInfo(order.work_order_id, order.current_mileage)">View/Edit Details</button></td> -->
              <td>
                  <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="View Details" src="../../src/assets/view2.png" @click="showOrderInfo(order.work_order_id, order.current_mileage)" style="width:25px;height:25px" /></a>
                  <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="Edit Details" src="../../src/assets/edit2.png" @click="editOrderInfo(order.work_order_id, order.current_mileage)" style="width:25px;height:25px" /></a>
              </td>
          </tr>
      </tbody>
        </table>
      </div>
      <teleport to="body">
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
                  <strong>Completion Date:</strong> {{ formatDate(orderDate) }}
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
      <div id="overlay" v-if="editDetails">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Service Order Details</h5>
              <button type="button" class="close" @click="editDetails=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-1">
              <div class="row mt-4 mb-5 text-center">
                <div class="col mx-auto">
                  <label><strong>Date:</strong></label>
                  <input class="form-control" type="date" v-model="this.editOrderDetails.completion_date">
                </div>
                <!-- <div class="col-4">
                </div> -->
                <div class="col mx-auto">
                  <label><strong>Mileage:</strong></label>
                  <input class="form-control me-1" type="number" v-model="this.editOrderDetails.current_mileage">
                </div>
                <!-- <div class="col-4">
                </div> -->
              </div>
              <hr class="mt-2 mb-0" />
              <div class="row mt-2 py-2">
                  <div class="col text-center detailsHead">
                      Services Completed
                  </div>
                <!-- <table class="table">
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
                </table> -->
              </div>
                <div class="row">
                    <div class="col">
                        <table class="table table-hover table-sm text-center">
                            <thead>
                                <tr class="d-flex">
                                    <th class="col-4">Service Type</th>
                                    <th class="col-4">Warranty Type</th>
                                    <th class="col-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr class="d-flex" v-for="(service, index) in editOrderDetails.services" :key="service.work_order_line_id">
                                    <td class="col-4"> {{ service.service_type}} </td>
                                    <td class="col-4"> {{ service.warranty_name}} </td>
                                    <td class="col-4">
                                        <button v-b-tooltip.hover title="Remove Service" type="button" class="close" @click="handleRemoveService(index, service.work_order_line_id, service.service_id, service.warranty_option_id)">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr class="d-flex" v-if="newService">
                                    <td class="col-4">
                                        <select class="form-select" v-model="serviceToAdd.service" required>
                                            <option v-for="service in services" v-bind:key="service.service_id" v-bind:value="{service_type: service.service_type, service_id: service.service_id}">
                                                {{ service.service_type }}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="col-4">
                                        <select class="form-select" v-model="serviceToAdd.warranty" required>
                                            <option v-for="warranty in warranties" v-bind:key="warranty.warranty_name" v-bind:value="{warranty_name: warranty.warranty_name, warranty_option_id: warranty.warranty_option_id}">
                                                {{ warranty.warranty_name }}
                                            </option>
                                        </select>
                                    </td>
                                    <td class="col-4">
                                        <button v-bind:disabled="!(Object.keys(this.serviceToAdd).length === 2)" type="button" class="mx-1" @click="handleAddService">
                                            <span aria-hidden="true">&#10003;</span>
                                        </button>
                                        <button type="button" class="mx-1" @click="newService=false, serviceToAdd = []">
                                            <span aria-hidden="true">&times;</span>
                                        </button>
                                    </td>
                                </tr>
                                <tr>
                                    <td>
                                        <button class="btn btn-outline-dark btn-sm" @click="newService=true">Add Service</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="row">
                    <div class="col text-center my-2">
                        <button class="btn btn-secondary me-2" @click="editDetails=false">Cancel Changes</button>
                        <button class="btn btn-secondary ms-2" @click="handleSaveChanges">Save Changes</button>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
      </teleport>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  name: 'HomeView',
  data () {
    return {
      serviceToAdd: {},
      newService: false,
      warranties: '',
      services: '',
      lName: '',
      zip: '',
      orders: [],
      orderDetails: [],
      editOrderDetails: [],
      orderDate: '',
      orderMileage: '',
      showDetails: false,
      editDetails: false,
      today: '',
      expired: true
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getServices'
    const apiURL2 = 'http://localhost:3000/getWarranties'

    axios.get(apiURL).then((res) => {
      this.services = res.data
    }).catch(error => {
      console.log(error)
    })
    axios.get(apiURL2).then((res) => {
      this.warranties = res.data
    }).catch(error => {
      console.log(error)
    })
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
    editOrderInfo (orderId) {
      const apiURL = `http://localhost:3000/getOrderDetails/${orderId}`
      axios.get(apiURL).then((res) => {
        this.editOrderDetails = {
          work_order_id: res.data[0].work_order_id,
          current_mileage: res.data[0].current_mileage,
          completion_date: this.formatDate(res.data[0].completion_date),
          services: [],
          deletedServices: [],
          addedServices: []
        }
        for (const service of res.data) {
          this.editOrderDetails.services.push(
            {
              work_order_line_id: service.work_order_line_id,
              service_type: service.service_type,
              service_id: service.service_id,
              warranty_name: service.warranty_name,
              warranty_option_id: service.warranty_option_id
            }
          )
        }
      }).catch(error => {
        console.log(error)
      })
      this.editDetails = true
    },
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    },
    handleRemoveService (index, id, serviceID, warrantyID) {
      if (id !== '') {
        this.editOrderDetails.deletedServices.push(id)
      } else {
        for (const service of this.editOrderDetails.addedServices) {
          if ((service.service_id === serviceID) && (service.warranty_option_id === warrantyID)) {
            service.isDeleted = true
          }
        }
        console.log(this.editOrderDetails.addedServices)
      }
      this.editOrderDetails.services.splice(index, 1)
    },
    handleAddService () {
      this.editOrderDetails.addedServices.push(
        {
          service_id: this.serviceToAdd.service.service_id,
          warranty_option_id: this.serviceToAdd.warranty.warranty_option_id,
          isDeleted: false
        }
      )
      //   this.editOrderDetails.addedServices.push(this.serviceToAdd)
      this.editOrderDetails.services.push(
        {
          work_order_line_id: '',
          service_type: this.serviceToAdd.service.service_type,
          service_id: this.serviceToAdd.service.service_id,
          warranty_name: this.serviceToAdd.warranty.warranty_name,
          warranty_option_id: this.serviceToAdd.warranty.warranty_option_id
        }
      )
      console.log(this.editOrderDetails)
      this.newService = false
      this.serviceToAdd = []
    },
    handleSaveChanges () {
      console.log(this.editOrderDetails)
      const apiURL = 'http://localhost:3000/updateWorkOrder'
      axios.put(apiURL, this.editOrderDetails).then(() => {
        // location.reload()
      })
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
