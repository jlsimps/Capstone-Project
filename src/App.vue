<template>
    <b-container>
      <b-row>
        <nav class="navbar navbar-expand navbar-light px-4 fixed-top" style="justify-content:space-between;padding-left:5px;">
          <a href="/"><img src="../src/assets/logo2.png" style="width:270px;height:auto;"></a>
          <ul class="nav navbar-nav" style="flex-wrap: nowrap">

            <li class="nav-item active">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
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
                System Services
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/ManageServices">Manage Services Offered</router-link>
                <div class="dropdown-divider"></div>
                <router-link class="dropdown-item" to="/ManageVehicles">Manage Vehicles Serviced</router-link>
              </div>
            </li>

          </ul>
        </nav>
      </b-row>

      <b-row class="mt-3 text-center body" style="padding-top:8%">
        <router-view></router-view>
      </b-row>
      <div class="footer navbar-fixed-bottom">
        <img src="../src/assets/teamlogo.png" style="width:50px;height:auto;">
        <span class="logoText text-muted">© Copyright Radioactive Tech Solutions</span>
      </div>
    </b-container>
</template>

<style>
  .navbar {
    background-color: #b5c7da;
    font-family: Tahoma, sans-serif;
    font-weight:500;
    color: rgb(255, 255, 255);
    border-bottom: 5px solid #383742;
    font-size: 1.4rem;
  }

  .navbar a {
    color: black
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

  /* .logoText{
    text-muted;
  } */
</style>
