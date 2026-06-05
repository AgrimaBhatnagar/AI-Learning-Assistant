from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, UTC

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    full_name = db.Column(db.String(120), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    role = db.Column(db.String(20))

    # Relationships
    subjects = db.relationship('Subject', secondary='user_subjects', back_populates='users')
    user_assignments = db.relationship('UserAssignment', back_populates='user')

class Subject(db.Model):
    __tablename__ = 'subjects'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(20), nullable=False)
    semester = db.Column(db.String(50))
    instructor_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    # Relationships
    users = db.relationship('User', secondary='user_subjects', back_populates='subjects')
    lectures = db.relationship('Lecture', back_populates='subject')
    assignments = db.relationship('Assignment', back_populates='subject')

class UserSubject(db.Model):
    __tablename__ = 'user_subjects'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)

class Lecture(db.Model):
    __tablename__ = 'lectures'
    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    week_number = db.Column(db.Integer, nullable=False)
    title = db.Column(db.String(200), nullable=False)
    video_url = db.Column(db.String(500), nullable=False)
    description = db.Column(db.Text)

    # Relationship
    subject = db.relationship('Subject', back_populates='lectures')
    lecture_questions = db.relationship('Lecture_Question', back_populates='lecture', cascade='all, delete-orphan')


class Lecture_Question(db.Model):
    __tablename__ = 'lecture_questions'
    id = db.Column(db.Integer, primary_key=True)
    lecture_id = db.Column(db.Integer, db.ForeignKey('lectures.id'), nullable=False)
    timestamp_seconds = db.Column(db.Integer, nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    option_a = db.Column(db.String(200), nullable=False)
    option_b = db.Column(db.String(200), nullable=False)
    option_c = db.Column(db.String(200), nullable=False)
    option_d = db.Column(db.String(200), nullable=False)
    correct_option = db.Column(db.String(1), nullable=False)  # 'A', 'B', 'C', or 'D'
    created_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))

    # Relationship
    lecture = db.relationship('Lecture', back_populates='lecture_questions')

    def __repr__(self):
        return f"<Lecture_Question(id={self.id}, question_text='{self.question_text}', created_at='{self.created_at}')>"
    
    

class Assignment(db.Model):
    __tablename__ = 'assignments'
    id = db.Column(db.Integer, primary_key=True)
    subject_id = db.Column(db.Integer, db.ForeignKey('subjects.id'), nullable=False)
    week_number = db.Column(db.Integer, nullable=False) 
    title = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    due_date = db.Column(db.DateTime, nullable=False)
    total_marks = db.Column(db.Integer, nullable=False)
    assignment_type = db.Column(db.String(20), nullable=False)  # 'MCQ' or 'Programming'

    # Relationships
    subject = db.relationship('Subject', back_populates='assignments')
    user_assignments = db.relationship('UserAssignment', back_populates='assignment')
    mcq_questions = db.relationship('Graded_Assignment', back_populates='assignment', cascade='all, delete-orphan')
    programming_questions = db.relationship('Programming_Assignment', back_populates='assignment', cascade='all, delete-orphan')

class Graded_Assignment(db.Model):
    __tablename__ = 'mcq_questions'
    id = db.Column(db.Integer, primary_key=True)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    hint = db.Column(db.Text, nullable=True)
    option_a = db.Column(db.String(200), nullable=False)
    option_b = db.Column(db.String(200), nullable=False)
    option_c = db.Column(db.String(200), nullable=False)
    option_d = db.Column(db.String(200), nullable=False)
    correct_option = db.Column(db.String(1), nullable=False)  # 'A', 'B', 'C', or 'D'

    # Relationship
    assignment = db.relationship('Assignment', back_populates='mcq_questions')

class Programming_Assignment(db.Model):
    __tablename__ = 'programming_questions'
    id = db.Column(db.Integer, primary_key=True)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'), nullable=False)
    question_text = db.Column(db.Text, nullable=False)
    hint = db.Column(db.Text, nullable=True)

    # Relationship
    assignment = db.relationship('Assignment', back_populates='programming_questions')
    test_cases = db.relationship('TestCase', back_populates='programming_question', cascade='all, delete-orphan')

class TestCase(db.Model):
    __tablename__ = 'test_cases'
    id = db.Column(db.Integer, primary_key=True)
    programming_question_id = db.Column(db.Integer, db.ForeignKey('programming_questions.id'), nullable=False)
    input_data = db.Column(db.Text, nullable=False)
    expected_output = db.Column(db.Text, nullable=False)
    is_public = db.Column(db.Boolean, default=True)  # Public or Private test case

    # Relationship
    programming_question = db.relationship('Programming_Assignment', back_populates='test_cases')

class UserAssignment(db.Model):
    __tablename__ = 'user_assignments'
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    assignment_id = db.Column(db.Integer, db.ForeignKey('assignments.id'), nullable=False)
    marks_obtained = db.Column(db.Integer)
    submitted_at = db.Column(db.DateTime, default=lambda: datetime.now(UTC))

    # Relationships
    user = db.relationship('User', back_populates='user_assignments')
    assignment = db.relationship('Assignment', back_populates='user_assignments')