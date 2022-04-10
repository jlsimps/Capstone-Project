<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Edit Customer Information</h1>
        <hr class="my-4">
        <h4 class="display-7" style="text-align: center;">Please Fill Out the Details Below</h4>
        <hr class="my-4">
        <div class="card mb-5">
            <form @submit.prevent="saveChanges">
                <div class="card-header py-3">
                        <h4>Enter Customer Details</h4>
                    </div>
                    <div class="card-body px-5">
                        <div class="row">
                            <div class="col-md-3">
                                <h5>Basic Information</h5>
                            </div>
                            <div class="col-md-9">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="firstName" class="form-label">First Name<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="text" id="firstName" class="form-control" v-model="customer.customer_first_name" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="lastName" class="form-label">Last Name<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="text" id="lastName" class="form-control" v-model="customer.customer_last_name" required>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label for="address1" class="form-label">Address 1<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="text" id="address1" class="form-control" v-model="customer.customer_address" required>
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label for="address1" class="form-label">Address 2</label>
                                        <input type="text" id="address1" class="form-control" v-model="customer.customer_address_2">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md-4">
                                        <label for="city" class="form-label">City<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="text" id="city" class="form-control" v-model="customer.customer_city_name" required>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="state" class="form-label">State<span class="fw-bold" style="color:red"> *</span></label>
                                        <select class="form-select" id="state" v-model="customer.customer_state_name">
                                            <option disabled value="">Choose. . .</option>
                                            <option v-for="state in states" v-bind:key="state">
                                                {{ state }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <label for="zip" class="form-label">Zip Code<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="text" id="zip" class="form-control" v-model="customer.customer_zipcode" pattern="^\d{5,5}" title="Enter a 5 Digit Zipcode" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row">
                            <div class="col-md-3">
                                <h5>Contact Information</h5>
                            </div>
                            <div class="col-md-9">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="phone" class="form-label">Phone Number<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="tel" class="form-control" id="phone" v-model="customer.customer_phone" placeholder="XXX-XXX-XXXX" pattern="^\d{3}-\d{3}-\d{4}$" title="XXX-XXX-XXXX" required>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="phone2" class="form-label">Alternate Phone</label>
                                        <input type="tel" class="form-control" id="phone2" v-model="customer.customer_phone_2" placeholder="XXX-XXX-XXXX" pattern="^\d{3}-\d{3}-\d{4}$" title="XXX-XXX-XXXX">
                                    </div>
                                </div>
                                <div class="row mb-3">
                                    <div class="col-md">
                                        <label for="email" class="form-label">Email Address<span class="fw-bold" style="color:red"> *</span></label>
                                        <input type="text" id="email" class="form-control" v-model="customer.customer_email" required>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr class="my-4" />
                        <div class="row">
                            <div class="col-md-3">
                                <h5>Drivers License Information</h5>
                            </div>
                            <div class="col-md-9">
                                <div class="row mb-3">
                                    <div class="col-md-6">
                                        <label for="dlState" class="form-label">DL State</label>
                                        <select class="form-select" id="dlState" v-model="customer.customer_driver_license_state">
                                            <option disabled value="">Choose. . .</option>
                                            <option v-for="state in states" v-bind:key="state">
                                                {{ state }}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="col-md-6">
                                        <label for="dlNum" class="form-label">DL Number</label>
                                        <input type="text" id="dlNum" class="form-control" v-model="customer.customer_driver_license_num">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="card-footer text-center">
                        <button class="btn btn-secondary my-3">Submit</button>
                    </div>
                <!-- <div class="card-header">
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
                </div> -->
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
