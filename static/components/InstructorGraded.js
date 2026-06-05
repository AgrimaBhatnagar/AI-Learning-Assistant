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
          <router-link to="/instructor-dashboard" class="navbar-brand text-center" href="#"><h4>Deep Learning</h4></router-link>
          <router-link to="/instructor-lectures" class="nav-link active" aria-current="page"><h6>Lectures</h6></router-link>
          <router-link to="/instructor-graded" class="nav-link"><h6>Graded Assignment</h6></router-link>
          <router-link to="/instructor-programming" class="nav-link"><h6>Prog Assignment</h6></router-link>
          <router-link to="/instructor-report" class="nav-link"><h6>Report</h6></router-link>
          <router-link to="/instructor-statistics" class="nav-link"><h6>Statistics</h6></router-link>
        </nav>
  
        <!-- Main Content Area -->
        <div style="margin-top: -49rem; margin-left: 13rem;">
          <div class="container mt-3 bg-light p-4 rounded shadow">
            <h4 class="mb-4">Graded Assignment 01</h4>
  
            <!-- Assignment Configuration -->
            <div class="row">
              <div class="col-md-6">
                <div class="card p-4 mb-4">
                  <h5 class="mb-3">DIFFICULTY LEVEL RANGE</h5>
                  <div class="mb-3">
                    <label class="form-label">Range: 1-5</label>
                    <input type="range" class="form-range" min="1" max="5" v-model="difficultyRange">
                  </div>
  
                  <h5 class="mb-3">NUMBER OF QUESTIONS</h5>
                  <select class="form-select mb-4" v-model="questionCount">
                    <option v-for="n in 6" :key="n" :value="n+4">{{ n + 4 }}</option>
                  </select>
  
                  <button class="btn btn-success" @click="generateAssignment">GENERATE</button>
                </div>
              </div>
  
              <div class="col-md-6">
                <div class="card p-4">
                  <h5 class="mb-3">AI PREFERRED RANGE</h5>
                  <div class="text-primary mb-3">3.5 - 4</div>
                  <small class="text-muted">1 for easy: 5 for hard</small>
                </div>
              </div>
            </div>
  
            <!-- Generated Questions -->
            <div v-if="questions.length > 0" class="mt-4">
              <h5 class="mb-3">Generated Questions</h5>
              <div class="card p-4">
                <div v-for="(question, index) in questions" :key="index" class="mb-4">
                  <p class="fw-bold">{{ index + 1 }}. {{ question.text }}</p>
                  <div v-for="(option, optIndex) in question.options" :key="optIndex" class="form-check">
                    <input
                      class="form-check-input"
                      type="radio"
                      :name="'question' + index"
                      :id="'question' + index + 'option' + optIndex"
                      :value="option"
                      v-model="question.selectedAnswer"
                    />
                    <label class="form-check-label" :for="'question' + index + 'option' + optIndex">
                      {{ option }}
                    </label>
                  </div>
                </div>
              </div>
  
              <!-- Regenerate and Submit Buttons -->
              <div class="d-flex justify-content-end mt-4">
                <button class="btn btn-secondary me-2" @click="regenerateQuestions">Regenerate</button>
                <button class="btn btn-primary" @click="submitAssignment">Submit</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `,
    data() {
      return {
        difficultyRange: 3, // Default difficulty level
        questionCount: 5, // Default number of questions
        questions: [], // Stores generated questions
      };
    },
    methods: {
      // Generate questions based on difficulty and count
      generateAssignment() {
        this.questions = this.generateQuestions(this.questionCount);
      },
      // Regenerate new questions
      regenerateQuestions() {
        this.questions = this.generateQuestions(this.questionCount);
      },
      // Submit the assignment
      submitAssignment() {
        console.log("Submitted Answers:", this.questions);
        alert("Assignment submitted successfully!");
      },
      // Helper function to generate questions
      generateQuestions(count) {
        const questions = [];
        for (let i = 0; i < count; i++) {
          questions.push({
            text: `What is the primary purpose of a ${this.getRandomDLTerm()} in deep learning?`,
            options: [
              "To reduce overfitting",
              "To increase model complexity",
              "To visualize data",
              "To preprocess data",
            ],
            selectedAnswer: "", // Track the selected answer
          });
        }
        return questions;
      },
      // Helper function to get random DL terms
      getRandomDLTerm() {
        const terms = [
          "activation function",
          "loss function",
          "optimizer",
          "neural network layer",
          "dropout layer",
        ];
        return terms[Math.floor(Math.random() * terms.length)];
      },
    },
  };