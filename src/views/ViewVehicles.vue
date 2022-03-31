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
                <button @click.prevent="handleVinSearch" class="btn btn-secondary mx-2">Search</button>
              </div>
              <div class="col-5 my-auto">
                <label class="mx-2">Customer Phone Number:</label><input type="text" v-model="phoneSearch">
                <button @click.prevent="handlePhoneSearch" class="btn btn-secondary mx-2">Search</button>
              </div>
              <div class="col my-auto d-flex justify-content-end px-5">
                <button @click.prevent="handleViewAll" class="btn btn-secondary">View All</button>
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
                <router-link :to="{name: 'EditCustomer', params: { id: vehicle.vehicle_id }}" class="btn btn-secondary">View/Edit Details</router-link>
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
      vehicles: [],
      vinSearch: '',
      phoneSearch: ''
    }
  },
  created () {

  },
  methods: {
    // handleVinSearch () {
    //   const vinSearch = this.vinSearch
    //   const apiURL = `http://localhost:3000/searchCustomer/${phoneSearch}`

    //   axios.get(apiURL).then((res) => {
    //     this.customers = res.data
    //   }).catch(error => {
    //     console.log(error)
    //   })
    //   this.phoneSearch = ''
    // },
    // handlePhoneSearch () {
    //   const phoneSearch = this.phoneSearch
    //   const apiURL = `http://localhost:3000/searchCustomer/${phoneSearch}`

    //   axios.get(apiURL).then((res) => {
    //     this.customers = res.data
    //   }).catch(error => {
    //     console.log(error)
    //   })
    //   this.phoneSearch = ''
    // },
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
    }
  }
}
</script>
