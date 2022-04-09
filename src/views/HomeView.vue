<template>
  <div class="home">
    <h1 class="display-5" style="text-align: center;">Check Warranty Status</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Details or Click View All</h4>
    <hr class="my-4">
    <div class="card">
      <div class="card-header">
        <div class="container">
          <form @submit.prevent="handleSearch">
          <div class="row">
              <div class="col-4 my-auto">
                <label class="mx-3">Last Name</label><input type="text" class="form-control" v-model="lName" required>
              </div>
              <div class="col-4 my-auto">
                <label class="mx-3">Zip Code</label><input type="text" class="form-control" v-model="zip" pattern="^\d{5,5}" title="Enter a 5 Digit Zipcode" required>
              </div>
              <div class="col my-auto">
                <button class="btn btn-secondary">Search</button>
              </div>
              <div class="col my-auto">
                <button @click.prevent="handleViewAll" class="btn btn-secondary">View All Orders</button>
              </div>
          </div>
          </form>
        </div>
      </div>
      <div class="card-body">
        <div class="stickyHead" v-if="orders.length>0">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Zip Code</th>
                <th>Vehicle Year</th>
                <th>Vehicle Model</th>
                <th>Pickup Date</th>
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
                <!-- <td><button class="btn btn-secondary" @click="showOrderInfo(order.work_order_id, order.current_mileage)">View Details</button></td> -->
                <td>
                  <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="Order Details" src="../../src/assets/view2.png" @click="showOrderInfo(order.work_order_id, order.current_mileage)" style="width:25px;height:auto" /></a>
                  <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="Claims Details" src="../../src/assets/claims.png" @click="editClaimInfo(order.work_order_id)" data-toggle="modal" data-target="#claimsModal" style="width:25px;height:25px" /></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <!-- <teleport to="body"> -->
      <div id="overlay" v-if="showDetails">
        <div class="modal-dialog modal-lg modal-dialog-centered">
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
                  <strong>Completion Date:</strong> {{ formatDate(orderDate) }}
                </div>
                <div class="col mx-auto">
                  <strong>Mileage at Time of Service:</strong> {{ orderMileage }}
                </div>
              </div>
              <div class="row">
                <table class="table text-center mt-4">
                  <thead>
                    <tr>
                      <th>Service <br />Type</th>
                      <th>Warranty <br />Type</th>
                      <th>Expiration <br />Date</th>
                      <th>Expiration <br />Mileage</th>
                      <th>Number of <br />Warranty Claims</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="detail in orderDetails" :key="detail.work_order_id">
                      <td>{{ detail.service_type }}</td>
                      <td>{{ detail.warranty_name }}</td>
                      <td v-if="today<detail.work_order_expiration_date" style="color:green">{{ formatDate(detail.work_order_expiration_date) }}</td>
                      <td v-if="today>detail.work_order_expiration_date" style="color:red">{{ formatDate(detail.work_order_expiration_date) }}</td>
                      <td>{{ detail.work_order_expiration_mileage }}</td>
                      <td>{{ detail.NumberOfClaims }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal fade" id="claimsModal">
          <div class="modal-dialog modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title">Manage Claims</h5>
                    <button type="button" class="close" data-dismiss="modal" @click="newClaim=false, claimToAdd=[]">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                  <div class="row" v-if="editClaimDetails.claims.length>0">
                    <table class="table table-hover">
                      <thead>
                        <tr class="d-flex">
                          <th class="col-3">Service</th>
                          <th class="col-3">Claim Date</th>
                          <th class="col-2">Cost of Claim Work</th>
                          <th class="col-3">Notes</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr class="d-flex" v-for="(detail, index) in editClaimDetails.claims" :key="detail.warranty_claim_id">
                          <td class="col-3">{{ detail.service_type }}</td>
                          <td class="col-3">{{ formatDate(detail.warranty_claim_date) }}</td>
                          <td class="col-2">${{ detail.warranty_claim_amount }}</td>
                          <td class="col-3">{{ detail.warranty_claim_notes }}</td>
                          <td class="col-1">
                            <button v-b-tooltip.hover title="Remove Claim" type="button" class="close" @click="handleRemoveClaim(index, detail.warranty_claim_id, detail.warranty_claim_date, detail.warranty_claim_amount)">
                                <span aria-hidden="true">&times;</span>
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div v-else class="row">
                    <span class="noClaims">No warranty claims on record.</span>
                  </div>
                  <div class="row mt-3 text-center">
                    <div class="col">
                      <button class="btn btn-outline-secondary btn-sm" style="width:200px" @click="newClaim=true">Add New Claim</button>
                    </div>
                  </div>
                  <div v-if="newClaim">
                    <form @submit.prevent="addClaim">
                      <div class="row mt-5">
                        <div class="col-10">
                          <div class="row">
                            <div class="col">
                              <label>Service</label><br />
                                <select class="form-select" v-model="claimToAdd.service_type" required>
                                  <option v-for="service in existingServices" v-bind:key="service.service_type" v-bind:value="{work_order_line_id:service.work_order_line_id,service_type:service.service_type}">
                                    {{ service.service_type }}
                                  </option>
                                </select>
                            </div>
                            <div class="col">
                              <label>Claim Date</label><br />
                              <input type="date" class="form-control" v-model="claimToAdd.warranty_claim_date" required>
                            </div>
                            <div class="col">
                              <label>Claim Cost</label><br />
                              <div class="input-group">
                                <span class="input-group-text">$</span>
                                <input type="number" class="form-control" v-model="claimToAdd.warranty_claim_amount" required>
                              </div>
                            </div>
                          </div>
                          <div class="row mt-2">
                            <div class="col">
                              <label>Claim Notes</label><br />
                              <input type="text" class="form-control" v-model="claimToAdd.warranty_claim_notes">
                            </div>
                          </div>
                        </div>
                        <div class="col-2 my-auto">
                          <button type="submit" class="mx-1" v-b-tooltip.hover title="Add Claim">
                            <span aria-hidden="true">&#10003;</span>
                          </button>
                          <button type="button" class="mx-1" @click="newClaim=false, claimToAdd = []" v-b-tooltip.hover title="Cancel">
                            <span aria-hidden="true">&times;</span>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div class="modal-footer">
                  <div class="row">
                    <div class="col">
                      <button type="button" class="btn btn-outline-danger btn mx-2" data-dismiss="modal">Cancel</button>
                      <button type="button" class="btn btn-secondary btn mx-2" @click="handleSaveClaims" data-dismiss="modal">Save Claim Details</button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
      <!-- </teleport> -->
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
      lName: '',
      zip: '',
      orders: [],
      orderDetails: [],
      existingServices: [],
      editClaimDetails: {
        claims: []
      },
      claimToAdd: [],
      claimDetails: [],
      orderDate: '',
      orderMileage: '',
      showDetails: false,
      today: '',
      expired: true,
      newClaim: false
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
        console.log(this.orderDetails)
        this.orderDate = this.orderDetails[0].pickup_date
        this.orderMileage = currentMileage
        console.log(this.expired)
      }).catch(error => {
        console.log(error)
      })
      this.showDetails = true
    },
    editClaimInfo (orderId) {
      const apiURL = `http://localhost:3000/getClaimDetails/${orderId}`
      const apiURL2 = `http://localhost:3000/getOrderDetails/${orderId}`
      this.existingServices = []

      axios.get(apiURL2).then((res) => {
        for (const order of res.data) {
          const service = {
            service_type: order.service_type,
            work_order_line_id: order.work_order_line_id
          }
          this.existingServices.push(service)
        }
      })
      axios.get(apiURL).then((res) => {
        this.editClaimDetails = {
          claims: [],
          claimsToAdd: [],
          claimsToRemove: []
        }
        for (const claim of res.data) {
          this.editClaimDetails.claims.push(claim)
        }
        console.log(this.editClaimDetails)
      })
    },
    addClaim () {
      if (this.claimToAdd.warranty_claim_notes) {
        this.editClaimDetails.claimsToAdd.push({
          work_order_line_id: this.claimToAdd.service_type.work_order_line_id,
          warranty_claim_date: this.claimToAdd.warranty_claim_date,
          warranty_claim_amount: this.claimToAdd.warranty_claim_amount,
          warranty_claim_notes: this.claimToAdd.warranty_claim_notes
        })
      } else {
        this.editClaimDetails.claimsToAdd.push({
          work_order_line_id: this.claimToAdd.service_type.work_order_line_id,
          warranty_claim_date: this.claimToAdd.warranty_claim_date,
          warranty_claim_amount: this.claimToAdd.warranty_claim_amount
        })
      }
      this.editClaimDetails.claims.push({
        service_type: this.claimToAdd.service_type.service_type,
        warranty_claim_date: this.claimToAdd.warranty_claim_date,
        warranty_claim_amount: this.claimToAdd.warranty_claim_amount,
        warranty_claim_notes: this.claimToAdd.warranty_claim_notes
      })
      this.claimToAdd = []
      this.newClaim = false
    },
    handleRemoveClaim (index, id, date, amount) {
      if (id) {
        this.editClaimDetails.claimsToRemove.push(id)
      } else {
        for (const claim of this.editClaimDetails.claimsToAdd) {
          if (date === claim.warranty_claim_date && amount === claim.warranty_claim_amount) {
            claim.isDeleted = true
          }
        }
      }
      this.editClaimDetails.claims.splice(index, 1)
    },
    handleSaveClaims () {
      axios.put('http://localhost:3000/updateClaims', this.editClaimDetails).then((res) => {
        location.reload()
      }).catch(error => {
        console.log(error)
      })
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
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 1;
}
.stickyHead {
  overflow: auto;
  max-height: 375px;
}

.stickyHead thead th {
  position: sticky;
  top: 0;
  /* z-index: 1; */
  background: #ffffff;
}
.stickyHead table {
  border-collapse: separate;
  border-spacing: 0;
}
.stickyHead thead th {
  border-top: none !important;
  border-bottom: none !important;
  box-shadow: inset 0 -2px 0 #000000;
}
</style>
