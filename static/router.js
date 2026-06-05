import Dashboard from "./components/Dashboard.js"
import Login from "./components/Login.js"
import CourseDisplay from "./components/CourseDisplay.js"
import Lectures from "./components/Lectures.js"
import GraddedAssignment from "./components/GraddedAssignment.js"
import ProgrammingAssignment from "./components/ProgrammingAssignment.js"
import Notes from "./components/Notes.js"
import InstructorDashboard from "./components/InstructorDashboard.js"
import InstructorLectures from "./components/InstructorLectures.js"
import InstructorGraded from "./components/InstructorGraded.js"
import ProgressTracker from "./components/ProgressTracker.js"
import InstructorProgramming from "./components/InstructorProgramming.js"
import SWAnalysis from "./components/SWAnalysis.js"
import InstructorStats from "./components/InstructorStats.js"
import InstructorReport from "./components/InstructorReport.js"
// import SWAnalysis from "./components/InstructorProgramming.js"

const routes=[
    {'path': '/dashboard/:userid/:username', component: Dashboard},
    {'path': '/', component: Login},
    {'path': '/course-display/:courseId/:courseName/:username',name: 'CourseDisplay',component: CourseDisplay},
    {'path': '/lectures/:courseId/:weekId/:courseName/:username', component: Lectures, name:'Lectures'},
    {'path': '/gradded-assignment/:courseId/:weekId/:courseName/:username',name:'GraddedAssignment' ,component: GraddedAssignment},
    {'path': '/programming-assignment/:courseId/:weekId/:courseName/:username',name: 'ProgrammingAssignment', component: ProgrammingAssignment},
    {'path': '/notes', component: Notes},
    {'path': '/instructor-dashboard',component:InstructorDashboard},
    {'path':'/instructor-lectures', component: InstructorLectures},
    {'path':"/instructor-graded", component: InstructorGraded},
    {'path':"/instructor-report", component: InstructorReport},
    {'path':"/instructor-statistics", component: InstructorStats},
    {'path':'/instructor-programming', component: InstructorProgramming},
    {'path': '/progress', component: ProgressTracker},
    {'path': '/swanalysis', component: SWAnalysis}
    

]

export default new VueRouter({
    routes,
})