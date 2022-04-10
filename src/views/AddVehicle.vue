<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Add New Vehicle</h1>
        <hr class="my-4">
        <div class="card my-5">
            <div class="card-header">
                <h4>Select Vehicle Owner</h4>
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
                        <button @click="handleViewAll" class="btn btn-secondary">View All Customers</button>
                    </div>
                </div>
                <div class="stickyHead" v-if="customers.length>0">
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
                                <td><button class="btn btn-secondary" @click="handleCustomer(customer.customer_id, customer.customer_first_name, customer.customer_last_name, customer.customer_phone)">Select</button></td>
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
        <div class="card mt-5" v-if="customerSelected">
          <form @submit="handleSubmit">
            <div class="card-header py-3" id="details">
                <h4>Enter Vehicle Details</h4>
            </div>
            <div class="card-body px-5">
              <div class="row">
                <div class="col-md-3">
                  <h5>Owner Information</h5>
                </div>
                <div class="col-md-9">
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label for="customerName" class="form-label">Name</label>
                      <input id="customerName" type="text" class="form-control" v-model="fullName" disabled>
                    </div>
                    <div class="col-md-6">
                      <label for="customerPhone" class="form-label">Phone Number</label>
                      <input id="customerPhone" type="text" class="form-control" v-model="customerPhone" disabled>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="my-4" />
              <div class="row">
                <div class="col-md-3">
                  <h5>Vehicle Information</h5>
                  <p class="text-muted">All fields required</p>
                </div>
                <div class="col-md-9">
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <label for="vin" class="form-label">VIN</label>
                      <input type="text" id="vin" class="form-control" v-model="vehicleDetails.vehicle_vin_number" required>
                    </div>
                    <div class="col-md-3">
                      <label for="year" class="form-label">Year</label>
                      <input type="text" id="year" class="form-control" v-model="vehicleDetails.vehicle_year" required>
                    </div>
                    <div class="col-md-3">
                      <label for="color" class="form-label">Color</label>
                      <select id="color" class="form-select" v-model="vehicleDetails.color_id" required>
                          <option v-for="color in colors" v-bind:key="color.color_id" v-bind:value="color.color_id">
                              {{ color.color_name }}
                          </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-6">
                      <label for="make" class="form-label">Make</label>
                      <select id="make" class="form-select" v-model="vehicleMake" @change="makeSelected(vehicleMake)" required>
                          <option disabled value="">Choose. . .</option>
                          <option v-for="make in makes" v-bind:key="make.make_id" v-bind:value="make.make_id">
                              {{ make.make_name }}
                          </option>
                      </select>
                    </div>
                    <div class="col-md-6">
                      <label for="model" class="form-label">Model</label>
                      <select id="model" class="form-select" v-model="vehicleDetails.model_id" required>
                          <option disabled value="">Choose Make. . .</option>
                          <option v-for="model in models" v-bind:key="model.model_id" v-bind:value="model.model_id">
                              {{ model.model_name }}
                          </option>
                      </select>
                    </div>
                  </div>
                  <div class="row mb-4">
                    <div class="col-md-3">
                      <label for="lpState" class="form-label">License Plate State</label>
                      <select id="lpState" class="form-select" v-model="vehicleDetails.vehicle_license_plate_state_id" required>
                            <option v-for="state in states" v-bind:key="state.vehicle_license_plate_state_id" v-bind:value="state.vehicle_license_plate_state_id">
                                {{ state.vehicle_license_plate_state_name }}
                            </option>
                      </select>
                    </div>
                    <div class="col-md-3">
                      <label for="lpNum" class="form-label">License Plate Number</label>
                      <input id="lpNum" type="text" class="form-control pe-5" v-model="vehicleDetails.vehicle_license_plate_num" required>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <div class="row justify-content-center">
                  <button class="btn btn-secondary my-3" style="width:200px;">Save Vehicle</button>
              </div>
            </div>
          </form>
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
      fullName: '',
      customerPhone: '',
      phoneSearch: '',
      makes: '',
      models: '',
      colors: '',
      states: '',
      vehicleDetails: {
        customer_id: '',
        model_id: '',
        vehicle_status_id: 1,
        color_id: '',
        vehicle_license_plate_state_id: '',
        vehicle_vin_number: '',
        vehicle_license_plate_num: '',
        vehicle_year: ''
      }
    }
  },
  created () {
    console.log(this.customers)
    const apiURL = 'http://localhost:3000/getMakes'
    const apiURL2 = 'http://localhost:3000/getColors'
    const apiURL3 = 'http://localhost:3000/getStates'

    axios.get(apiURL).then((res) => {
      this.makes = res.data
    }).catch(error => {
      console.log(error)
    })

    axios.get(apiURL2).then((res) => {
      this.colors = res.data
    }).catch(error => {
      console.log(error)
    })

    axios.get(apiURL3).then((res) => {
      this.states = res.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleCustomer (customerId, customerFirstName, customerLastName, customerPhone) {
      this.vehicleDetails.customer_id = customerId
      this.fullName = customerFirstName + ' ' + customerLastName
      this.customerPhone = customerPhone
      this.customerSelected = true
      this.$nextTick(() => {
        const elmt = document.getElementById('details')
        elmt.scrollIntoView(true)
      })
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
    },
    makeSelected (vehicleMake) {
      const apiURL = `http://localhost:3000/getModels/${vehicleMake}`

      axios.get(apiURL).then((res) => {
        this.models = res.data
      })
    },
    handleSubmit () {
      const apiURL = 'http://localhost:3000/createVehicle'

      axios.post(apiURL, this.vehicleDetails).then((res) => {
        this.$router.push('/AddVehicle')
      }).catch(error => {
        console.log(error)
      })
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

.stickyHead {
  overflow: auto;
  max-height: 375px;
}

.stickyHead thead th {
  position: sticky;
  top: 0;
  z-index: 1;
  background: #ffffff;
}
table {
  border-collapse: separate;
  border-spacing: 0;
}
table thead th {
  border-top: none !important;
  border-bottom: none !important;
  box-shadow: inset 0 -2px 0 #000000;
}
label {
  font-weight: 500;
}

</style>
