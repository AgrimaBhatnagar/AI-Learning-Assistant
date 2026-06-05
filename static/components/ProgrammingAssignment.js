export default {
  data() {
    return {
      showPseudocode: false, // State to control the visibility of the pseudocode
      code: '', // Variable to hold the code input
      lastSubmittedOn: null, // Track the last submission date and time
      dueDate: new Date('2025-10-31T23:59:59'), // Due date for the assignment (October 2025)
      isAssignmentClosed: false, // Track if the assignment is closed
      output: '', // Store the output of the code execution
      submissionStatus: '', // Store the submission status message
      courseId:null,
      week:null,
      courseName:null,
      username:null,
      testCases: [
      { input: "Hadoop MapReduce MapReduce Hadoop Fun", expected: { Hadoop: 2, MapReduce: 2, Fun: 1 }, description: "Test Case 1" },
      { input: "Hello World Hello", expected: { Hello: 2, World: 1 }, description: "Test Case 2" },
    ],
    testResults: []
    };
  },
  created() {
    // Check if the due date has passed when the component is created
    this.checkDueDate();
  },
  mounted (){
    this.week = this.$route.params.weekId;
    this.courseId = this.$route.params.courseId;
    this.courseName = this.$route.params.courseName;
    this.username = this.$route.params.username;
  },
  methods: {

    checkDueDate() {
      const currentDate = new Date();
      if (currentDate > this.dueDate) {
        this.isAssignmentClosed = true; // Disable submission if due date has passed
      }
    },
    submitAssignment() {
      // Set the current date and time when the assignment is submitted
      this.lastSubmittedOn = new Date();
    },
    formatDate(date) {
      if (!date) return '';
      return date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false, // Use 12-hour format (AM/PM)
      });
    },
    runCode() {
      this.output = '';
      this.testResults = [];
      try {
        const userFunction = new Function('input', this.code);
        this.testCases.forEach(test => {
          let result;
          try {
            result = userFunction(test.input);
          } catch (error) {
            result = `Error: ${error.message}`;
          }
          const isCorrect = JSON.stringify(result) === JSON.stringify(test.expected);
          this.testResults.push({ description: test.description, input: test.input, expected: test.expected, actual: result, passed: isCorrect });
        });
        this.output = 'Code executed successfully. Check the test results below.';
      } catch (error) {
        this.output = `Error executing code: ${error.message}`;
      }
    }
