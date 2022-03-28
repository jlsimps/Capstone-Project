<template>
    <b-container>
      <b-row>
        <nav class="navbar navbar-expand navbar-light px-5 fixed-top" style="justify-content:space-between;padding-left:5px;">
          <a href="/"><img src="../src/assets/logo.png" style="width:15%;height:auto;"></a>
          <ul class="nav navbar-nav" >

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Customers
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddCustomer">Add a New Customer</router-link>
                <router-link class="dropdown-item" to="/ViewCustomers">View/Edit Customers</router-link>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Vehicles
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddVehicle">Add a New Vehicle</router-link>
                <router-link class="dropdown-item" to="/ViewVehicles">View/Edit Vehicles</router-link>
              </div>
            </li>

            <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Work Orders
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddWorkOrder">Create New Work Order</router-link>
                <router-link class="dropdown-item" to="/ViewWorkOrders">View Existing Work Orders</router-link>
              </div>
            </li>

            <li class="nav-item dropdown lastnav">
              <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                System Services
              </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                <router-link class="dropdown-item" to="/AddWorkOrder">Manage Services Offered</router-link>
                <router-link class="dropdown-item" to="/ViewWorkOrders">Manage Warranties</router-link>
                <router-link class="dropdown-item" to="/ViewWorkOrders">Manage Vehicles Serviced</router-link>
              </div>
            </li>

          </ul>
        </nav>
      </b-row>

      <b-row class="mt-5 text-center body" style="padding-top:5%">
        <router-view></router-view>
      </b-row>
      <div class="footer navbar-fixed-bottom">
        <h5>test</h5>
      </div>
    </b-container>
</template>

<style>
  .navbar {
    background-color: #b5c7da;
    font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight:500;
    color: rgb(255, 255, 255);
    border-bottom: 5px solid #4e4a7e;
    font-size: 1.1rem;
  }

  .navbar a {
    color: black
  }
  .navbar-expand {
    justify-content: space-between;
  }
  .nav-item {
    padding-left: 75px;
  }
  .lastnav {
    padding-right:30px;
  }

  .footer {
    position: fixed;
    left:0;
    bottom:0;
    right:0;
    width:100%;
    background-color: #b5c7da;
    border-top: 5px solid #4e4a7e;
    text-align: center;
  }

  .body {
    margin-bottom: 100px;
  }
</style>
