export default{
    template: `
    <div>

<!------horizontal navbar------>

    <nav class="navbar bg-body-tertiary" style="background-color: blue">
  <div class="container-fluid">
    <a class="navbar-brand" href="#"> <img src="/static/components/images/book6.png" alt="Book"> StudyBuddy</a>
    <div class="d-flex">
      <h5 class="me-2 p-2"> {{cred.username}} </h5>
      <router-link to="/"><button class="btn btn-danger" type="submit">Log Out</button></router-link>
    </div>
  </div>
</nav>

<!------vertical navbar--->
<!-- Vertical Navbar with Dropdowns -->
      <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
        <router-link to="/course-display" class="navbar-brand text-center"><h4>{{cred.courseName}}</h4></router-link>
        <div>
          <div class="accordion" id="weekAccordion">
            <div v-for="week in 2" :key="week" class="accordion-item">
              <h2 class="accordion-header" :id="'heading' + week">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#collapse' + week" aria-expanded="false" :aria-controls="'collapse' + week">
                  Week {{ week }}
                </button>
              </h2>
              <div :id="'collapse' + week" class="accordion-collapse collapse" :aria-labelledby="'heading' + week" data-bs-parent="#weekAccordion">
                <div class="accordion-body">
                  <ul class="list-unstyled">
                    <li>
                      <router-link :to="{ name: 'Lectures', params: { courseId:cred.courseId ,weekId: week, courseName:cred.courseName,username:cred.username } }" class="nav-link">Lectures</router-link>
                    </li>
                    <li>
                      <router-link :to="{ name: 'GraddedAssignment', params: { courseId:cred.courseId ,weekId: week, courseName:cred.courseName, username:cred.username } }" class="nav-link">Graded Assignment</router-link>
                    </li>
                    <li>
                      <router-link :to="{ name: 'ProgrammingAssignment', params: { courseId:cred.courseId ,weekId: week, courseName:cred.courseName, username:cred.username } }" class="nav-link">Prog Assignment</router-link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
<!----------------course information display--------------->
<div style="margin-top: -49rem; margin-left: 13rem;">
<div class="container mt-3 .bg-light.bg-gradient flex-grow-1">
<h2 class="mb-4">Course Information : </h2>
<h4 class="mb-3">Course Faculty</h4>
          <p>
            <b>Prof. Mitesh M. Khapra</b><br />
            Department of Computer Science and Engineering, IIT Madras
          </p>

          <h4 class="mb-3">Instructors</h4>
          <ul>
            <li>Manojkumar Khara</li>
            <li>Karthik Thiagarajan</li>
          </ul>

          <h4 class="mb-3">Study Material</h4>
          <p>
            The learners are encouraged to make the best use of the interaction sessions with the course support team to clarify their doubts. Below are the recommended books for this course:
          </p>
          <ol>
            <li><i>Deep Learning: Foundations and Concepts</i>, by Chris Bishop and Hugh Bishop</li>
            <li><i>Deep Learning</i>, by Ian Goodfellow, Yoshua Bengio, and Aaron Courville. An MIT Press book. 2016.</li>
            <li><i>Neural Networks and Deep Learning: A Textbook</i>, by Charu C. Aggarwal. Springer. 2019.</li>
          </ol>

          <p>
            For more details about the course syllabus, faculty, and content, please click
            <a href="https://www.iitm.ac.in" target="_blank">this link</a>.
          </p>
        </div>
      </div>


</div>
`,
data() {
    return {
      cred: {
        courseName:null,
        courses:null,
        courseId:null,
        userId:null,
        username:null,

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
      this.cred.courseName=this.$route.params.courseName;
      this.cred.courseId=this.$route.params.courseId;
      this.cred.username=this.$route.params.username;
      this.fetchsubjects()}

}