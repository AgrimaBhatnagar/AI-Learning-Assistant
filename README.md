# AI-Powered Virtual Learning Assistant

## Overview
AI-powered virtual learning assistant designed to enhance student engagement and learning outcomes. This GenAI-based agent provides personalized guidance, recommends relevant resources, and promotes effective study strategies while maintaining academic integrity.

## Installation & Running the Application

1. Install Flask:
```sh
 - pip install Flask
```
2. Run the application:
```sh
 - python main.py
```

 - We are using Flask so that in future when we integrate, Backend, it will be easy for us. 

## Technologies Used
 - Flask
 - Vue2 (CDN)
 - Bootstrap
 - Chart.js

# Application Routes

## General User Routes

 - /dashboard - Displays all courses at the center and provides navigation options for progress tracking and S/W analysis.

 - / (Login Page) - The application starts at the login page. Clicking login (without authentication) redirects to the dashboard.

 - /course-display - Displays course-related information.

 - /lectures - Shows all lectures in the center, a chatbot assistant on the right, and a button on the top-right for generating lecture summaries and custom notes.

 - /gradded-assignment - Displays MCQ-based graded assignments. Each question has an "Explain" button that provides AI-generated explanations. A chatbot assistant is available on the right.

 - /programming-assignment - Displays a programming assignment portal where users can read questions and submit their code as answers. An "Explain" button next to each question provides AI-generated pseudocode hints.

 - /notes - Displays all created notes. Users can add, edit, or delete notes.

 - /progress - Shows user progress, including completed and pending assignments.

 - /swanalysis - Provides visual charts for strength and weakness analysis. Shows dummy charts, will be update in future.

## Instructor-Only Routes

 - /instructor-dashboard - Displays instructor information.

 - /instructor-lectures - Shows all lectures managed by the instructor.

 - /instructor-graded - AI-based graded assignment question generator. Instructors can specify the number and difficulty level of generated questions.

 - /instructor-report - Renders a detailed report containing a summary of questions that was asked by the student.
                        For now, we have created a dummy report, and will be dynamically rendered in the future. 

 - /instructor-statistics - Displays visual charts for instructor insights. Shows dummy charts, will be update in future.

 - /instructor-programming - AI-based programming assignment question generator. Instructors can specify the number and difficulty level of generated questions.

# Usage

 1. Upon launching, the login page appears. Clicking login redirects to the dashboard.
 2. The dashboard presents available courses, with navigation options on the left.
 3. Users can explore lectures, assignments, programming exercises, and progress tracking.
 4. AI-based features assist in generating explanations, hints, and summaries.
 5. Instructors have additional tools for generating assignments and viewing student performance reports.
