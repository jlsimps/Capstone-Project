<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Add New Customer</h1>
        <hr class="my-4">
        <h4 class="display-7" style="text-align: center;">Please Fill Out the Details Below</h4>
        <hr class="my-4">
        <div class="card mb-5">
            <form @submit.prevent="handleEdit">
                <div class="card-header">
                    <h5>Basic Info</h5>
                </div>
                <div class="card-body">
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">First Name</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_first_name" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Last Name</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_last_name" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Address 1</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_address" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Address 2</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_address_2">
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">City</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_city_name" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">State</label>
                        <div class="col-sm-10 my-auto">
                            <select class="form-control" v-model="customer.customer_state_name">
                                <option disabled value="">Choose</option>
                                <option v-for="state in states" v-bind:key="state">
                                    {{ state }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Zip Code</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_zipcode" required>
                        </div>
                    </div>
                </div>
                <div class="card-header">
                    <h5>Contact Info</h5>
                </div>
                <div class="card-body">
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Phone Number 1</label>
                        <div class="col-sm-10 my-auto">
                            <input type="tel" class="form-control" v-model="customer.customer_phone" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Phone Number 2</label>
                        <div class="col-sm-10 my-auto">
                            <input type="tel" class="form-control" v-model="customer.customer_phone_2">
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10 my-auto">
                            <input type="email" class="form-control" v-model="customer.customer_email" required>
                        </div>
                    </div>
                </div>
                <div class="card-header">
                    <h5>Drivers License Info</h5>
                </div>
                <div class="card-body">
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Drivers License Number</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.customer_driver_license_num">
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Drivers License State</label>
                        <div class="col-sm-10 my-auto">
                            <select class="form-control" v-model="customer.customer_driver_license_state">
                                <option disabled value="">Choose</option>
                                <option v-for="state in states" v-bind:key="state">
                                    {{ state }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="card-header">
                        <div class="row d-flex">
                            <div class="col d-flex justify-content-end">
                            <button @click="saveChanges" class="btn btn-secondary my-3" style="width:200px;">Save Changes</button>
                            </div>
                            <div class="col d-flex justify-content-start">
                            <button @click="cancelChanges" class="btn btn-secondary my-3" style="width:200px;">Cancel</button>
                            </div>
                        </div>
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
      customer: {},
      states: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }
  },
  created () {
    const apiURL = `http://localhost:3000/getCustomerById/${this.$route.params.id}`

    axios.get(apiURL).then((res) => {
      this.customer = res.data[0]
      console.log(this.customer)
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    cancelChanges () {
      this.$router.push('/ViewCustomers')
    },
    saveChanges () {
      const apiURL = `http://localhost:3000/UpdateCustomer/${this.$route.params.id}`

      axios.put(apiURL, this.customer).then((res) => {
        this.$router.push('/ViewCustomers')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
