<template>
    <b-container>
      <b-row>
        <nav class="navbar navbar-expand navbar-light fixed-top" style="justify-content:space-between;padding-right:50px;padding-left:20px;">
          <a href="/"><img src="../src/assets/logo2.png" style="width:270px;height:auto;"></a>
          <ul class="nav navbar-nav" style="flex-wrap: nowrap">

            <li class="nav-item active">
              <router-link class="nav-link" to="/">
              <img src="../src/assets/home.png" class="navicon bi d-block mx-auto mb-1" width="24" height="24">
              Home
              </router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../src/assets/customers.png" class="bi d-block mx-auto mb-1" width="24" height="24">
                Customers
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddCustomer">Add a New Customer</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/ViewCustomers">View Existing Customers</router-link>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../src/assets/vehicle.png" class="bi d-block mx-auto mb-1" width="24" height="24">
                Vehicles
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddVehicle">Add a New Vehicle</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/ViewVehicles">View Existing Vehicles</router-link>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../src/assets/orders.png" class="bi d-block mx-auto mb-1" width="24" height="24">
                Work Orders
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddWorkOrder">Create New Work Order</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/ViewWorkOrders">View Existing Work Orders</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/DeletedWorkOrders">View Deleted Work Orders</router-link>
              </div>
            </li>

            <li class="nav-item dropdown lastnav">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src="../src/assets/system.png" class="bi d-block mx-auto mb-1" width="24" height="24">
                System Services
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/ManageServices">Manage Services Offered</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/ManageVehicles">Manage Vehicles Serviced</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/ClaimReport">Warranty Claims Report</router-link>
              </div>
            </li>

          </ul>
        </nav>
      </b-row>

      <b-row class="mt-3 body" style="padding-top:8%">
        <router-view></router-view>
      </b-row>
      <div class="footer navbar-fixed-bottom">
        <img src="../src/assets/teamlogo.png" style="width:45px;height:auto;">
        <span class="logoText text-muted">© Copyright Radioactive Tech Solutions</span>
      </div>
    </b-container>
</template>

<style>
  .navbar {
    background-color: #b5c7da;
    font-family: Tahoma, sans-serif;
    /* font-weight:500; */
    color: rgb(255, 255, 255);
    border-bottom: 6px solid #383742;
    font-size: 1rem;
  }

  .navbar a {
    color: #383742
  }
  .navbar-expand {
    justify-content: space-between;
  }
  .nav-item {
    padding-left: 50px;
  }
  .lastnav {
    padding-right:25px;
  }

  .footer {
    position: fixed;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    background-color: #b5c7da;
    border-top: 5px solid #383742;
    text-align: center;
  }

  .body {
    margin-bottom: 100px;
  }

  nav .navbar-nav li a {
  color: #1f1e26 !important;
  }

  ul.nav a:hover {
    color: #ffffff !important;
  }

  .dropdown-menu > a:hover {
    background-color: #383742;
    background-image: none;
  }

  .dropdown-item {
    font-family: Arial, sans-serif;
  }
  .card {
    border:0;
    box-shadow:0 10px 15px -3px rgba(0,0,0,.07),0 4px 6px -2px rgba(0,0,0,.05)
  }
  /* .logoText{
    text-muted;
  } */
</style>
