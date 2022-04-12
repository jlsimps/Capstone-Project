<template>
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <symbol id="sort" fill="currentColor" viewBox="0 0 16 16">
          <path d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"/>
        </symbol>
      </svg>
        <h1 class="display-5" style="text-align: center;">Warranty Claims Report</h1>
        <hr class="my-4">
        <div class="container mt-5">
            <div class="chartHead row mb-4">
                <div class="col-4 my-auto">
                    <h5>Breakdown of Claims by Service Type</h5>
                </div>
                <div class="col d-flex justify-content-end my-auto">
                    <select class="form-select" style="width:50%" v-model="selectedChart" @change="chartSelected()">
                          <option value="cost">
                              View Total Cost of Claims
                          </option>
                          <option value="avg">
                              View Average Cost of Claims
                          </option>
                          <option value="number">
                              View Total Number of Claims
                          </option>
                      </select>
                </div>
            </div>
            <div v-if="showNumber" class="row">
                <bar-chart height="400px" xtitle="Total Number of Claims" :data="numberOfClaimsData" :library="{scales: {x: {ticks: {precision: 0}, title: {font: {size: 20}, padding: 15}}}}" />
            </div>
            <div v-if="showCost" class="row">
                <bar-chart height="400px" xtitle="Total Cost of Claims" prefix="$" thousands="," :data="costOfClaimsData" :library="{scales: {x: {title: {font: {size: 20}, padding: 15}}}}" />
            </div>
            <div v-if="showAvg" class="row">
                <bar-chart height="400px" xtitle="Average Cost of Claims" prefix="$" thousands="," :data="avgClaimData" :library="{scales: {x: {title: {font: {size: 20}, padding: 15}}}}" />
            </div>
            <hr class="my-5" />
            <div class="row">
                    <table class="table table-hover">
                        <thead>
                            <tr class="d-flex">
                                <th class="col-5 px-4">Service</th>
                                <th class="col-2 d-flex justify-content-center align-items-center">Number of Claims<svg @click="sortClaim('number_of_claims')" width="18" height="20" class="mx-1" style="cursor:pointer"><use xlink:href="#sort"/></svg></th>
                                <th class="col-2 d-flex justify-content-center align-items-center">Average Claim Cost<svg @click="sortClaim('average_of_claims')" width="18" height="20" class="mx-1" style="cursor:pointer"><use xlink:href="#sort"/></svg></th>
                                <th class="col-2 d-flex justify-content-center align-items-center">Total Cost of Claims<svg @click="sortClaim('cost_of_claims')" width="18" height="20" class="mx-1" style="cursor:pointer"><use xlink:href="#sort"/></svg></th>
                                <th class="col-1 d-flex justify-content-end px-2">Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class="d-flex" v-for="claim in sortedClaims" v-bind:key="claim.service_type">
                                <td class="col-5 px-4">{{ claim.service_type }}</td>
                                <td class="col-2 d-flex justify-content-center">{{ claim.number_of_claims }}</td>
                                <td class="col-2 d-flex justify-content-center">${{ claim.average_of_claims.toLocaleString('en-US') }}</td>
                                <td class="col-2 d-flex justify-content-center">${{ claim.cost_of_claims.toLocaleString('en-US') }}</td>
                                <td class="col-1 d-flex justify-content-end px-3">
                                  <a href="" @click.prevent class="mx-1" data-toggle="modal" data-target="#claimDetailsModal" @click="showClaims(claim.service_type)"><img v-b-tooltip.hover title="View Claims" src="../../src/assets/view2.png" style="width:20px;height:20px" /></a>
                                </td>
                            </tr>
                            <tr class="totalRow d-flex">
                                <td class="col-5 px-4">TOTAL</td>
                                <td class="col-2 d-flex justify-content-center">{{ totalClaims }}</td>
                                <td class="col-2 d-flex justify-content-center">${{ Math.round((totalCost / totalClaims)).toLocaleString('en-US') }}</td>
                                <td class="col-2 d-flex justify-content-center">${{ totalCost.toLocaleString('en-US') }}</td>
                                <td class="col-1 d-flex justify-content-end"></td>
                            </tr>
                        </tbody>
                    </table>
            </div>
        </div>
        <div class="modal fade" id="claimDetailsModal">
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Claim Details: {{ selectedClaim }}</h4>
                        <button type="button" class="close" data-dismiss="modal">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body">
                        <table class="table table-hover">
                          <thead>
                            <tr class="d-flex">
                              <th class="col-1"></th>
                              <th class="col-2">Claim Date</th>
                              <th class="col-3">Vehicle</th>
                              <th class="col-2">Claim Cost</th>
                              <th class="col-4">Notes</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr class="d-flex" v-for="(claim, index) in claimDetails" v-bind:key="claim.warranty_claim_id">
                              <td class="col-1"><b>{{ index + 1 }}</b></td>
                              <td class="col-2">{{ formatDate(claim.warranty_claim_date) }}</td>
                              <td class="col-3">{{ claim.vehicle }}</td>
                              <td class="col-2">${{ claim.warranty_claim_amount.toLocaleString('en-US') }}</td>
                              <td class="col-4">{{ claim.warranty_claim_notes }}</td>
                            </tr>
                          </tbody>
                        </table>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-outline-secondary btn-sm mx-2" data-dismiss="modal">Close</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import moment from 'moment'

