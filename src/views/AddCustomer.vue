<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Add New Customer</h1>
        <hr class="my-4">
        <h4 class="display-7" style="text-align: center;">Please Fill Out the Details Below</h4>
        <hr class="my-4">
        <div class="card mb-5">
            <form @submit.prevent="handleSubmitForm">
                <div class="card-header">
                    <h5>Basic Info</h5>
                </div>
                <div class="card-body">
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">First Name</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.firstName" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Last Name</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.lastName" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Address 1</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.address1" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Address 2</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.address2">
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">City</label>
                        <div class="col-sm-10 my-auto">
                            <input type="text" class="form-control" v-model="customer.city" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">State</label>
                        <div class="col-sm-10 my-auto">
                            <select class="form-control" v-model="customer.state">
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
                            <input type="text" class="form-control" v-model="customer.zip" required>
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
                            <input type="tel" class="form-control" v-model="customer.phone1" required>
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Phone Number 2</label>
                        <div class="col-sm-10 my-auto">
                            <input type="tel" class="form-control" v-model="customer.phon2">
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Email</label>
                        <div class="col-sm-10 my-auto">
                            <input type="email" class="form-control" v-model="customer.email" required>
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
                            <input type="text" class="form-control" v-model="customer.dlnumber">
                        </div>
                    </div>
                    <div class="form-group row pb-3">
                        <label class="col-sm-2 col-form-label">Drivers License State</label>
                        <div class="col-sm-10 my-auto">
                            <select class="form-control" v-model="customer.dlstate">
                                <option disabled value="">Choose</option>
                                <option v-for="state in states" v-bind:key="state">
                                    {{ state }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="card-header">
                        <div class="row justify-content-center mx-5">
                            <button class="btn btn-secondary my-3">Submit</button>
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
      customer: {
        firstName: '',
        lastName: '',
        state: '',
        city: '',
        zip: '',
        address1: '',
        address2: '',
        phone1: '',
        phone2: '',
        email: '',
        dlnumber: '',
        dlstate: ''

      },
      states: ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware', 'District of Columbia', 'Federated States of Micronesia', 'Florida', 'Georgia', 'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Island', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming']
    }
  },
  methods: {
    handleSubmitForm () {
      axios.post('http://localhost:3000/createCustomer', this.customer).then(() => {
        this.$router.push('/')
      }).catch(error => {
        console.log(error)
      })
    }
  }
}
</script>
