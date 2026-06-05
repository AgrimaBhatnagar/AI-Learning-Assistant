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
                    <h5 class="me-2 p-2">INSTRUCTOR NAME</h5>
                    <router-link to="/">
                        <button class="btn btn-danger" type="submit">Log Out</button>
                    </router-link>
                </div>
            </div>
        </nav>

        <!-- Vertical Navbar -->

        <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
<router-link to="/instructor-dashboard" class="navbar-brand text-center" href="#"><h4>Deep Learning</h4></router-link>            <router-link to="/instructor-lectures" class="nav-link active" aria-current="page"><h6>Lectures</h6></router-link>
            <router-link to="/instructor-graded" class="nav-link"><h6>Graded Assignment</h6></router-link>
            <router-link to="/instructor-programming" class="nav-link"><h6>Prog Assignment</h6></router-link>
            <router-link to="/instructor-report" class="nav-link"><h6>Report</h6></router-link>
            <router-link to="/instructor-statistics" class="nav-link"><h6>Statistics</h6></router-link>
        </nav>

        <!-- Main Content Area -->
        <div style="margin-top: -49rem; margin-left: 13rem;">
            <div class="container mt-3 bg-light">
                <router-view></router-view>
            </div>
        </div>
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
    `
} 