<template>
  <div>
    <h1 class="display-5" style="text-align: center;">View Vehicles</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Vehicle VIN or Customer Phone Number</h4>
    <hr class="my-4">
    <div class="card">
      <div class="card-header">
        <div class="container">
          <div class="row d-flex">
              <div class="col-4 my-auto">
                <label class="mx-2">Vehicle VIN:</label><input type="text" v-model="vinSearch">
                <button @click="handleVinSearch" class="btn btn-secondary mx-2">Search</button>
              </div>
              <div class="col-5 my-auto">
                <label class="mx-2">Customer Phone Number:</label><input type="text" v-model="phoneSearch">
                <button @click="handlePhoneSearch" class="btn btn-secondary mx-2">Search</button>
              </div>
              <div class="col my-auto d-flex justify-content-end px-5">
                <button @click="handleViewAll" class="btn btn-secondary">View All</button>
              </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <table class="table">
          <thead>
            <tr>
              <th>Owner</th>
              <th>VIN</th>
              <th>Year</th>
              <th>Make</th>
              <th>Model</th>
              <th>View Details</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="vehicle in vehicles" :key="vehicle.vehicle_id">
              <td>{{ vehicle.owner_name }}</td>
              <td>{{ vehicle.vehicle_vin_number }}</td>
              <td>{{ vehicle.vehicle_year }}</td>
              <td>{{ vehicle.make_name }}</td>
              <td>{{ vehicle.model_name }}</td>
              <td>
                <button class="btn btn-secondary" @click="showVehicleDetails(vehicle.vehicle_id)">View/Edit Details</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div id="overlay" v-if="showDetails">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">View/Edit Vehicle Details</h5>
              <button type="button" class="close" @click="showDetails=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body p-4">
                <div class="form-group">
                    <form @submit.prevent="handleEdit">
                        <div class="row">
                            <label class="detail-item col-3 my-auto">Owner:</label>
                            <div class="col my-auto pe-5">
                                <input type="text" class="form-control" v-model="vehicleDetails.owner_name" disabled>
                            </div>
                        </div>
                        <div class="row">
                            <label class="detail-item col-3 my-auto">Make:</label>
                            <div class="col my-auto pe-5">
                                <input type="text" class="form-control" v-model="vehicleDetails.make_name" disabled>
                            </div>
                        </div>
                        <div class="row pb-5">
                            <label class="detail-item col-3 my-auto">Model:</label>
                            <div class="col my-auto pe-5">
                                <input type="text" class="form-control" v-model="vehicleDetails.model_name" disabled>
                            </div>
                        </div>
                        <div class="row pb-2">
                            <label class="detail-item col-3 my-auto">VIN:</label>
                            <div class="col my-auto pe-5">
                                <input type="text" class="form-control" v-model="vehicleDetails.vehicle_vin_number">
                            </div>
                        </div>
                        <div class="row pb-2">
                            <label class="detail-item col-3 my-auto">Year:</label>
                            <div class="col my-auto pe-5">
                                <input type="text" class="form-control" v-model="vehicleDetails.vehicle_year">
                            </div>
                        </div>
                        <div class="row pb-2">
                            <label class="detail-item col-3 my-auto">Color:</label>
                            <div class="col my-auto pe-5">
                                <select class="form-control" v-model="vehicleDetails.color_id" required>
                                    <option disabled value="">Choose. . .</option>
                                    <option v-for="color in colors" v-bind:key="color.color_id" v-bind:value="color.color_id">
                                        {{ color.color_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div class="row pb-2">
                            <label class="detail-item col-3 my-auto">License Plate:</label>
                            <div class="col my-auto pe-5">
                                <input type="text" class="form-control" v-model="vehicleDetails.vehicle_license_plate_num">
                            </div>
                        </div>
                        <div class="row pb-2">
                            <label class="detail-item col-3 my-auto">Registered State:</label>
                            <div class="col my-auto pe-5">
                                <select class="form-control" v-model="vehicleDetails.vehicle_license_plate_state_id" required>
                                    <option disabled value="">Choose. . .</option>
                                    <option v-for="state in states" v-bind:key="state.vehicle_license_plate_state_id" v-bind:value="state.vehicle_license_plate_state_id">
                                        {{ state.vehicle_license_plate_state_name }}
                                    </option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <div class="row d-flex pt-3">
                                <div class="col d-flex justify-content-end">
                                <button @click="saveChanges" class="btn btn-secondary my-3" style="width:200px;">Save Changes</button>
                                </div>
                                <div class="col d-flex justify-content-start">
                                <button @click="cancelChanges" class="btn btn-secondary my-3" style="width:200px;">Cancel</button>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
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
      vehicles: [],
      vinSearch: '',
      phoneSearch: '',
      showDetails: false,
      vehicleDetails: {},
      colors: '',
      states: ''
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getColors'
    const apiURL2 = 'http://localhost:3000/getStates'

    axios.get(apiURL).then((res) => {
      this.colors = res.data
    }).catch(error => {
      console.log(error)
    })

    axios.get(apiURL2).then((res) => {
      this.states = res.data
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    handleVinSearch () {
      const vin = this.vinSearch
      const apiURL = `http://localhost:3000/getVehicleByVin/${vin}`

      axios.get(apiURL).then((res) => {
        this.vehicles = res.data
      }).catch(error => {
        console.log(error)
      })
      this.phoneSearch = ''
    },
    handlePhoneSearch () {
      const phoneSearch = this.phoneSearch
      const apiURL = `http://localhost:3000/getVehicleByPhone/${phoneSearch}`

      axios.get(apiURL).then((res) => {
        this.vehicles = res.data
      }).catch(error => {
        console.log(error)
      })
      this.vinSearch = ''
    },
    handleViewAll () {
      const apiURL = 'http://localhost:3000/getVehicles'
      axios.get(apiURL).then((res) => {
        this.vehicles = res.data
        console.log(this.customers)
      }).catch(error => {
        console.log(error)
      })
      this.phoneSearch = ''
      this.vinSearch = ''
    },
    showVehicleDetails (vehicleId) {
      const apiURL = `http://localhost:3000/getVehicleById/${vehicleId}`
      axios.get(apiURL).then((res) => {
        this.vehicleDetails = res.data[0]
      }).catch(error => {
        console.log(error)
      })
      this.showDetails = true
    },
    cancelChanges () {
      location.reload()
    },
    saveChanges () {
      const apiURL = `http://localhost:3000/updateVehicle/${this.vehicleDetails.vehicle_id}`
      console.log(this.vehicleDetails)

      axios.put(apiURL, this.vehicleDetails).then((res) => {
        location.reload()
      }).catch(error => {
        console.log(error)
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

.detail-item {
    font-weight: 500;
}
</style>
