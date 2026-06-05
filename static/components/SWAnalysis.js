export default {
    template: `
    <div>
        <!-- Horizontal Navbar -->
        <nav class="navbar bg-body-tertiary" style="background-color: blue">
            <div class="container-fluid">
                <a class="navbar-brand" href="#"> 
                    <img src="/static/components/images/book6.png" alt="Book"> StudyBuddy
                </a>
                <div class="d-flex">
                    <h5 class="me-2 p-2">STUDENT NAME</h5>
                    <router-link to="/">
                        <button class="btn btn-danger" type="submit">Log Out</button>
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- Vertical Navbar -->
        <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
            <router-link to="/dashboard" class="navbar-brand text-centre" href="#"><h4>My Dashboard</h4></router-link>
            <router-link to="/progress" class="nav-link active" aria-current="page" href="#"><h6>Progress Tracker</h6></router-link>
            <router-link to="/swanalysis" class="nav-link active" aria-current="page" href="#"><h6>S/W analysis</h6></router-link>
        </nav>
        
        <div style="margin-top: -49rem; margin-left: 13rem;">
            <div class="container mt-3 flex-grow-1">

                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card same-height">
                            <div class="card-header bg-success text-white text-center">
                                pieChart Distribution
                            </div>
                            <div class="card-body">
                                <canvas id="pieChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card same-height">
                            <div class="card-header bg-success text-white text-center">
                                pieChart Distribution
                            </div>
                            <div class="card-body">
                                <canvas id="barChart"></canvas>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row">
                    <div class="col-md-6 mb-4">
                        <div class="card same-height">
                            <div class="card-header bg-success text-white text-center">
                                pieChart Distribution
                            </div>
                            <div class="card-body">
                                <canvas id="lineChart"></canvas>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-6 mb-4">
                        <div class="card same-height">
                            <div class="card-header bg-success text-white text-center">
                                pieChart Distribution
                            </div>
                            <div class="card-body">
                                <canvas id="radarCharts"></canvas>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
    `,
    data() {
        return {
            pieChart: null,
            barChart: null,
            lineChart: null,
            radarChart: null
        }
    },
    mounted() {
        this.pieChart = new Chart(document.getElementById("pieChart"), {
            type: 'pie',
            data: {
                labels: ['Passed', 'Failed', 'Not Attempted'],
                datasets: [{
                    label: 'Students',
                    data: [40, 10, 50],
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 0, 255, 0.5)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        })
        this.barChart = new Chart(document.getElementById("barChart"), {
            type: 'bar',
            data: {
                labels: ['Passed', 'Failed', 'Not Attempted'],
                datasets: [{
                    label: 'Students',
                    data: [40, 10, 50],
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 0, 255, 0.5)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        })
        this.lineChart = new Chart(document.getElementById("lineChart"), {
            type: 'line',
            data: {
                labels: ['Passed', 'Failed', 'Not Attempted'],
                datasets: [{
                    label: 'Students',
                    data: [{
                        x: 40,
                        y: 10,
                        r: 5
                    }, {
                        x: 10,
                        y: 20,
                        r: 10
                    }, {
                        x: 50,
                        y: 30,
                        r: 15
                    }],
                    backgroundColor: [
                        'rgba(0, 255, 0, 0.5)',
                        'rgba(255, 0, 0, 0.5)',
                        'rgba(0, 0, 255, 0.5)'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        })
        this.radarChart = new Chart(document.getElementById("radarCharts"), {
            type: 'radar',
            data: {
                labels: ['Passed', 'Failed', 'Not Attempted'],
                datasets: [{
                    label: 'Students',
                    data: [40, 10, 50],
                    backgroundColor: 'rgba(0, 255, 0, 0.5)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'top'
                    }
                }
            }
        })
    }
  };