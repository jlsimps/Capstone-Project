<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Edit Vehicle Information</h1>
        <hr class="my-4">
        <h4 class="display-7" style="text-align: center;">Please Fill Out the Details Below</h4>
        <hr class="my-4">
        <div class="card mb-5">
            <form @submit.prevent="handleEdit">
                <div class="form-group row py-3 px-5">
                    <label class="col-sm-2 col-form-label">Owner</label>
                    <div class="col-sm-10 mt-auto">
                        <input type="text" class="form-control pe-5" v-model="vehicle.owner_name" disabled>
                    </div>
                </div>
                <div class="form-group row py-3 px-5">
                    <label class="col-sm-2 col-form-label">Vehicle Year</label>
                    <div class="col-sm-10 mt-auto">
                        <input type="number" class="form-control pe-5" v-model="vehicle.vehicle_year">
                    </div>
                </div>
                <div class="form-group row pb-3 px-5">
                    <label class="col-sm-2 col-form-label">Select Make</label>
                    <div class="col-sm-10 my-auto">
                        <select class="form-control" v-model="vehicleMake" @change="makeSelected(vehicleMake)" required disabled>
                            <option disabled value="">Choose. . .</option>
                            <option v-for="make in makes" v-bind:key="make.make_id" v-bind:value="make.make_id">
                                {{ make.make_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group row pb-3 px-5">
                    <label class="col-sm-2 col-form-label">Select Model</label>
                    <div class="col-sm-10 my-auto">
                        <select class="form-control" v-model="vehicle.model_id" required>
                            <option disabled value="">Choose. . .</option>
                            <option v-for="model in models" v-bind:key="model.model_id" v-bind:value="model.model_id">
                                {{ model.model_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group row pb-3 px-5">
                    <label class="col-sm-2 col-form-label">Select Color</label>
                    <div class="col-sm-10 my-auto">
                        <select class="form-control" v-model="vehicle.color_id" required>
                            <option disabled value="">Choose. . .</option>
                            <option v-for="color in colors" v-bind:key="color.color_id" v-bind:value="color.color_id">
                                {{ color.color_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="form-group row pb-3 px-5">
                    <label class="col-sm-2 col-form-label">Vehicle VIN</label>
                    <div class="col-sm-10 mt-auto">
                        <input type="text" class="form-control pe-5" v-model="vehicle.vehicle_vin_number">
                    </div>
                </div>
                <div class="form-group row pb-3 px-5">
                    <label class="col-sm-2 col-form-label">License Plate #</label>
                    <div class="col-sm-10 mt-auto">
                        <input type="text" class="form-control pe-5" v-model="vehicle.vehicle_license_plate_num">
                    </div>
                </div>
                <div class="form-group row pb-3 px-5">
                    <label class="col-sm-2 col-form-label">License Plate State</label>
                    <div class="col-sm-10 my-auto">
                        <select class="form-control" v-model="vehicle.vehicle_license_plate_state_id" required>
                            <option disabled value="">Choose. . .</option>
                            <option v-for="state in states" v-bind:key="state.vehicle_license_plate_state_id" v-bind:value="state.vehicle_license_plate_state_id">
                                {{ state.vehicle_license_plate_state_name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div class="card-header">
                <div class="row justify-content-center">
                    <button class="btn btn-secondary my-3" style="width:400px;">Save Vehicle</button>
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
      vehicle: {},
      makes: '',
      models: '',
      colors: '',
      states: ''
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getMakes'
    const apiURL2 = 'http://localhost:3000/getColors'
    const apiURL3 = 'http://localhost:3000/getStates'
    const apiURL4 = `http://localhost:3000/getVehicleById/${this.$route.params.id}`

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

    axios.get(apiURL4).then((res) => {
      this.vehicle = res.data[0]
      console.log(this.vehicle)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    cancelChanges () {
      this.$router.push('/ViewVehicles')
    },
    saveChanges () {
      const apiURL = `http://localhost:3000/UpdateCustomer/${this.$route.params.id}`

      axios.put(apiURL, this.vehicle).then((res) => {
        this.$router.push('/ViewVehicles')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