export default {
  data () {
    return {
      claims: [],
      totalClaims: 0,
      totalCost: 0,
      selectedChart: 'cost',
      numberOfClaimsData: [],
      costOfClaimsData: [],
      avgClaimData: [],
      showNumber: false,
      showCost: true,
      showAvg: false,
      currentSort: 'total_of_claims',
      selectedClaim: '',
      claimDetails: []
    }
  },
  computed: {
    sortedClaims: function () {
      return [...this.claims].sort((a, b) => {
        return b[this.currentSort] - a[this.currentSort]
      })
    }
  },
  created () {
    const apiURL = 'http://localhost:3000/getClaimReport'
    axios.get(apiURL).then(res => {
      this.claims = res.data
      const numberOfClaimsData = []
      const costOfClaimsData = []
      const avgClaimData = []
      let totalClaims = 0
      let totalCost = 0
      this.claims.forEach(function (claim) {
        totalClaims += claim.number_of_claims
        totalCost += claim.cost_of_claims
        numberOfClaimsData.push([claim.service_type, claim.number_of_claims])
        costOfClaimsData.push([claim.service_type, claim.cost_of_claims])
        avgClaimData.push([claim.service_type, claim.average_of_claims])
      })
      this.numberOfClaimsData = numberOfClaimsData.sort((a, b) => { return b[1] - a[1] })
      this.costOfClaimsData = costOfClaimsData.sort((a, b) => { return b[1] - a[1] })
      this.avgClaimData = avgClaimData.sort((a, b) => { return b[1] - a[1] })
      this.totalCost = totalCost
      this.totalClaims = totalClaims
    }).catch(error => {
      console.log(error)
    })
  },
  methods: {
    chartSelected () {
      if (this.selectedChart === 'number') {
        this.showAvg = false
        this.showCost = false
        this.showNumber = true
      } else if (this.selectedChart === 'cost') {
        this.showAvg = false
        this.showNumber = false
        this.showCost = true
      } else {
        this.showNumber = false
        this.showCost = false
        this.showAvg = true
      }
    },
    sortClaim (detail) {
      this.currentSort = detail
    },
    showClaims (type) {
      this.selectedClaim = type
      const apiURL = `http://localhost:3000/getClaimsByType/${type}`

      axios.get(apiURL).then(res => {
        this.claimDetails = res.data
        console.log(this.claimDetails)
      }).catch(error => {
        console.log(error)
      })
    },
    formatDate (date) {
      return moment(date).format('YYYY-MM-DD')
    }
  }
}

</script>

<style scoped>
.chartHead {
    border-radius: 10px;
    border: 1px solid #e9e9e9;
    padding-top: 15px;
    padding-bottom: 15px;
    background-color: rgb(243, 243, 243);
    color: rgb(56, 56, 56);
}
.totalRow {
    font-weight: 500;
    border-top: solid 2px black;
}
</style>
