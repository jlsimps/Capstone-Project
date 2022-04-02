<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Create New Work Order</h1>
        <hr class="my-4">
        <div class="card mt-3 mb-5">
            <div class="card-header">
                <h5>Select Vehicle for the Work order</h5>
            </div>
            <div class="card-body">
                <div class ="search row d-flex">
                    <div class="col-4 my-auto">
                        <label class="mx-2">Vehicle VIN:</label>
                        <input type="text" v-model="vinSearch">
                        <button @click="handleVinSearch" class="btn btn-secondary mx-2">Search</button>
                    </div>
                    <div class="col-5 my-auto">
                        <label class="mx-2">Customer Phone Number:</label>
                        <input type="text" v-model="phoneSearch">
                        <button @click="handlePhoneSearch" class="btn btn-secondary mx-2">Search</button>
                    </div>
                    <div class="col my-auto d-flex justify-content-end px-5">
                        <button @click="handleViewAll" class="btn btn-secondary">View All</button>
                    </div>
                </div>
                <div style="overflow-y:auto;max-height:375px;min-height:200px;">
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Select</th>
                                <th>Owner</th>
                                <th>VIN</th>
                                <th>Year</th>
                                <th>Make</th>
                                <th>Model</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="vehicle in vehicles" :key="vehicle.vehicle_id">
                                <td><button class="btn btn-secondary" @click="handleVehicle(vehicle.vehicle_id)">Select</button></td>
                                <td>{{ vehicle.owner_name }}</td>
                                <td>{{ vehicle.vehicle_vin_number }}</td>
                                <td>{{ vehicle.vehicle_year }}</td>
                                <td>{{ vehicle.make_name }}</td>
                                <td>{{ vehicle.model_name }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-if="vehicleSelected" class="card mt-5" id="details">
            <div class="card-body">
                <div>
                    <div class="container">
                        <div class="detailRow row py-1 px-1 mt-2 mb-4">
                            <div class="col">
                                <span class="detailHeader me-2">Customer:</span> {{ selectedVehicle.owner_name }}
                            </div>
                            <div class="col">
                                <span class="detailHeader me-2">Vehicle VIN:</span> {{ selectedVehicle.vehicle_vin_number }}
                            </div>
                            <div class="col">
                                <span class="detailHeader me-2">Vehicle Type:</span> {{ selectedVehicle.make_name }} {{ selectedVehicle.model_name }}
                            </div>
                        </div>
                        <div class="detailsBox row">
                            <form @submit.prevent="saveOrder">
                                <div class="row">
                                    <div class="detailsHead">
                                        Fill out order details below
                                        <hr class="mt-1 mb-0" />
                                    </div>
                                </div>
                                <div class="detailsForm">
                                    <div class="row px-5 mx-5 mt-4 mb-2">
                                        <div class="col-3 d-flex justify-content-end">
                                            <label>Mileage:</label>
                                        </div>
                                        <div class="col-9">
                                            <input type="number" class="form-control" v-model="mileage" required>
                                        </div>
                                    </div>
                                    <div class="row px-5 mx-5 my-2">
                                        <div class="col-3 d-flex justify-content-end">
                                            <label>Date of Customer Pick-Up:</label>
                                        </div>
                                        <div class="col-9">
                                            <input type="date" class="form-control" v-model="pickupDate" required>
                                        </div>
                                    </div>
                                    <div class="row mt-5 py-2">
                                        <div class="detailsHead col">
                                            Services Completed
                                        </div>
                                    </div>
                                    <div class="row">
                                        <hr class="mt-1 mb-0" />
                                    </div>
                                    <div class="row" style="min-height:100px">
                                        <div class="col">
                                            <table class="table table-hover table-sm">
                                                <thead>
                                                    <tr class="d-flex">
                                                        <th class="col-4">Service Type</th>
                                                        <th class="col-4">Warranty Type</th>
                                                        <th class="col-4">Remove</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr class="d-flex" v-for="(service, index) in servicesAdded" :key="service.service_id">
                                                        <td class="col-4"> {{ service.service_type.service_type }} </td>
                                                        <td class="col-4"> {{ service.warranty_name.warranty_name }} </td>
                                                        <td class="col-4">
                                                            <button type="button" class="close" @click="servicesAdded.splice(index, 1)">
                                                                <span aria-hidden="true">&times;</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col py-2">
                                            <button class="btn btn-secondary me-5" @click.prevent="addService">Add Service</button>
                                            <button class="btn btn-secondary ms-5">Save Order</button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id="overlay" v-if="serviceModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title px-5">Add Service to Order</h5>
                        <button type="button" class="close" @click="serviceModal=false">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <form @submit.prevent="serviceAdded">
                                <div class="container">
                                    <div class="row my-2">
                                        <div class="col">
                                            <label class="col px-5 d-flex justify-content-end">Service Type:</label>
                                        </div>
                                        <div class="col-8 d-flex justify-content-start pe-5">
                                            <select class="form-control" v-model="serviceDetails.service_type" required>
                                                <option v-for="service in services" v-bind:key="service.service_id" v-bind:value="{service_type: service.service_type, service_id: service.service_id}">
                                                    {{ service.service_type }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="row my-2">
                                        <div class="col">
                                            <label class="col px-5 d-flex justify-content-end">Warranty Option:</label>
                                        </div>
                                        <div class="col-8 d-flex justify-content-start pe-5">
                                            <select class="form-control" v-model="serviceDetails.warranty_name" required>
                                                <option v-for="warranty in warranties" v-bind:key="warranty.warranty_name" v-bind:value="{warranty_name: warranty.warranty_name, warranty_option_id: warranty.warranty_option_id}">
                                                    {{ warranty.warranty_name }}
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <hr class="mt-3 mb-0" />
                                    <div class="row mt-2">
                                        <div class="col">
                                            <button class="btn btn-secondary">Add Service</button>
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
      warranties: '',
      services: '',
      serviceModal: false,
      vehicles: [],
      selectedVehicle: {},
      vehicleId: '',
      vehicleSelected: false,
      mileage: '',
      pickupDate: '',
      orderDetails: [],
      serviceDetails: {},
      servicesAdded: []
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
      }).catch(error => {
        console.log(error)
      })
    },
    handleVehicle (vehicleId) {
      this.vehicleId = vehicleId
      const apiURL = `http://localhost:3000/getVehicleById/${vehicleId}`
      console.log(apiURL)

      axios.get(apiURL).then((res) => {
        this.selectedVehicle = res.data[0]
      }).catch(error => {
        console.log(error)
      })
      this.vehicleSelected = true
      this.$nextTick(() => {
        const elmt = document.getElementById('details')
        elmt.scrollIntoView(true)
      })
    },
    saveOrder () {
      const order = {
        vehicle_id: this.vehicleId,
        mileage: this.mileage,
        completion_date: this.pickupDate
      }
      axios.post('http://localhost:3000/createOrder', order).then((res) => {
        const orderId = res.data[0].work_order_id
        for (const service of this.servicesAdded) {
          service.order_id = orderId
        }
        axios.post('http://localhost:3000/addWorkOrderLines', this.servicesAdded).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        console.log(error)
      })
    },
    addService () {
      this.serviceModal = true
    },
    serviceAdded () {
      this.servicesAdded.push(this.serviceDetails)
      this.serviceDetails = {}
      this.serviceModal = false
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

.detailRow {
    border: 1px solid #e9e9e9;
    border-radius: 10px;
    background-color: #ececec;

}

.detailHeader {
    font-weight: 500;
    font-size: 1.1rem;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
}

.detailsHead {
    font-weight: 500;
}

.detailsBox {
    /* border: 1px solid #e9e9e9; */
    text-align: center;
}

#overlay {
  position: fixed;
  top: 9%;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.6);
}
</style>
