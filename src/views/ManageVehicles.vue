<template>
    <div>
        <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
            <symbol id="exclamation-triangle-fill" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
            </symbol>
        </svg>
        <h1 class="display-5" style="text-align:center">Manage Vehicles Serviced</h1>
        <hr class="my-4">
        <div class="card">
            <div class="card-header">
                <div class="row">
                    <h5>Vehicle Makes</h5>
                </div>
                <div class="row py-3">
                    <div class="col">
                        <div class="input-group">
                            <label class="input-group-text" for="makeSelect">Select Make</label>
                            <select class="form-select" id="makeSelect" v-model="selectedMake" @change="chooseMake(selectedMake)">
                                <option selected disabled value="">Choose Make. . .</option>
                                <option v-for="make in makes" v-bind:key="make.make_id" v-bind:value="{make_id:make.make_id,make_name:make.make_name,make_status:make.make_status_id}">
                                    {{ make.make_name }}
                                </option>
                            </select>
                        </div>
                    </div>
                    <div class="col-1 my-auto">
                        <i>OR</i>
                    </div>
                    <div class="col">
                        <div class="input-group">
                            <span class="input-group-text">Add New Make</span>
                            <input type="text" class="form-control" placeholder="Make Name" v-model="newMakeName">
                            <button v-bind:disabled="newMakeName==''" class="btn btn-secondary" type="button" data-toggle="modal" data-target="#confirmMakeModal">ADD</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div v-if="makeSelected">
                    <div class="row">
                        <div class="col-5 px-3">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row text-center">
                                        <h5>Make Details</h5>
                                    </div>
                                </div>
                                <div class="row mt-3">
                                    <div class="col">
                                        <strong>Make Name:</strong>
                                    </div>
                                    <div class="col">
                                        {{ selectedMakeDetails.make_name }}
                                    </div>
                                </div>
                                <div class="row" v-if="selectedMakeDetails.make_status==1">
                                    <div class="col">
                                        <strong>Make Status:</strong>
                                    </div>
                                    <div class="col">
                                        <span style="color:green">Active</span>
                                    </div>
                                </div>
                                <div class="row" v-else>
                                    <div class="col">
                                        <strong>Make Status:</strong>
                                    </div>
                                    <div class="col">
                                        <span style="color:red">Inactive</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col">
                                        <strong>Models Serviced:</strong>
                                    </div>
                                    <div class="col">
                                        {{ selectedMakeDetails.models_serviced }}
                                    </div>
                                </div>
                                <hr />
                                <div class="row pb-3">
                                    <div class="col">
                                        <button class="btn btn-sm btn-secondary" @click="changeMakeStatus">Change Make Status</button>
                                    </div>
                                    <div class="col">
                                        <button class="btn btn-sm btn-danger" @click="removeMake">Delete Make</button>
                                    </div>
                                </div>
                            </div>
                            <b-alert
                                class="mb-0 mt-4"
                                variant="danger"
                                dismissible
                                fade
                                v-model="showActiveMakeAlert"
                                @dismissed="showActiveMakeAlert=false"
                            >
                                <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                "{{ selectedMakeDetails.make_name }}" is linked to an existing order, cannot delete!
                            </b-alert>
                        </div>
                        <div class="col">
                            <div class="card">
                                <div class="card-header">
                                    <div class="row text-center">
                                        <h5>Models</h5>
                                    </div>
                                </div>
                                <div class="row my-3">
                                    <div class="input-group">
                                        <span class="addText input-group-text ms-1">Add New Model</span>
                                        <input type="text" class="form-control" placeholder="Model Name" v-model="newModelName">
                                        <button v-bind:disabled="newModelName==''" class="btn btn-secondary me-1" type="button" data-toggle="modal" data-target="#confirmModelModal">ADD</button>
                                    </div>
                                </div>
                                <b-alert
                                    class="mb-0 mt-4"
                                    variant="danger"
                                    dismissible
                                    fade
                                    v-model="showActiveModelAlert"
                                    @dismissed="showActiveModelAlert=false"
                                >
                                    <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                                    This model is linked to an existing order, unable to delete!
                                </b-alert>
                                <table class="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Model Name</th>
                                            <th>Status</th>
                                            <th>Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="model in models" :key="model.model_id">
                                            <td> {{ model.model_name }}</td>
                                            <td v-if="model.model_status_id==1">
                                                <span style="color:green">Active</span>
                                            </td>
                                            <td v-else>
                                                <span style="color:red">Inactive</span>
                                            </td>
                                            <td class="my-auto col-4">
                                                <button class="btn btn-outline-secondary btn-sm me-3" @click="changeModelStatus(model.model_id, model.model_status_id)">Change Status</button>
                                                <button v-b-tooltip.hover title="Remove Model" type="button" class="close" @click="removeModel(model.model_id)">
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
        <div class="modal fade" id="confirmMakeModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm Make</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="newMakeName='',showSameMakeAlert=false">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col my-auto">
                                Add New Vehicle Make:
                            </div>
                            <div class="col d-flex justify-content-start my-auto">
                                <span class="px-2 fw-bold fs-5"> {{ newMakeName }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-2" data-dismiss="modal" @click="newMakeName='',showSameMakeAlert=false">Cancel</button>
                        <button type="button" class="btn btn-secondary btn-sm mx-2" @click="confirmMake">Confirm</button>
                    </div>
                    <b-alert
                        class="mb-0 mt-4"
                        variant="danger"
                        dismissible
                        fade
                        v-model="showSameMakeAlert"
                        @dismissed="showSameMakeAlert=false"
                    >
                        <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        "{{ newMakeName }}" already exists!
                    </b-alert>
                </div>
            </div>
        </div>
        <div class="modal fade" id="confirmModelModal">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title">Confirm Model</h5>
                        <button type="button" class="close" data-dismiss="modal" @click="newModelName='',showSameModelAlert=false">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="col my-auto">
                                Add New Vehicle Model:
                            </div>
                            <div class="col d-flex justify-content-start my-auto">
                                <span class="px-2 fw-bold fs-5"> {{ newModelName }} </span>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-2" data-dismiss="modal" @click="newModelName='',showSameModelAlert=false">Cancel</button>
                        <button type="button" class="btn btn-secondary btn-sm mx-2" @click="confirmModel">Confirm</button>
                    </div>
                    <b-alert
                        class="mb-0 mt-4"
                        variant="danger"
                        dismissible
                        fade
                        v-model="showSameModelAlert"
                        @dismissed="showSameModelAlert=false"
                    >
                        <svg width="24" height="24"><use xlink:href="#exclamation-triangle-fill"/></svg>
                        "{{ newModelName }}" already exists!
                    </b-alert>
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
      makes: '',
      makeList: [],
      modelList: [],
      activeMakes: [],
      activeModels: [],
      models: '',
      makeSelected: false,
      selectedMake: '',
      newMakeName: '',
      newModelName: '',
      selectedMakeDetails: '',
      showSameMakeAlert: false,
      showActiveMakeAlert: false,
      showSameModelAlert: false,
      showActiveModelAlert: false
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getAllMakes'
    const apiURL2 = 'http://localhost:3000/getAllOrderVehicleDetails'

    axios.get(apiURL).then((res) => {
      this.makes = res.data
      for (const make of this.makes) {
        this.makeList.push(make.make_name.toLowerCase())
      }
    }).catch(error => {
      console.log(error)
    })
    axios.get(apiURL2).then((res) => {
      for (const order of res.data) {
        this.activeMakes.push(order.make_id)
        this.activeModels.push(order.model_id)
      }
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    chooseMake (vehicleMake) {
      const apiURL = `http://localhost:3000/getAllModels/${vehicleMake.make_id}`
      this.showActiveMakeAlert = false

      axios.get(apiURL).then((res) => {
        this.models = res.data
        for (const model of this.models) {
          this.modelList.push(model.model_name.toLowerCase())
        }
        this.selectedMakeDetails = {
          make_name: vehicleMake.make_name,
          make_id: vehicleMake.make_id,
          make_status: vehicleMake.make_status,
          models_serviced: this.models.length
        }
      })

      this.makeSelected = true
    },
    confirmMake () {
      if (this.makeList.includes(this.newMakeName.toLowerCase())) {
        this.showSameMakeAlert = true
      } else {
        axios.post(`http://localhost:3000/addNewMake/${this.newMakeName}`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    confirmModel () {
      if (this.modelList.includes(this.newModelName.toLowerCase())) {
        this.showSameModelAlert = true
      } else {
        const apiURL = `http://localhost:3000/addNewModel/${this.selectedMakeDetails.make_id}/${this.newModelName}`
        console.log(apiURL)
        axios.post(apiURL).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    changeMakeStatus () {
      if (this.selectedMakeDetails.make_status === 1) {
        axios.put(`http://localhost:3000/changeMakeStatus/${this.selectedMakeDetails.make_id}/2`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      } else {
        axios.put(`http://localhost:3000/changeMakeStatus/${this.selectedMakeDetails.make_id}/1`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    changeModelStatus (modelID, statusID) {
      if (statusID === 1) {
        axios.put(`http://localhost:3000/changeModelStatus/${modelID}/2`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      } else {
        axios.put(`http://localhost:3000/changeModelStatus/${modelID}/1`).then((res) => {
          location.reload()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    removeMake () {
      if (this.activeMakes.includes(this.selectedMakeDetails.make_id)) {
        this.showActiveMakeAlert = true
      } else {
        axios.put(`http://localhost:3000/removeMake/${this.selectedMakeDetails.make_id}`).then((res) => {
          this.$router.go()
        }).catch(error => {
          console.log(error)
        })
      }
    },
    removeModel (modelID) {
      if (this.activeModels.includes(modelID)) {
        this.showActiveModelAlert = true
      } else {
        axios.put(`http://localhost:3000/removeModel/${modelID}`).then((res) => {
          this.$router.go()
        }).catch(error => {
          console.log(error)
        })
      }
    }
  }
}
</script>
<style scoped>

</style>
