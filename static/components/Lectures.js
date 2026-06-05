export default {
    data() {
        return {
            currentVideoUrl: null,
            currentLectureTitle: null,
            lectures: [],
            showSummaryModal: false,
            showNotesModal: false,
            notes: "",
            week:null,
            username:null,
            courseId:null,
            courseName:null,
            summary: "This is a summary of the video lecture.",
            activeLectureIndex: 0,
            userQuery: "",
            messages: [], // Changed from responseText to messages array
            loading: false
        };
    },
    methods: {
async fetchLectures() {
    try {
        const res = await fetch(`/api/subjects/${this.courseId}/weeks/${this.week}/lectures`, {
            method: "GET",
            headers: {
                'Authentication-Token': `Bearer ${localStorage.getItem('auth-token')}`,
            },
        });

        if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.lectures) && data.lectures.length > 0) {
                this.lectures = data.lectures;
                console.log('Lectures fetched successfully:', this.lectures);
                // Set the first lecture as the default video
                console.log(this.lectures[0].video_url)
                this.changeVideo(this.lectures[0].video_url, this.lectures[0].title, 0);
            } else {
                console.error('No lectures found');
                this.lectures = []; // Reset lectures if no data
            }
        } else {
            console.error(`Error fetching lectures: ${res.status} ${res.statusText}`);
        }
    } catch (error) {
        console.error('Failed to fetch lectures:', error);
    }
},

changeVideo(url, title, index) {
    if (url && title) {
        this.currentVideoUrl = url;
        console.log(this.currentVideoUrl);
        this.currentLectureTitle = `Lecture: ${title}`;
        this.activeLectureIndex = index;
        console.log(`Now playing: ${title}`);
    } else {
        console.error('Invalid video data');
    }
},
        saveNotes() {
            console.log("Notes saved:", this.notes);
            this.showNotesModal = false;
            this.notes = "";
        },
        async sendQuery() {
            if (!this.userQuery.trim()) {
                alert("Please enter a question!");
                return;
            }
        
            this.loading = true;
            this.messages.push({ sender: 'user', text: this.userQuery }); // Add user query to messages
        
            console.log("Sending query:", this.userQuery);
        
            try {
                const response = await fetch("http://127.0.0.1:5000/query", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        session_id: this.sessionId || "test-session",
                        query: this.userQuery
                    })
                });
        
                if (!response.ok) {
                    throw new Error(`Server returned ${response.status} ${response.statusText}`);
                }
        
                const data = await response.json();
                this.messages.push({ sender: 'bot', text: data.response || "No response received." }); // Add bot response to messages
            } catch (error) {
                console.error("Error:", error);
                this.messages.push({ sender: 'bot', text: "Error connecting to server. Please try again." }); // Add error message to messages
            } finally {
                this.loading = false;
                this.userQuery = ""; // Clear user query input
            }
        }

    },
     mounted()  {
      this.week=this.$route.params.weekId;
      this.courseId=this.$route.params.courseId;
      this.courseName=this.$route.params.courseName;
      this.username=this.$route.params.username;

      this.fetchLectures()},
    template: `
    <div>
  
      <!-- Horizontal Navbar -->
      <nav class="navbar bg-body-tertiary" style="background-color: blue">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">
            <img src="/static/components/images/book6.png" alt="Book"> StudyBuddy
          </a>
          <div class="d-flex">
            <h5 class="me-2 p-2"> {{username}} </h5>
            <router-link to="/"><button class="btn btn-danger">Log Out</button></router-link>
          </div>
        </div>
      </nav>
  
      <!-- Vertical Sidebar -->
      <nav id="navbar-example3" class="nav navbar-light bg-light flex-column p-3" style="width:13rem; height: 100vh;">
        <router-link to="/course-display" class="navbar-brand text-center"><h4>{{courseName}}</h4></router-link>
        <router-link :to="{ name: 'GraddedAssignment', params: { courseId: courseId ,weekId: week, courseName:courseName, username:username } }" class="nav-link"><h6>Graded Assignment</h6></router-link>
         <router-link :to="{ name: 'ProgrammingAssignment', params: { courseId:courseId ,weekId: week, courseName:courseName, username:username } }" class="nav-link"><h6>Prog Assignment</h6></router-link>
        <router-link to="/notes" class="nav-link"><h6>Notes</h6></router-link>
      </nav>
  
      <!-- Main Content -->
      <div style="margin-top: -49rem; margin-left: 13rem;">
        <div class="container mt-3 bg-light bg-gradient p-4 rounded shadow">
          
          <!-- Header -->
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2 class="mb-0">{{ currentLectureTitle }}</h2>
            <div class="d-flex">
              <button class="btn btn-warning me-2" @click="showSummaryModal = true">Summary</button>
              <button class="btn btn-secondary" @click="showNotesModal = true">Notes</button>
            </div>
          </div>
  
          <!-- Video & AI Chat -->
          <div class="d-flex gap-4">
            <div class="flex-grow-1">
              <iframe width="100%" height="500px" :src="currentVideoUrl" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen class="rounded shadow">
              </iframe>
            </div>
            <!-- AI Chat -->
            <div class="card border-danger p-4" style="width: 30%; height: 500px; border-radius: 2rem; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2); display: flex; flex-direction: column;">
              <div class="card-body text-danger text-center chatbot-body">
                <h5 class="card-title m-2">Hi! How can I assist you?</h5>
                <div class="input-group mb-3">
                  <input v-model="userQuery" class="form-control" type="text" placeholder="Type here...">
                  <button @click="sendQuery" type="button" class="btn btn-primary" :disabled="loading">
                    <i :class="loading ? 'fas fa-spinner fa-spin' : 'fas fa-search'"></i>
                  </button>
                </div>
                <div class="mt-3 text-dark message-container" style="overflow-y: auto; height: 300px;">
                  <div v-for="(message, index) in messages" :key="index" :class="message.sender === 'user' ? 'message-user' : 'message-bot'">
                    <strong>{{ message.sender === 'user' ? 'You' : 'Bot' }}:</strong> {{ message.text }}
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Uploaded Lectures -->
          <h4 class="mb-3 mt-4">Uploaded Lectures</h4>
          <div class="list-group">
            <a v-for="(lecture, index) in lectures"
               :key="index"
               class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
               :class="{ 'active-lecture': index === activeLectureIndex }"
               @click="changeVideo(lecture.video_url, lecture.title, index)">
              {{ lecture.title }}
              <span v-if="index === activeLectureIndex" class="badge bg-primary rounded-pill">Now Playing</span>
            </a>
          </div>
        </div>
      </div>
  
      <!-- Summary Modal -->
      <div v-if="showSummaryModal" class="modal fade show d-block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Video Summary</h5>
              <button type="button" class="close" @click="showSummaryModal = false">&times;</button>
            </div>
            <div class="modal-body">
              <p>{{ summary }}</p>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showSummaryModal = false">Close</button>
            </div>
          </div>
        </div>
      </div>
  
      <!-- Notes Modal -->
      <div v-if="showNotesModal" class="modal fade show d-block">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Take Notes</h5>
              <button type="button" class="close" @click="showNotesModal = false">&times;</button>
            </div>
            <div class="modal-body">
              <textarea class="form-control" v-model="notes" rows="5" placeholder="Write your notes here..."></textarea>
            </div>
            <div class="modal-footer">
              <button class="btn btn-secondary" @click="showNotesModal = false">Close</button>
              <button class="btn btn-primary" @click="saveNotes">Save</button>
            </div>
          </div>
        </div>
      </div>
  
    </div>
  
  
    `
  };