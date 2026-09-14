# AI-Powered Learning Assistant

A Generative AI-powered learning platform that uses **Retrieval-Augmented Generation (RAG)** and **Large Language Models (LLMs)** to help students understand course material, ask academic questions, generate summaries, receive personalized learning recommendations, and get contextual study guidance.

---

## Overview

The **AI-Powered Learning Assistant** integrates Generative AI into an interactive learning platform to provide contextual and personalized academic support.

The platform supports both **student and instructor workflows**, combining AI-powered assistance with course management, assignments, notes, progress tracking, and learning-related analytics.

The project explores how RAG and LLM-based capabilities can be integrated into a practical educational application rather than being used only as a standalone chatbot.

---

## Key Features

### Student Features

- **Document Question Answering**  
  Ask questions about academic learning material and receive context-aware AI-generated responses.

- **Context-Aware Retrieval**  
  Retrieve relevant learning content to provide more relevant responses to user queries.

- **Academic Summarization**  
  Generate concise summaries of lectures and learning material.

- **Personalized Learning Recommendations**  
  Provide study guidance and recommendations based on the learner's context.

- **AI-Powered Explanations**  
  Generate explanations for questions in graded assignments.

- **Programming Guidance**  
  Provide pseudocode-oriented guidance for programming assignments.

- **Lecture Assistance**  
  Access lectures together with AI-powered summaries, explanations, and question answering.

- **Study Notes**  
  Create and manage personalized learning notes.

- **Progress Tracking**  
  Monitor learning activities and academic progress.

- **Learning Analysis**  
  Provide learning-related insights through the application interface.

### Instructor Features

- Instructor dashboard
- Lecture management
- AI-assisted graded question generation
- AI-assisted programming question generation
- Student reporting
- Instructor statistics and analytics

---

## System Architecture & Application Workflow

The application connects the user interface, backend services, learning workflows, and AI pipeline, with retrieval and LLM generation used for context-aware AI features.

```text
                         ┌─────────────────────────┐
                         │   Student / Instructor  │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Vue.js Frontend    │
                         │  Learning & Instructor  │
                         │       Interface         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │      Flask Backend      │
                         │   Application Services  │
                         └────────────┬────────────┘
                                      │
                    ┌─────────────────┼─────────────────┐
                    │                 │                 │
                    ▼                 ▼                 ▼
             ┌────────────┐   ┌──────────────┐   ┌──────────────┐
             │   Course   │   │  Assignment  │   │    User &    │
             │   Content  │   │   Workflows  │   │ Learning Data│
             └─────┬──────┘   └──────┬───────┘   └──────────────┘
                   │                  │
                   └─────────┬────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │   AI Processing  │
                    │     Workflow     │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │     Retrieval    │
                    │      Layer       │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Relevant Learning│
                    │     Context      │
                    └────────┬─────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │       LLM        │
                    │    Generation    │
                    └────────┬─────────┘
                             │
                             ▼
              ┌────────────────────────────────┐
              │       Context-Aware Output     │
              ├────────────────────────────────┤
              │ • Academic Q&A                 │
              │ • Lecture Summaries            │
              │ • Custom Study Notes            │
              │ • Assignment Explanations       │
              │ • Programming Guidance          │
              │ • Learning Recommendations      │
              └────────────────────────────────┘
                             │
                             ▼
                    ┌──────────────────┐
                    │ Student /        │
                    │ Instructor UI    │
                    └──────────────────┘
