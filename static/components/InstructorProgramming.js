export default {
    template: `
      <div>
        <!------ Horizontal Navbar ------>
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
  
        <!------ Vertical Navbar ------>
        <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
          <router-link to="/instructor-dashboard" class="navbar-brand text-center" href="#"><h4>Deep Learning</h4></router-link>
          <router-link to="/instructor-lectures" class="nav-link active" aria-current="page"><h6>Lectures</h6></router-link>
          <router-link to="/instructor-graded" class="nav-link"><h6>Graded Assignment</h6></router-link>
          <router-link to="/instructor-programming" class="nav-link"><h6>Prog Assignment</h6></router-link>
          <router-link to="/instructor-report" class="nav-link"><h6>Report</h6></router-link>
          <router-link to="/instructor-statistics" class="nav-link"><h6>Statistics</h6></router-link>
        </nav>
  
        <!---------------- Course Information Display --------------->
        <div style="margin-top: -49rem; margin-left: 13rem;">
          <div class="container mt-3 bg-light bg-gradient p-4 rounded shadow">
            <h2 class="mb-4">Programming Assignment</h2>
  
            <!-- Combined Difficulty Level and AI Preferred Range -->
            <div class="card p-4 mb-4">
              <h5 class="mb-3">DIFFICULTY LEVEL RANGE</h5>
              <div class="mb-3">
                <label class="form-label">Range: 1-5 (Current: {{ difficultyLevel }})</label>
                <input type="range" class="form-range" min="1" max="5" v-model="difficultyLevel">
              </div>
  
              <!-- AI Preferred Range -->
              <div class="mt-4">
                <h5 class="mb-3">AI PREFERRED RANGE</h5>
                <div class="text-primary mb-3">3.5 - 4</div>
                <small class="text-muted">1 for easy: 5 for hard</small>
              </div>
  
              <!-- Generate Question Button -->
              <button class="btn btn-success mt-4" @click="generateQuestion">Generate Question</button>
            </div>
  
            <!-- Generated Question -->
            <div v-if="currentQuestion" class="mt-4">
              <h5 class="mb-3">Generated Question</h5>
              <div class="card p-4">
                <p class="fw-bold">{{ currentQuestion.question }}</p>
                <h6 class="mt-3">Test Cases:</h6>
                <ul>
                  <li v-for="(testCase, index) in currentQuestion.testCases" :key="index">
                    <strong>Input:</strong> {{ testCase.input }} <br>
                    <strong>Expected Output:</strong> {{ testCase.expectedOutput }}
                  </li>
                </ul>
              </div>
  
              <!-- Regenerate and Submit Buttons -->
              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-secondary me-2" @click="generateQuestion">Regenerate</button>
                <button class="btn btn-primary" @click="submitAssignment">Submit</button>
              </div>
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
    `,
  };