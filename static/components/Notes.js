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
            <h5 class="me-2 p-2"> STUDENT NAME </h5>
            <router-link to="/">
              <button class="btn btn-danger" type="submit">Log Out</button>
            </router-link>
          </div>
        </div>
      </nav>

      <!------ Vertical Navbar ------>
      <nav id="navbar-example3" style="width:13rem; height: 100vh;" class="nav navbar-light bg-light flex-column p-3">
        <router-link to="/course-display" class="navbar-brand text-center" href="#"><h4>Deep Learning</h4></router-link>
        <router-link to="/lectures" class="nav-link active" aria-current="page" href="#"><h6>Lectures</h6></router-link>
        <router-link to="/gradded-assignment" class="nav-link" href="#"><h6>Graded Assignment</h6></router-link>
        <router-link to="/programming-assignment" class="nav-link" href="#"><h6>Prog Assignment</h6></router-link>
        <router-link to="/notes" class="nav-link" href="#"><h6>Notes</h6></router-link>
      </nav>

      <!---------------- Course Information Display --------------->
      <div style="margin-top: -49rem; margin-left: 13rem;">
        <div class="container mt-3 bg-light bg-gradient p-4 rounded shadow">
          <h2 class="mb-4">Notes:</h2>

          <!-- Add New Note Button -->
          <button class="btn btn-success mb-4" @click="openAddNoteModal">Add New Note</button>

          <!-- Notes Grid -->
          <div class="row">
            <div v-for="(note, index) in notes" :key="index" class="col-md-4 mb-4">
              <div class="card note-card">
                <div class="card-body">
                  <h6 class="card-subtitle mb-2 text-muted">{{ note.week }}</h6>
                  <h5 class="card-title">{{ note.title }}</h5>
                  <p class="card-text">{{ note.content }}</p>
                  <div class="d-flex justify-content-end">
                    <button type="button" class="btn btn-sm btn-primary me-2" @click="openEditNoteModal(index)">Edit</button>
                    <button type="button" class="btn btn-sm btn-warning" @click="deleteNote(index)">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Add/Edit Note Modal -->
      <div v-if="showNoteModal" class="modal-backdrop">
        <div class="modal-content small-modal">
          <div class="modal-header">
            <h5 class="modal-title">{{ isEditing ? 'Edit Note' : 'Add New Note' }}</h5>
            <button type="button" class="btn-close" @click="closeNoteModal"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="noteWeek" class="form-label">Week</label>
                <input
                  type="text"
                  class="form-control"
                  id="noteWeek"
                  v-model="currentNote.week"
                  placeholder="Enter week (e.g., Week 1)"
                />
              </div>
              <div class="mb-3">
                <label for="noteTitle" class="form-label">Title</label>
                <input
                  type="text"
                  class="form-control"
                  id="noteTitle"
                  v-model="currentNote.title"
                  placeholder="Enter note title"
                />
              </div>
              <div class="mb-3">
                <label for="noteContent" class="form-label">Content</label>
                <textarea
                  class="form-control"
                  id="noteContent"
                  v-model="currentNote.content"
                  placeholder="Enter note content"
                  rows="4"
                ></textarea>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="closeNoteModal">Cancel</button>
            <button type="button" class="btn btn-primary" @click="saveNote">{{ isEditing ? 'Save Changes' : 'Add Note' }}</button>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      // Sample notes data
      notes: [
        {
          week: "Week 1",
          title: "Deep Learning",
          content: "Lecture 1 notes",
        },
        {
          week: "Week 2",
          title: "Neural Networks",
          content: "Lecture 2 notes",
        },
        {
          week: "Week 3",
          title: "Backpropagation",
          content: "Lecture 3 notes",
        },
      ],
      showNoteModal: false, // Controls visibility of the note modal
      isEditing: false, // Tracks whether we're editing or adding a note
      currentNote: {
        week: "",
        title: "",
        content: "",
      },
      editIndex: null, // Tracks the index of the note being edited
    };
  },
  methods: {
    // Open the modal to add a new note
    openAddNoteModal() {
      this.isEditing = false;
      this.currentNote = { week: "", title: "", content: "" };
      this.showNoteModal = true;
    },
    // Open the modal to edit an existing note
    openEditNoteModal(index) {
      this.isEditing = true;
      this.currentNote = { ...this.notes[index] };
      this.editIndex = index;
      this.showNoteModal = true;
    },
    // Close the modal
    closeNoteModal() {
      this.showNoteModal = false;
    },
    // Save or update a note
    saveNote() {
      if (this.isEditing) {
        // Update the existing note
        this.notes[this.editIndex] = { ...this.currentNote };
      } else {
        // Add a new note
        this.notes.push({ ...this.currentNote });
      }
      this.closeNoteModal();
    },
    // Delete a note
    deleteNote(index) {
      if (confirm("Are you sure you want to delete this note?")) {
        this.notes.splice(index, 1);
      }
    },
  },
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
      width: 400px;
    }

    .small-modal {
      width: 350px;
      padding: 15px;
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

    .note-card {
      height: 100%;
      border: 1px solid #ddd;
      border-radius: 8px;
      transition: transform 0.2s;
    }

    .note-card:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .card-title {
      font-size: 1.1rem;
      font-weight: bold;
    }

    .card-text {
      font-size: 0.9rem;
      color: #555;
    }

    .card-subtitle {
      font-size: 0.8rem;
      color: #777;
    }
  `,
};