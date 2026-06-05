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

        <!-- Main Content Area -->
        <div style="margin-top: -49rem; margin-left: 13rem;">
            <div class="container mt-4">
                <h2 class="mb-4">Assignment Timeline</h2>
                
                <!-- Timeline -->
                <div class="timeline-container">
                    <div v-for="assignment in sortedAssignments" 
                         :key="assignment.id" 
                         class="timeline-item"
                         :class="{'past-due': isPastDue(assignment.dueDate)}">
                        <div class="timeline-content card">
                            <div class="card-body">
                                <h5 class="card-title">{{ assignment.course }}</h5>
                                <h6 class="card-subtitle mb-2">{{ assignment.title }}</h6>
                                <p class="card-text">
                                    Due: {{ formatDate(assignment.dueDate) }}
                                    <span class="badge" 
                                          :class="getStatusBadgeClass(assignment.dueDate)">
                                        {{ getStatusText(assignment.dueDate) }}
                                    </span>
                                </p>
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
            assignments: [
                {
                    id: 1,
                    course: 'Software Engineering',
                    title: 'Graded Assignment 01',
                    dueDate: '2024-03-20T23:59',
                },
                // Add more assignments as needed
            ]
        }
    },
    computed: {
        sortedAssignments() {
            return [...this.assignments].sort((a, b) => 
                new Date(a.dueDate) - new Date(b.dueDate)
            );
        }
    },
    methods: {
        formatDate(dateString) {
            return new Date(dateString).toLocaleString();
        },
        isPastDue(dateString) {
            return new Date(dateString) < new Date();
        },
        getStatusBadgeClass(dateString) {
            const dueDate = new Date(dateString);
            const now = new Date();
            const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) return 'bg-danger';
            if (diffDays <= 2) return 'bg-warning';
            return 'bg-success';
        },
        getStatusText(dateString) {
            const dueDate = new Date(dateString);
            const now = new Date();
            const diffDays = Math.ceil((dueDate - now) / (1000 * 60 * 60 * 24));
            
            if (diffDays < 0) return 'Past Due';
            if (diffDays === 0) return 'Due Today';
            if (diffDays === 1) return 'Due Tomorrow';
            return `${diffDays} days left`;
        }
    }
}