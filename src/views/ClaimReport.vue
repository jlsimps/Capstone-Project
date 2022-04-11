<template>
    <div>
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
                <table class="table">
                    <thead>
                        <tr class="d-flex">
                            <th class="col-6 px-4">Service</th>
                            <th class="col-2 d-flex justify-content-center">Number of Claims</th>
                            <th class="col-2 d-flex justify-content-center">Average Cost of Claims</th>
                            <th class="col-2 d-flex justify-content-center">Total Cost of Claims</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr class="d-flex" v-for="claim in claims" v-bind:key="claim.service_type">
                            <td class="col-6 px-4">{{ claim.service_type }}</td>
                            <td class="col-2 d-flex justify-content-center">{{ claim.number_of_claims }}</td>
                            <td class="col-2 d-flex justify-content-center">${{ claim.average_of_claims.toLocaleString('en-US') }}</td>
                            <td class="col-2 d-flex justify-content-center">${{ claim.cost_of_claims.toLocaleString('en-US') }}</td>
                        </tr>
                        <tr class="totalRow d-flex">
                            <td class="col-6 px-4">TOTAL</td>
                            <td class="col-2 d-flex justify-content-center">{{ totalClaims }}</td>
                            <td class="col-2 d-flex justify-content-center">${{ Math.round((totalCost / totalClaims)).toLocaleString('en-US') }}</td>
                            <td class="col-2 d-flex justify-content-center">${{ totalCost.toLocaleString('en-US') }}</td>
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
      claims: [],
      totalClaims: 0,
      totalCost: 0,
      selectedChart: 'cost',
      numberOfClaimsData: [],
      costOfClaimsData: [],
      avgClaimData: [],
      showNumber: false,
      showCost: true,
      showAvg: false
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
