export default {
  data() {
    return {
      explanations: {
        Q1: "The XOR problem requires dividing the input space into 4 regions. This is because XOR is a non-linear problem that cannot be solved by a single perceptron. A network of perceptrons is needed to create the necessary decision boundaries.",
        Q2: "Similar to Q1, the XOR problem requires dividing the input space into 4 regions. This is due to the non-linear nature of the XOR function, which cannot be solved by a single perceptron."
      },
      showExplanation: {},
      lastSubmittedOn: null,
      dueDate: new Date('2025-10-31T23:59:59'),
      isAssignmentClosed: false,
      week: null,
      courseId: null,
      courseName: null,
      username:null,
      questions: null,
      selectedAnswers: {},
      score: null
    };
  },
  created() {
    this.checkDueDate();
  },
  mounted() {
    this.week = this.$route.params.weekId;
    this.courseId = this.$route.params.courseId;
    this.courseName = this.$route.params.courseName;
    this.username = this.$route.params.username;

    this.fetchQuestions();
  },
  methods: {
    async fetchQuestions() {
      try {
        const res = await fetch(`/api/subjects/${this.courseId}/weeks/${this.week}/assignments`, {
          method: "GET",
          headers: {
            'Authentication-Token': `Bearer ${localStorage.getItem('auth-token')}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.assignment && Array.isArray(data.assignment.questions)) {
            this.questions = data.assignment.questions;
            console.log(this.questions)
          } else {
            this.questions = [];
          }
        } else {
          console.error(`Error fetching questions: ${res.status} ${res.statusText}`);
        }
      } catch (error) {
        console.error('Failed to fetch questions:', error);
      }
    },
    checkDueDate() {
      const currentDate = new Date();
      this.isAssignmentClosed = currentDate > this.dueDate;
    },
    submitAssignment() {
      let totalScore = 0;
      this.questions.forEach((question) => {
        if (this.selectedAnswers[question.id] === question.correct_option) {
          totalScore += 2;
        }
      });
      this.score = totalScore;
      this.lastSubmittedOn = new Date();
    },
    formatDate(date) {
      return date ? date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }) : '';
    }
  },
  template: `
  <div>

    <!-- Horizontal Navbar -->
    <nav class="navbar bg-body-tertiary" style="background-color: blue">
      <div class="container-fluid">
        <a class="navbar-brand" href="#"> <img src="/static/components/images/book6.png" alt="Book"> StudyBuddy</a>
        <div class="d-flex">
          <h5 class="me-2 p-2"> {{username}} </h5>
          <router-link to="/"><button class="btn btn-danger" type="submit">Log Out</button></router-link>
        </div>
      </div>
    </nav>

    <!-- Vertical Navbar -->
    <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
      <router-link to="/course-display" class="navbar-brand text-center" href="#"><h4>{{courseName}}</h4></router-link>
      <router-link :to="{ name: 'Lectures', params: { courseId:courseId ,weekId: week, courseName:courseName, username:username } }" class="nav-link" ><h6>Lectures</h6></router-link>
      <router-link :to="{ name: 'ProgrammingAssignment', params: { courseId:courseId ,weekId: week, courseName:courseName, username:username } }" class="nav-link" href="#"><h6>Prog Assignment</h6></router-link>
      <router-link to="/notes" class="nav-link" href="#"><h6>Notes</h6></router-link>
    </nav>

    <!-- Main Content -->
    <div style="margin-top: -49rem; margin-left: 13rem;">
      <div class="container mt-3 bg-light d-flex justify-content-between">
        <div style="width: 70%;">
          <h2>Graded Assignment:</h2>
          <p class="text-danger">Due Date: 31 October 2025 at 23:59</p>
          <p v-if="isAssignmentClosed" class="text-danger">Submissions are closed.</p>
          <p v-if="lastSubmittedOn" class="text-success">Last Submitted on: {{ formatDate(lastSubmittedOn) }}</p>
          <p v-if="score !== null" class="text-success">Your Score: {{ score }}</p>

          <!-- Questions Card Display -->
          <div v-for="(question, index) in questions" :key="question.id" class="card mt-3">
            <h5 class="card-header d-flex justify-content-between align-items-center">
              <span>Q{{ index + 1 }}</span>
              <span>2 Points</span>
            </h5>
            <div class="card-body">
              <p>{{ question.question_text }}</p>
              <!-- Displaying 4 options with radio buttons -->
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'Q' + (index + 1)"
                  :value="question.option_a"
                  v-model="selectedAnswers[question.id]"
                />
                <label class="form-check-label">
                  {{ question.option_a }}
                </label>
              </div>
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'Q' + (index + 1)"
                  :value="question.option_b"
                  v-model="selectedAnswers[question.id]"
                />
                <label class="form-check-label">
                  {{ question.option_b }}
                </label>
              </div>
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'Q' + (index + 1)"
                  :value="question.option_c"
                  v-model="selectedAnswers[question.id]"
                />
                <label class="form-check-label">
                  {{ question.option_c }}
                </label>
              </div>
              <div class="form-check mt-3">
                <input
                  class="form-check-input"
                  type="radio"
                  :name="'Q' + (index + 1)"
                  :value="question.option_d"
                  v-model="selectedAnswers[question.id]"
                />
                <label class="form-check-label">
                  {{ question.option_d }}
                </label>
              </div>
             <p v-if="score !== null" :class="{
        'text-success': selectedAnswers[question.id] === question.correct_option,
        'text-danger': selectedAnswers[question.id] !== question.correct_option
      }" class="mt-3">
      Your Answer: {{ selectedAnswers[question.id] }}
    </p>

    <!-- Display Correct Answer -->
    <p v-if="score !== null" class="text-info mt-3">
      Correct Answer: {{ question.correct_option}}
    </p>
  </div>
</div>

          <button class="btn btn-primary mt-2" @click="submitAssignment" :disabled="isAssignmentClosed">Submit Assignment</button>
        </div>

        <!-- Right Section (AI Assistance Card) -->
        <div class="right-section d-flex flex-column align-items-center" style="width: 30%; margin-top:9rem;">
          <div class="card border-danger p-4" style="width: 90%; height: 20rem; border-radius: 4rem; display: flex; justify-content: center; align-items: center; text-align: center;">
            <div class="card-body text-danger mt-5">
              <h5 class="card-title m-2">Hi! How can I assist you?</h5>
              <input class="form-control" type="text" value="Type here..." aria-label="readonly input example">
              <button type="button" class="btn btn-primary m-2">Search</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
};
