<template>
  <div>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>
    <h1 class="display-5" style="text-align: center;">View Vehicles</h1>
    <hr class="my-4">
    <h4 class="display-7" style="text-align: center;">Enter Vehicle VIN or Customer Phone Number</h4>
    <hr class="my-4">
    <div class="card">
      <div class="card-header py-4">
        <div class="container">
          <div class="row d-flex">
              <div class="col-4 my-auto">
                <form @submit.prevent="handleVinSearch">
                <label class="mx-2">Vehicle VIN:</label><input type="text" v-model="vinSearch" required>
                <button class="btn btn-secondary mx-2">Search</button>
                </form>
              </div>
              <div class="col-5 my-auto">
                <form @submit.prevent="handlePhoneSearch">
                <label class="mx-2">Customer Phone Number:</label><input type="text" v-model="phoneSearch" placeholder="XXX-XXX-XXXX" pattern="^\d{3}-\d{3}-\d{4}$" title="XXX-XXX-XXXX" required>
                <button class="btn btn-secondary mx-2">Search</button>
                </form>
              </div>
              <div class="col my-auto d-flex justify-content-end px-5">
                <button @click="handleViewAll" class="btn btn-secondary">View All</button>
              </div>
          </div>
        </div>
      </div>
      <div class="card-body">
        <div class="stickyHead">
          <table class="table table-hover">
            <thead>
              <tr>
                <th>Owner</th>
                <th>Year</th>
                <th>Make</th>
                <th>Model</th>
                <th>Color</th>
                <th>VIN</th>
                <th class="text-center">View Details</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="vehicle in vehicles" :key="vehicle.vehicle_id">
                <td>{{ vehicle.owner_name }}</td>
                <td>{{ vehicle.vehicle_year }}</td>
                <td>{{ vehicle.make_name }}</td>
                <td>{{ vehicle.model_name }}</td>
                <td>{{ vehicle.color_name }}</td>
                <td>{{ vehicle.vehicle_vin_number }}</td>
                <td class="text-center">
                  <a href="" @click.prevent class="mx-1"><img v-b-tooltip.hover title="View/Edit Details" src="../../src/assets/edit2.png" @click="showVehicleDetails(vehicle.vehicle_id)" style="width:25px;height:auto" /></a>
                  <!-- <button class="btn btn-secondary" @click="showVehicleDetails(vehicle.vehicle_id)">View/Edit Details</button> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div id="overlay" v-if="showDetails">
        <div class="modal-dialog modal-md">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">View/Edit Vehicle Details</h5>
              <button type="button" class="close" @click="showDetails=false">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
              <div class="form-group">
                  <form @submit.prevent="handleEdit">
                    <div class="modal-body p-4">
                      <div class="row d-flex justify-content-center">
                          <div class="row mb-3">
                            <label for="ownerName" class="col-sm-3 col-form-label d-flex justify-content-end">Owner:</label>
                            <div class="col-sm-8">
                              <input id="ownerName" type="text" class="form-control" v-model="vehicleDetails.owner_name" disabled>
                            </div>
                          </div>
                          <div class="row mb-3">
                            <label for="vehicle" class="col-sm-3 col-form-label d-flex justify-content-end">Vehicle:</label>
                            <div class="col-sm-8">
                              <input id="vehicle" type="text" class="form-control" v-model="vehicleType" disabled>
                            </div>
                          </div>
                      </div>
                      <hr class="my-4" />
                      <div class="row d-flex justify-content-center">
                        <div class="row mb-3">
                          <label for="vin" class="col-sm-3 col-form-label d-flex justify-content-end">VIN:</label>
                          <div class="col-sm-8">
                            <input id="vin" type="text" class="form-control" v-model="vehicleDetails.vehicle_vin_number" required>
                            <b-alert
                              class="mb-0 mt-2"
                              variant="danger"
                              dismissible
                              fade
                              v-model="showSameVinAlert"
                              @dismissed="showSameVinAlert=false"
                            >
                              <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                              Vin already in system!
                            </b-alert>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="year" class="col-sm-3 col-form-label d-flex justify-content-end">Year:</label>
                          <div class="col-sm-4">
                              <input id="year" type="text" class="form-control" v-model="vehicleDetails.vehicle_year" required>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="color" class="col-sm-3 col-form-label d-flex justify-content-end">Color:</label>
                          <div class="col-sm-4">
                              <select id="color" class="form-select" v-model="vehicleDetails.color_id" required>
                                <option v-for="color in colors" v-bind:key="color.color_id" v-bind:value="color.color_id">
                                    {{ color.color_name }}
                                </option>
                              </select>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="state" class="col-sm-3 col-form-label d-flex justify-content-end">State:</label>
                          <div class="col-sm-4">
                              <select id="state" class="form-select" v-model="vehicleDetails.vehicle_license_plate_state_id" required>
                                <option disabled value="">Choose. . .</option>
                                <option v-for="state in states" v-bind:key="state.vehicle_license_plate_state_id" v-bind:value="state.vehicle_license_plate_state_id">
                                    {{ state.vehicle_license_plate_state_name }}
                                </option>
                              </select>
                          </div>
                        </div>
                        <div class="row mb-3">
                          <label for="plate" class="col-sm-3 col-form-label d-flex justify-content-end">Plate #:</label>
                          <div class="col-sm-6">
                              <input type="text" class="form-control" v-model="vehicleDetails.vehicle_license_plate_num" required>
                          </div>
                        </div>
                      </div>
                        </div>
                        <div class="modal-footer">
                          <button @click="cancelChanges" class="btn btn-outline-danger mr-auto">Cancel</button>
                          <button @click="saveChanges" class="btn btn-secondary my-3">Save Changes</button>
                        </div>
                  </form>
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
      vehicleType: '',
      colors: '',
      states: '',
      activeVins: [],
      badVin: '',
      showSameVinAlert: false
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getColors'
    const apiURL2 = 'http://localhost:3000/getStates'
    const apiURL3 = 'http://localhost:3000/getVins'

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

    axios.get(apiURL3).then((res) => {
      for (const vin of res.data) {
        this.activeVins.push(vin.vehicle_vin_number)
      }
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
        this.vehicleType = res.data[0].make_name + ' ' + res.data[0].model_name
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

      if (this.activeVins.includes(this.vehicleDetails.vehicle_vin_number)) {
        this.badVin = this.vehicleDetails.vehicle_vin_number
        this.showSameVinAlert = true
      } else {
        axios.put(apiURL, this.vehicleDetails).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
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

label {
    font-weight: 500;
}
.stickyHead {
  overflow: auto;
  max-height: 400px;
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
