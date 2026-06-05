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
          <div class="container mt-3 bg-light bg-gradient p-4 rounded shadow">
            <h2 class="mb-4">Report</h2>
  
            <!-- Combined Difficulty Level and AI Preferred Range -->
            <div class="card p-4 mb-4">
              <dl class="row">
  <dt class="col-sm-3">Description lists</dt>
  <dd class="col-sm-9">A description list is perfect for defining terms.</dd>

  <dt class="col-sm-3">Term</dt>
  <dd class="col-sm-9">
    <p>Definition for the term.</p>
    <p>And some more placeholder definition text.</p>
  </dd>

  <dt class="col-sm-3">Another term</dt>
  <dd class="col-sm-9">This definition is short, so no extra paragraphs or anything.</dd>

  <dt class="col-sm-3 text-truncate">Truncated term is truncated</dt>
  <dd class="col-sm-9">This can be useful when space is tight. Adds an ellipsis at the end.</dd>

  <dt class="col-sm-3">Nesting</dt>
  <dd class="col-sm-9">
    <dl class="row">
      
      <dd class="col-sm-8">I heard you like definition lists. Let me put a definition list inside your definition list.</dd>
    </dl>
  </dd>
</dl>
<table class="table caption-top">
  <caption>Student Performance Report</caption>
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Student Name</th>
      <th scope="col">Roll Number</th>
      <th scope="col">Grade</th>
      <th scope="col">Remarks</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th style="background-color:rgb(182, 248, 255)"class="row-1" scope="row">1</th>
      <td style="background-color:rgb(182, 248, 255)" class="row-1">Alice Johnson</td>
      <td style="background-color:rgb(182, 248, 255)" class="row-1">202301</td>
      <td style="background-color:rgb(182, 248, 255)" class="row-1">A</td>
      <td style="background-color:rgb(182, 248, 255)" class="row-1">Excellent</td>
    </tr>
    <tr>
      <th style="background-color:rgb(255, 195, 229)" class="row-2" scope="row">2</th>
      <td style="background-color:rgb(255, 195, 229)" class="row-2">Bob Williams</td>
      <td style="background-color:rgb(255, 195, 229)" class="row-2">202302</td>
      <td style="background-color:rgb(255, 195, 229)" class="row-2">B+</td>
      <td style="background-color:rgb(255, 195, 229)" class="row-2">Good</td>
    </tr>
    <tr>
      <th style="background-color:rgb(255, 253, 182)" class="row-3"scope="row">3</th>
      <td style="background-color:rgb(255, 253, 182)" class="row-3">Emma Brown</td>
      <td style="background-color:rgb(255, 253, 182)" class="row-3">202303</td>
      <td style="background-color:rgb(255, 253, 182)" class="row-3">B</td>
      <td style="background-color:rgb(255, 253, 182)" class="row-3">Needs Improvement</td>
    </tr>
  </tbody>
</table>

  
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        difficultyLevel: 3, // Default difficulty level
        currentQuestion: null, // Stores the generated question
        questions: [
          {
            difficulty: 1,
            question: "Write a function to add two numbers.",
            testCases: [
              { input: "2, 3", expectedOutput: "5" },
              { input: "10, 20", expectedOutput: "30" },
            ],
          },
          {
            difficulty: 2,
            question: "Write a function to find the maximum of two numbers.",
            testCases: [
              { input: "2, 3", expectedOutput: "3" },
              { input: "10, 20", expectedOutput: "20" },
            ],
          },
          {
            difficulty: 3,
            question: "Write a function to check if a number is prime.",
            testCases: [
              { input: "7", expectedOutput: "True" },
              { input: "10", expectedOutput: "False" },
            ],
          },
          {
            difficulty: 4,
            question: "Write a function to reverse a string.",
            testCases: [
              { input: "'hello'", expectedOutput: "'olleh'" },
              { input: "'world'", expectedOutput: "'dlrow'" },
            ],
          },
          {
            difficulty: 5,
            question: "Write a function to find the factorial of a number.",
            testCases: [
              { input: "5", expectedOutput: "120" },
              { input: "3", expectedOutput: "6" },
            ],
          },
        ],
      };
    },
    methods: {
      // Generate a question based on the selected difficulty level
      generateQuestion() {
        const filteredQuestions = this.questions.filter(
          (q) => q.difficulty === this.difficultyLevel
        );
        if (filteredQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * filteredQuestions.length);
          this.currentQuestion = filteredQuestions[randomIndex];
        } else {
          this.currentQuestion = null;
        }
      },
      // Submit the assignment
      submitAssignment() {
        console.log("Assignment Submitted:", this.currentQuestion);
        // Simulate submission (e.g., send data to backend)
      },
    },
    styles: `
      .card {
        transition: transform 0.2s;
        border: 1px solid #ddd;
        border-radius: 8px;
      }
  
      .card:hover {
        transform: scale(1.02);
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      }
  
      .form-range {
        width: 100%;
      }
  
      .btn-success {
        background-color: #28a745;
        border-color: #28a745;
      }
  
      .btn-primary {
        background-color: #007bff;
        border-color: #007bff;
      }
  
      .btn-secondary {
        background-color: #6c757d;
        border-color: #6c757d;
      }
  
      .text-primary {
        color: #007bff !important;
      }
  
      .text-muted {
        color: #6c757d !important;
      }
      
      .row-1 {
        background-color:rgb(255, 195, 229);
      }
  
      .row-2 {
        background-color:rgb(182, 248, 255);
      }
  
      .row-3 {
        background-color:rgb(255, 253, 182);
      }
    `,
  };