export default {
    data() {
      return {
        // Default lecture data
        lectures: [
          {
            title: "Brief History of DL",
            url: "https://www.youtube.com/embed/zdmEzqpAG70",
          },
          {
            title: "The Deep Revival",
            url: "https://www.youtube.com/embed/EifcfTLIzxc",
          },
          {
            title: "Faster-Higher-Stronger",
            url: "https://www.youtube.com/embed/csM_nCAhIQk",
          },
        ],
        currentVideoUrl: "https://www.youtube.com/embed/zdmEzqpAG70", // Default video URL
        currentLectureTitle: "Brief History of DL", // Default title
        activeLectureIndex: 0, // Default active lecture index
        showAddLectureModal: false, // Control visibility of the add lecture modal
        newLectureTitle: "", // Store the new lecture title
        newLectureUrl: "", // Store the new lecture YouTube embed URL
      };
    },
    methods: {
      // Method to change the video and update the active lecture
      changeVideo(url, title, index) {
        this.currentVideoUrl = url;
        this.currentLectureTitle = title;
        this.activeLectureIndex = index;
      },
      // Method to open the add lecture modal
      openAddLectureModal() {
        this.showAddLectureModal = true;
      },
      // Method to close the add lecture modal
      closeAddLectureModal() {
        this.showAddLectureModal = false;
        this.newLectureTitle = "";
        this.newLectureUrl = "";
      },
      // Method to add a new lecture
      addLecture() {
        if (this.newLectureTitle && this.newLectureUrl) {
          const newLecture = {
            title: this.newLectureTitle,
            url: this.newLectureUrl,
          };
          this.lectures.push(newLecture);
          this.closeAddLectureModal();
        } else {
          alert("Please provide both a title and a YouTube embed link.");
        }
      },
      // Method to delete the active lecture
      deleteLecture() {
        if (this.lectures.length > 0) {
          this.lectures.splice(this.activeLectureIndex, 1);
          // Reset to the first lecture if available
          if (this.lectures.length > 0) {
            this.changeVideo(
              this.lectures[0].url,
              this.lectures[0].title,
              0
            );
          } else {
            // If no lectures are left, clear the video and title
            this.currentVideoUrl = "";
            this.currentLectureTitle = "No Lectures Available";
            this.activeLectureIndex = -1;
          }
        }
      },
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
            <div class="d-flex justify-content-between align-items-center mb-4">
              <!-- Lecture Title -->
              <h2 class="mb-0">{{ currentLectureTitle }}</h2>
  
              <!-- Add and Delete Buttons -->
              <div>
                <button class="btn btn-success me-2" @click="openAddLectureModal">Add Lecture</button>
                <button class="btn btn-danger" @click="deleteLecture">Delete Lecture</button>
              </div>
            </div>
  
            <!-- Video iframe -->
            <div class="mb-4">
              <iframe
                width="100%"
                height="500px"
                :src="currentVideoUrl"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
                class="rounded shadow"
              ></iframe>
            </div>
  
            <!-- Uploaded Lectures -->
            <h4 class="mb-3">Uploaded Lectures</h4>
            <div class="list-group">
              <a
                v-for="(lecture, index) in lectures"
                :key="index"
                class="list-group-item list-group-item-action d-flex justify-content-between align-items-center"
                :class="{ 'active-lecture': index === activeLectureIndex }"
                @click="changeVideo(lecture.url, lecture.title, index)"
              >
                {{ lecture.title }}
                <span v-if="index === activeLectureIndex" class="badge bg-primary rounded-pill">Now Playing</span>
              </a>
            </div>
          </div>
        </div>
  
        <!-- Add Lecture Modal -->
        <div v-if="showAddLectureModal" class="modal-backdrop">
          <div class="modal-content small-modal">
            <div class="modal-header">
              <h5 class="modal-title">Add New Lecture</h5>
              <button type="button" class="btn-close" @click="closeAddLectureModal"></button>
            </div>
            <div class="modal-body">
              <form>
                <div class="mb-3">
                  <label for="lectureTitle" class="form-label">Lecture Title</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lectureTitle"
                    v-model="newLectureTitle"
                    placeholder="Enter lecture title"
                  />
                </div>
                <div class="mb-3">
                  <label for="lectureUrl" class="form-label">YouTube Embed Link</label>
                  <input
                    type="text"
                    class="form-control"
                    id="lectureUrl"
                    v-model="newLectureUrl"
                    placeholder="Enter YouTube embed URL"
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" @click="closeAddLectureModal">Cancel</button>
              <button type="button" class="btn btn-primary" @click="addLecture">Add Lecture</button>
            </div>
          </div>
        </div>
      </div>
    `,
    styles: `
      .modal-backdrop {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
      }
  
      .modal-content {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        width: 400px; /* Smaller width */
      }
  
      .small-modal {
        width: 350px; /* Even smaller width */
        padding: 15px; /* Reduced padding */
      }
  
      .modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid #ddd;
        padding-bottom: 10px;
        margin-bottom: 15px;
      }
  
      .modal-title {
        margin: 0;
        font-size: 1.25rem;
      }
  
      .modal-body {
        margin-bottom: 15px;
      }
  
      .modal-footer {
        display: flex;
        justify-content: flex-end;
        border-top: 1px solid #ddd;
        padding-top: 10px;
        margin-top: 15px;
      }
  
      .btn-close {
        background: none;
        border: none;
        font-size: 1.25rem;
        cursor: pointer;
      }
    `,
  };