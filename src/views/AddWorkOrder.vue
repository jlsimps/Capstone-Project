<template>
    <div>
        <h1 class="display-5" style="text-align: center;">Create New Work Order</h1>
        <hr class="my-4">
        <div class="card my-3">
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
                <div style="overflow-y:auto;max-height:375px;">
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
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>

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
</style>
