<template>
    <div>
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
        </symbol>
    </svg>
    <h1 class="display-5" style="text-align: center;">Manage Services</h1>
    <hr class="my-4">
    <!-- <h4 class="display-7" style="text-align: center;">Add or Edit Services and Warranties Offered to Customers</h4> -->
        <div class="mainCard card pb-3">
            <div class="card-header">
                <h5>Add or Edit Services and Warranties Offered to Customers</h5>
            </div>
            <div>
                <b-alert
                    class="mb-0 mt-4"
                    variant="danger"
                    dismissible
                    fade
                    v-model="showSameServiceAlert"
                    @dismissed="showSameServiceAlert=false"
                >
                <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                The service "{{ sameServiceName }}" already exists!
                </b-alert>
                <b-alert
                    class="mb-0 mt-4"
                    variant="danger"
                    dismissible
                    fade
                    v-model="showSameWarrantyAlert"
                    @dismissed="showSameWarrantyAlert=false"
                >
                <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                A warranty that covers "{{ sameWarrantyName }}" already exists!
                </b-alert>
                <b-alert
                    class="mb-0 mt-4"
                    variant="danger"
                    dismissible
                    fade
                    v-model="showLinkedServiceAlert"
                    @dismissed="showLinkedServiceAlert=false"
                >
                <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                {{ errorMsg }}
                </b-alert>
            </div>
            <div class="card-body">
                <div class="container px-0">
                    <div class="row">
                        <div class="col ps-0">
                            <div class="card p-3">
                                <div class="row text-center">
                                    <h5 class="py-2">Services</h5>
                                </div>
                                <div class="row">
                                    <div class="input-group mb-3">
                                        <span class="addText input-group-text">Add New Service</span>
                                        <input type="text" class="form-control" placeholder="Service Name" v-model="newServiceName">
                                        <button v-bind:disabled="newServiceName==''" class="btn btn-secondary px-5" type="button" data-toggle="modal" data-target="#confirmServiceModal">Add</button>
                                    </div>
                                </div>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Service Name</th>
                                            <th>Status</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="service in services" :key="service.service_id">
                                            <td> {{ service.service_type }} </td>
                                            <td v-if="service.service_status_id==2">
                                                <span style="color:red">Inactive</span>
                                                <button class="btn btn-outline-secondary btn-sm ms-3" @click="changeStatus('service', service.service_id, service.service_status_id)">Set Active</button>
                                            </td>
                                            <td v-else>
                                                <span style="color:green">Active</span>
                                                <button class="btn btn-outline-secondary btn-sm ms-3" @click="changeStatus('service', service.service_id, service.service_status_id)"><i>Set Inactive</i></button>
                                            </td>
                                            <td>
                                                <button v-b-tooltip.hover title="Remove Service" type="button" class="close" @click="handleRemove('service', service.service_id)">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class="col pe-0">
                            <div class="card p-3">
                                <div class="row">
                                    <h5 class="py-2">Warranties</h5>
                                </div>
                                <div class="row">
                                    <div class="input-group mb-3">
                                        <span class="addText input-group-text">Add New Warranty</span>
                                        <input type="number" class="form-control" placeholder="Months" v-model="newWarrantyMonths">
                                        <input type="number" class="form-control" placeholder="Miles" v-model="newWarrantyMiles">
                                        <button v-bind:disabled="(newWarrantyMonths=='' || newWarrantyMiles=='')" class="btn btn-secondary px-5" type="button" data-toggle="modal" data-target="#confirmWarrantyModal">Add</button>
                                    </div>
                                </div>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Warranty Type</th>
                                            <th>Status</th>
                                            <th>Remove</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="warranty in warranties" :key="warranty.warranty_option_id">
                                            <td> {{ warranty.warranty_name }} </td>
                                            <td v-if="warranty.warranty_option_status_id==2">
                                                <span style="color:red">Inactive</span>
                                                <button class="btn btn-outline-secondary btn-sm ms-3" @click="changeStatus('warranty', warranty.warranty_option_id, warranty.warranty_option_status_id)">Set Active</button>
                                            </td>
                                            <td v-else>
                                                <span style="color:green">Active</span>
                                                <button class="btn btn-outline-secondary btn-sm ms-3" @click="changeStatus('warranty', warranty.warranty_option_id, warranty.warranty_option_status_id)"><i>Set Inactive</i></button>
                                            </td>
                                            <td>
                                                <button v-b-tooltip.hover title="Remove Warranty" type="button" class="close" @click="handleRemove('warranty', warranty.warranty_option_id)">
                                                    <span aria-hidden="true">&times;</span>
                                                </button>
                                            </td>

                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="confirmServiceModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm Details</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="newServiceName='',newWarrantyMonths='',newWarrantyMiles=''">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            Add new service type:<span class="px-2 fw-bold"> {{ newServiceName }} </span>
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-2" data-dismiss="modal" @click="newServiceName='',newWarrantyMonths='',newWarrantyMiles=''">Cancel</button>
                        <button type="button" class="btn btn-secondary btn-sm mx-2" @click="confirmService" data-dismiss="modal">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal fade" id="confirmWarrantyModal">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm Details</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="newServiceName='',newWarrantyMonths='',newWarrantyMiles=''">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <p>
                            Add new warranty type of: <span class="px-1 fw-bold"> {{ newWarrantyMonths }} </span> month(s) or <span class="px-1 fw-bold"> {{ newWarrantyMiles }} </span> miles
                        </p>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-2" data-dismiss="modal" @click="newServiceName='',newWarrantyMonths='',newWarrantyMiles=''">Cancel</button>
                        <button type="button" class="btn btn-secondary btn-sm mx-2" @click="confirmWarranty" data-dismiss="modal">Confirm</button>
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
      newServiceName: '',
      newWarrantyMonths: '',
      newWarrantyMiles: '',
      services: [],
      servicesList: [],
      warranties: [],
      warrantiesList: [],
      activeServices: [],
      activeWarranties: [],
      showSameServiceAlert: false,
      sameServiceName: '',
      showSameWarrantyAlert: false,
      sameWarrantyName: '',
      showLinkedServiceAlert: false,
      errorMsg: ''
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getAllServices'
    const apiURL2 = 'http://localhost:3000/getAllWarranties'
    const apiURL3 = 'http://localhost:3000/getAllOrderDetails'

    axios.get(apiURL).then((res) => {
      this.services = res.data
      for (const service of this.services) {
        this.servicesList.push(service.service_type.toLowerCase())
      }
      console.log(this.services)
    }).catch(error => {
      console.log(error)
    })
    axios.get(apiURL2).then((res) => {
      this.warranties = res.data
      this.warranties.splice(0, 1)
      for (const warranty of this.warranties) {
        this.warrantiesList.push(warranty.warranty_name.toLowerCase())
      }
      console.log(this.warranties)
    }).catch(error => {
      console.log(error)
    })
    axios.get(apiURL3).then((res) => {
      for (const order of res.data) {
        this.activeServices.push(order.service_id)
        this.activeWarranties.push(order.warranty_option_id)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    confirmService () {
      if (this.servicesList.includes(this.newServiceName.toLowerCase())) {
        this.sameServiceName = this.newServiceName
        this.showSameServiceAlert = true
      } else {
        axios.post(`http://localhost:3000/addNewService/${this.newServiceName}`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    confirmWarranty () {
      const warrantyName = `${this.newWarrantyMonths} months or ${this.newWarrantyMiles} miles`
      if (this.warrantiesList.includes(warrantyName)) {
        this.sameWarrantyName = warrantyName
        this.showSameWarrantyAlert = true
      } else {
        axios.post(`http://localhost:3000/addNewWarranty/${this.newWarrantyMonths}/${this.newWarrantyMiles}`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    changeStatus (type, id, status) {
      if (status === 1) {
        if (type === 'warranty') {
          axios.put(`http://localhost:3000/changeWarrantyStatus/${id}/2`).then((res) => {
            this.$router.go()
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.put(`http://localhost:3000/changeServiceStatus/${id}/2`).then((res) => {
            this.$router.go()
          }).catch(error => {
            console.log(error)
          })
        }
      } else {
        if (type === 'service') {
          axios.put(`http://localhost:3000/changeServiceStatus/${id}/1`).then((res) => {
            this.$router.go()
          }).catch(error => {
            console.log(error)
          })
        } else {
          axios.put(`http://localhost:3000/changeWarrantyStatus/${id}/1`).then((res) => {
            this.$router.go()
          }).catch(error => {
            console.log(error)
          })
        }
      }
    },
    handleRemove (type, id) {
      this.showLinkedServiceAlert = false
      if (type === 'warranty') {
        if (this.activeWarranties.includes(id)) {
          this.errorMsg = 'This warranty option is linked to an existing order, unable to remove'
          this.showLinkedServiceAlert = true
        } else {
          axios.put(`http://localhost:3000/removeWarranty/${id}`).then((res) => {
            this.$router.go()
          }).catch(error => {
            console.log(error)
          })
        }
      } else {
        if (this.activeServices.includes(id)) {
          this.errorMsg = 'This service type is linked to an existing order, unable to remove'
          this.showLinkedServiceAlert = true
        } else {
          axios.put(`http://localhost:3000/removeService/${id}`).then((res) => {
            this.$router.go()
          }).catch(error => {
            console.log(error)
          })
        }
      }
    }
  }
}
</script>

<style scoped>
.addText {
    font-family: sans-serif;
    font-weight: 500;
    /* font-style: italic; */
}

.mainCard {
    border: 0;
}

.card-header {
    border-top: 1px solid #e5e5e5;
    border-left: 1px solid #e5e5e5;
    border-right: 1px solid #e5e5e5;
    border-radius: 5px;
}
</style>
