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
                  <h5 class="me-2 p-2">{{cred.username}}</h5>
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
          <div class="container mt-3 flex-grow-1">
              <h2 class="mb-4">My Courses:</h2>
              <div class="d-flex flex-row justify-content-center gap-3">
                  <router-link
                  v-for="course in cred.courses"
                  :key="course.id"
                  :to="{ name: 'CourseDisplay', params: { courseId: course.id,courseName: course.name,username:cred.username } }"
                  class="card border-danger text-white bg-danger mb-3 text-decoration-none rounded" style="width: 22rem; height:15rem;">
                      <div class="card-body text-white d-flex flex-column justify-content-center align-items-center">
                          <h3 class="card-title">{{ course.name }}</h3>
                      </div>
                  </router-link>
              </div>
          </div>
      </div>

      
  </div>
  `,
  data() {
    return {
      cred: {
        username:null,
        courses:null,
        userId:null

      },
    };
  },
  methods: {

      async fetchsubjects(){
          try{
           const res = await fetch("/api/subjects",{
        method: "GET",
        headers: {
          'Authentication-Token': `Bearer ${localStorage.getItem('auth-token')}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        console.log('Data fetched successfully:', data);
        this.cred.courses = data.subjects;
        console.log(data);

      } else {
        console.error(`Error fetching data: ${res.status}`);

      }
      }
      catch(error){
      console.error(err)}
      },

      },
      mounted()  {
      this.cred.userId=this.$route.params.id
      this.cred.username=this.$route.params.username;
      this.fetchsubjects()}

}