,
    submitCode() {
      // Logic to submit the code
      if (!this.isAssignmentClosed) {
        this.submitAssignment();
        this.submissionStatus = 'Code submitted successfully!';
      } else {
        this.submissionStatus = 'Submission is closed. Cannot submit code.';
      }
    }
  },
  template: `
    <div>
      <!------ Horizontal Navbar ------>
      <nav class="navbar bg-body-tertiary" style="background-color: blue">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="/static/components/images/book6.png" alt="Book"> StudyBuddy
          </a>
          <div class="d-flex">
            <h5 class="me-2 p-2"> {{username}} </h5>
            <router-link to="/"><button class="btn btn-danger" type="submit">Log Out</button></router-link>
          </div>
        </div>
      </nav>

      <!------ Vertical Navbar ------>
      <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
        <router-link to="/course-display" class="navbar-brand text-center" href="#"><h4>{{courseName}}</h4></router-link>
        <router-link :to="{ name: 'Lectures', params: { courseId:courseId ,weekId: week, courseName:courseName, username:username } }" class="nav-link" ><h6>Lectures</h6></router-link>
       <router-link :to="{ name: 'GraddedAssignment', params: { courseId: courseId ,weekId: week,courseName:courseName, username:username  } }" class="nav-link"><h6>Graded Assignment</h6></router-link>
        <router-link to="/notes" class="nav-link" href="#"><h6>Notes</h6></router-link>
      </nav>

      <!---------------- Course Information Display ---------------->
      <div style="margin-top: -49rem; margin-left: 13rem;">
        <div class="container mt-3 .bg-light.bg-gradient flex-grow-1">
          <h2 class="mb-4">Programming Assignment: </h2>
          <p class="text-danger fw-bold">Due Date on: 31st October 2025 at 23:59</p>
          <p v-if="isAssignmentClosed" class="text-danger fw-bold">It is past the due date. Submissions are closed.</p>
          <p v-if="lastSubmittedOn" class="text-success">Last Submitted on: {{ formatDate(lastSubmittedOn) }}</p>

          <h4 class="mb-3">Word Count using Hadoop MapReduce
            <button class="btn btn-info btn-sm" @click="showPseudocode = !showPseudocode">Explain</button>
          </h4>
          <p>
           Write a Hadoop MapReduce program that reads a large text file and outputs the frequency of each word. The input will be a text file containing multiple lines of text.
          </p>

          <!-- Pseudocode Display -->
          <div v-if="showPseudocode" class="alert alert-light">
            <h5>Pseudocode:</h5>
            <pre>
#!/usr/bin/env python3
import sys

# Mapper function to read input and emit word count
def mapper():
    for line in sys.stdin:
        line = line.strip()  # Removing leading and trailing whitespace
        words = line.split()  # Splitting the line into words
        for word in words:
            print(f"{word}\t1")  # Output each word with a count of 1

# Reducer function to aggregate word counts
def reducer():
    current_word = None
    current_count = 0
    word = None

    for line in sys.stdin:
        line = line.strip()  # Removing leading and trailing whitespace
        word, count = line.split('\t', 1)
        try:
            count = int(count)  # Convert count to integer
        except ValueError:
            continue
        if current_word == word:
            current_count += count
        else:
            if current_word:
                print(f"{current_word}\t{current_count}")
            current_word = word
            current_count = count
    if current_word == word:
        print(f"{current_word}\t{current_count}")

# Main execution point
if __name__ == "__main__":
    if "map" in sys.argv[1]:
        mapper()
    elif "reduce" in sys.argv[1]:
        reducer()





            </pre>
          </div>

          <h4 class="mb-3">Write Code Here</h4>
          <div class="form-floating mb-5" style="width:100%;">
            <textarea class="form-control border-danger" style="height:20rem;" placeholder="Leave a comment here" id="floatingTextarea2" v-model="code"></textarea>
          </div>

          <!-- Button Container -->
          <div class="d-flex justify-content-end">
            <button class="btn btn-success me-2" @click="runCode">Run</button>
            <button class="btn btn-primary" @click="submitCode" :disabled="isAssignmentClosed">Submit</button>
          </div>

          <!-- Output Display -->
          <div v-if="output" class="mt-3">
            <h4>Output:</h4>
            <pre class="alert alert-info">{{ output }}</pre>
          </div>

          <!-- Submission Status Display -->
          <div v-if="submissionStatus" class="mt-3">
            <h4>Submission Status:</h4>
            <p class="alert" :class="{'alert-success': !isAssignmentClosed, 'alert-danger': isAssignmentClosed}">
              {{ submissionStatus }}
            </p>
          </div>
          <div v-if="testResults.length">
  <h4>Test Results:</h4>
  <ul>
    <li v-for="(result, index) in testResults" :key="index">
      <strong>{{ result.description }}</strong> -
      <span v-if="result.passed" class="text-success">Passed</span>
      <span v-else class="text-danger">Failed</span><br>
      <strong>Input:</strong> {{ result.input }}<br>
      <strong>Expected:</strong> {{ result.expected }}<br>
      <strong>Actual:</strong> {{ result.actual }}
    </li>
  </ul>
</div>

          <h4 class="mb-3">Test Cases</h4>

          <div class="d-flex justify-content-between">
            <!-- Test Case Section -->
            <div class="card" style="width:75%;">
              <div class="card-header">
                Test Case 1
              </div>
              <div class="card-body">
                <p>Hadoop MapReduce MapReduce Hadoop Fun</p>
              </div>
            </div>

            <!-- Expected Output Section -->
            <div class="card" style="width:24%;">
              <div class="card-body">
                <h5 class="card-title">Expected Output</h5>
                <p class="card-text">Hadoop 2</p>
<p class="card-text">MapReduce 2</p>
<p class="card-text">Fun 1</p>
              </div>
            </div>
          </div>

          <!----- New Test Case----->
          <div class="d-flex justify-content-between mt-2">
            <!-- Test Case Section -->
            <div class="card" style="width:75%;">
              <div class="card-header">
                Test Case 2
              </div>
              <div class="card-body">
                <p>Hello World Hello</p>
              </div>
            </div>

            <!-- Expected Output Section -->
            <div class="card" style="width:24%;">
              <div class="card-body">
                <h5 class="card-title">Expected Output</h5>
                <p class="card-text">Hello 2</p>
                <p class="card-text">World 1</p>
              </div>
            </div>
          </div>

          <p>
            For more details about the course syllabus, faculty, and content, please click
            <a href="https://www.iitm.ac.in" target="_blank">this link</a>.
          </p>
        </div>
      </div>
    </div>
  `
};