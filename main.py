from flask import Blueprint, jsonify, request, abort, Flask, render_template
from models import *
from werkzeug.security import check_password_hash
import jwt
from datetime import datetime, timedelta
import os
import subprocess

app = Flask(__name__)
print("flask app initiated")

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'  # SQLite database file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Disable modification tracking

# Initialize the database with the app
db.init_app(app)


api = Blueprint('api', __name__, url_prefix='/api')
auth = Blueprint('auth', __name__, url_prefix='/auth')

# JWT Configuration
JWT_SECRET_KEY = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')  # Use environment variable in production
JWT_ACCESS_TOKEN_EXPIRES = timedelta(hours=1)

# dummies for chatbot query API - begin


# Base = declarative_base()
# engine = create_engine("sqlite:///studdybuddy.db")
# DBSession = sessionmaker(bind=engine)

# class Conversation(Base):
#     __tablename__ = "conversations"
#     id = 1
#     session_id = "dummy_session"
#     user_query = "dummy query"
#     agent_response = "dummy response"
#     timestamp = 0

# faiss_index = None
# metadata_docs = []


def search_documents(user_query, index, metadata, k=3):
    return [{"id": 1, "content": "Dummy document content"}]


async def call_gemini_api(prompt):
    return "This is a dummy AI response."


# dummy functions for chatbot query API - end

def generate_token(user_id):
    """Generates a JWT access token for the given user ID."""
    payload = {
        'user_id': user_id,
        'exp': datetime.utcnow() + JWT_ACCESS_TOKEN_EXPIRES
    }
    return jwt.encode(payload, JWT_SECRET_KEY, algorithm='HS256')


def verify_token():
    """Extracts and verifies JWT token from Authorization header."""
    auth_header = request.headers.get('Authentication-Token')

    if not auth_header or not auth_header.startswith('Bearer '):
        print("inside if")
        abort(401, description="Token is missing or malformed")

    token = auth_header.split(" ")[1]  # Extract token after "Bearer"

    try:
        payload = jwt.decode(token, JWT_SECRET_KEY, algorithms=['HS256'])
        return payload['user_id']
    except jwt.ExpiredSignatureError:
        abort(401, description="Token has expired")
    except jwt.InvalidTokenError:
        abort(401, description="Invalid token")


# login route
@auth.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    print(data)
    if not data or 'email' not in data or 'password' not in data:
        return jsonify({'message': 'Email and password are required'}), 400

    user = User.query.filter_by(email=data['email']).first()
    print(user)

    if not user or not check_password_hash(user.password_hash, data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    token = generate_token(user.id)
    return jsonify({
        'message': 'Login successful',
        'token': token,
        'user': {
            'id': user.id,
            'username': user.username,
            'full_name': user.full_name,
            'email': user.email,
            'role': user.role
        }
    }), 200


# route to fetch registered subjects and add new subjects
@api.route('/subjects', methods=['GET', 'POST'])
def subjects():
    """Handles retrieving enrolled subjects for students and adding new subjects for instructors."""
    user_id = verify_token()  # Extract user ID from JWT token
    user = User.query.get_or_404(user_id)

    if request.method == 'GET':
        # Return subjects the student is enrolled in
        subjects = Subject.query.join(UserSubject).filter(UserSubject.user_id == user.id).all()
        return jsonify({
            'subjects': [
                {
                    'id': subject.id,
                    'name': subject.name,
                    'code': subject.code,
                    'semester': subject.semester
                }
                for subject in subjects
            ]
        }), 200

    elif request.method == 'POST':
        # Only instructors can create subjects
        if user.role != "instructor":
            return jsonify({'message': 'Permission denied. Only instructors can add subjects.'}), 403

        data = request.get_json()
        if not data or 'name' not in data or 'code' not in data:
            return jsonify({'message': 'Invalid input'}), 400

        new_subject = Subject(
            name=data['name'],
            code=data['code'],
            semester=data.get('semester'),
            instructor_id=user.id
        )
        db.session.add(new_subject)
        db.session.commit()

        return jsonify({
            'id': new_subject.id,
            'name': new_subject.name,
            'code': new_subject.code,
            'semester': new_subject.semester,
            'instructor_id': new_subject.instructor_id
        }), 201


# View, update and delete a specific subject
@api.route('/subjects/<int:subject_id>', methods=['GET', 'PUT', 'DELETE'])
def subject_by_id(subject_id):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    subject = Subject.query.get_or_404(subject_id)

    if request.method == 'GET':
        return jsonify({
            'id': subject.id,
            'name': subject.name,
            'code': subject.code,
            'semester': subject.semester,
            'instructor_id': subject.instructor_id
        }), 200

    elif request.method == 'PUT':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can update this subject.'}), 403

        data = request.get_json()
        if not data or 'name' not in data or 'code' not in data:
            return jsonify({'message': 'Invalid input'}), 400

        subject.name = data['name']
        subject.code = data['code']
        subject.semester = data.get('semester')
        db.session.commit()

        return jsonify({
            'id': subject.id,
            'name': subject.name,
            'code': subject.code,
            'semester': subject.semester,
            'instructor_id': subject.instructor_id
        }), 200

    elif request.method == 'DELETE':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can delete this subject.'}), 403

        db.session.delete(subject)
        db.session.commit()
        return '', 204

    # Fetch all weeks for a specific subject or add a new week


@api.route('/subjects/<int:subject_id>/weeks', methods=['GET', 'POST'])
def subject_weeks(subject_id):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    subject = Subject.query.get_or_404(subject_id)

    if request.method == 'GET':
        weeks = Lecture.query.filter_by(subject_id=subject_id).distinct(Lecture.week_number).all()

        week_numbers = sorted(set(lecture.week_number for lecture in weeks))
        return jsonify({'weeks': [{'week_number': week} for week in week_numbers]}), 200

    elif request.method == 'POST':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can add weeks.'}), 403

        data = request.get_json()
        if not data or 'week_number' not in data:
            return jsonify({'message': 'Invalid input. Week number is required.'}), 400

        existing_week = Lecture.query.filter_by(subject_id=subject_id, week_number=data['week_number']).first()
        if existing_week:
            return jsonify({'message': 'Week already exists for this subject.'}), 400

        return jsonify({'message': f'Week {data["week_number"]} added to subject {subject.name}'}), 201


# View , update or delete information for a specific week
@api.route('/subjects/<int:subject_id>/weeks/<int:week_number>', methods=['GET', 'PUT', 'DELETE'])
def subject_week_by_number(subject_id, week_number):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    subject = Subject.query.get_or_404(subject_id)

    lectures = Lecture.query.filter_by(subject_id=subject_id, week_number=week_number).all()

    if request.method == 'GET':
        if not lectures:
            return jsonify({'message': 'No content found for this week.'}), 404

        return jsonify({
            'week_number': week_number,
            'subject_id': subject_id,
            'lectures': [
                {'id': lecture.id, 'title': lecture.title, 'video_url': lecture.video_url}
                for lecture in lectures
            ]
        }), 200

    elif request.method == 'PUT':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can update this week.'}), 403

        data = request.get_json()
        if not data or 'week_number' not in data:
            return jsonify({'message': 'Invalid input. Week number is required.'}), 400

        for lecture in lectures:
            lecture.week_number = data['week_number']
        db.session.commit()

        return jsonify({'message': f'Week {week_number} updated to Week {data["week_number"]}'}), 200

    elif request.method == 'DELETE':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can delete this week.'}), 403

        for lecture in lectures:
            db.session.delete(lecture)
        db.session.commit()

        return jsonify({'message': f'Week {week_number} deleted successfully'}), 204


# View all lectures for a specific week or add a new lecture
@api.route('/subjects/<int:subject_id>/weeks/<int:week_number>/lectures', methods=['GET', 'POST'])
def week_lectures(subject_id, week_number):

    """Handles retrieving all lectures for a specific week and adding new lectures (for instructors only)."""
    user_id = verify_token()  # Extract user ID from JWT token
    user = User.query.get_or_404(user_id)

    # Ensure the subject exists
    subject = Subject.query.get_or_404(subject_id)

    if request.method == 'GET':
        # Fetch all lectures for the given week
        lectures = Lecture.query.filter_by(subject_id=subject_id, week_number=week_number).all()

        return jsonify({
            'lectures': [
                {
                    'id': lecture.id,
                    'title': lecture.title,
                    'video_url': lecture.video_url,
                    'description': lecture.description
                }
                for lecture in lectures
            ]
        }), 200

    elif request.method == 'POST':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can add lectures.'}), 403

        data = request.get_json()
        if not data or 'title' not in data or 'video_url' not in data:
            return jsonify({'message': 'Invalid input. Title and video_url are required.'}), 400

        new_lecture = Lecture(
            subject_id=subject_id,
            week_number=week_number,
            title=data['title'],
            video_url=data['video_url'],
            description=data.get('description')
        )
        db.session.add(new_lecture)
        db.session.commit()

        if 'lecture_questions' in data:
            for question_group in data['lecture_questions']:
                timestamp = question_group['timestamp_seconds']

                for question_data in question_group['questions']:
                    question = Lecture_Question(
                        lecture_id=new_lecture.id,
                        timestamp_seconds=timestamp,
                        question_text=question_data['question_text'],
                        option_a=question_data['options']['A'],
                        option_b=question_data['options']['B'],
                        option_c=question_data['options']['C'],
                        option_d=question_data['options']['D'],
                        correct_option=question_data['correct_option']
                    )
                    db.session.add(question)

            db.session.commit()

        return jsonify({
            'id': new_lecture.id,
            'title': new_lecture.title,
            'video_url': new_lecture.video_url,
            'description': new_lecture.description
        }), 201


# view,update or delete a specific lecture
@api.route('/subjects/<int:subject_id>/weeks/<int:week_number>/lectures/<int:lecture_id>',
           methods=['GET', 'PUT', 'DELETE'])
def specific_lecture(subject_id, week_number, lecture_id):
    """Handles retrieving, updating, and deleting a specific lecture within a week."""
    user_id = verify_token()  # Extract user ID from JWT token
    user = User.query.get_or_404(user_id)

    # Ensure the subject exists
    subject = Subject.query.get_or_404(subject_id)

    # Fetch the lecture
    lecture = Lecture.query.filter_by(id=lecture_id, subject_id=subject_id, week_number=week_number).first_or_404()

    if request.method == 'GET':
        # Retrieve all MCQ questions associated with this lecture
        questions = Lecture_Question.query.filter_by(lecture_id=lecture_id).all()

        return jsonify({
            'id': lecture.id,
            'title': lecture.title,
            'video_url': lecture.video_url,
            'description': lecture.description,
            'questions': [
                {
                    'id': question.id,
                    'timestamp_seconds': question.timestamp_seconds,
                    'question_text': question.question_text,
                    'options': {
                        'A': question.option_a,
                        'B': question.option_b,
                        'C': question.option_c,
                        'D': question.option_d
                    },
                    'correct_option': question.correct_option
                }
                for question in questions
            ]
        }), 200

    elif request.method == 'PUT':
        # Only the instructor of the subject can update the lecture
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can update this lecture.'}), 403

        data = request.get_json()
        if not data or 'title' not in data or 'video_url' not in data:
            return jsonify({'message': 'Invalid input. Title and video_url are required.'}), 400

        lecture.title = data['title']
        lecture.video_url = data['video_url']
        lecture.description = data.get('description', lecture.description)
        db.session.commit()

        return jsonify({
            'message': 'Lecture updated successfully',
            'id': lecture.id,
            'title': lecture.title,
            'video_url': lecture.video_url,
            'description': lecture.description
        }), 200

    elif request.method == 'DELETE':
        # Only the instructor of the subject can delete the lecture
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can delete this lecture.'}), 403

        # Delete lecture and associated questions
        Lecture_Question.query.filter_by(lecture_id=lecture.id).delete()
        db.session.delete(lecture)
        db.session.commit()

        return jsonify({'message': 'Lecture deleted successfully'}), 204


# Fetch lecture MCQS dynamically
@api.route('/lectures/<int:lecture_id>/questions', methods=['GET'])
def get_questions_at_timestamp(lecture_id):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    lecture = Lecture.query.get_or_404(lecture_id)

    timestamp = request.args.get('timestamp', type=int)
    if timestamp is None:
        return jsonify({'message': 'Timestamp parameter is required'}), 400

    questions = Lecture_Question.query.filter_by(lecture_id=lecture_id, timestamp_seconds=timestamp).all()

    if not questions:
        return jsonify({'message': 'No questions found for this timestamp'}), 404

    return jsonify({
        'lecture_id': lecture.id,
        'timestamp_seconds': timestamp,
        'questions': [
            {
                'id': question.id,
                'question_text': question.question_text,
                'options': {
                    'A': question.option_a,
                    'B': question.option_b,
                    'C': question.option_c,
                    'D': question.option_d
                },
                'correct_option': question.correct_option
            }
            for question in questions
        ]
    }), 200


# view all assignments or add new one
@api.route('/subjects/<int:subject_id>/weeks/<int:week_number>/assignments', methods=['GET', 'POST'])
def week_assignments(subject_id, week_number):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)
    print("inside assignment and token")

    subject = Subject.query.get_or_404(subject_id)
    print(subject)

    if request.method == 'GET':
        # Fetch the first assignment for the given subject and week number
        assignment = Assignment.query.filter_by(subject_id=subject_id, week_number=week_number).first()

        # Check if an assignment exists
        if not assignment:
            return jsonify({'message': 'No assignment found for the given subject and week.'}), 404

        # Get MCQ questions related to the first assignment
        mcq_questions = Graded_Assignment.query.filter_by(assignment_id=assignment.id).all()

        # Prepare the questions list
        questions = [
            {
                'id': question.id,
                'question_text': question.question_text,
                'hint': question.hint,
                'option_a': question.option_a,
                'option_b': question.option_b,
                'option_c': question.option_c,
                'option_d': question.option_d,
                'correct_option': question.correct_option
            }
            for question in mcq_questions
        ]

        # Return the first assignment details along with questions
        return jsonify({
            'assignment': {'id': assignment.id,
                'title': assignment.title,
                'description': assignment.description,
                'due_date': assignment.due_date.isoformat(),
                'total_marks': assignment.total_marks,
                'assignment_type': assignment.assignment_type,
                'questions': questions  # Include the questions from the first assignment
            }
        }), 200

    elif request.method == 'POST':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can add assignments.'}), 403

        data = request.get_json()
        if not data or 'title' not in data or 'description' not in data or 'due_date' not in data or 'total_marks' not in data or 'assignment_type' not in data:
            return jsonify({'message': 'Invalid input. All required fields must be provided.'}), 400

        if data['assignment_type'] not in ['MCQ', 'Programming']:
            return jsonify({'message': 'Invalid assignment type. Must be "MCQ" or "Programming".'}), 400

        new_assignment = Assignment(
            subject_id=subject_id,
            week_number=week_number,
            title=data['title'],
            description=data['description'],
            due_date=datetime.fromisoformat(data['due_date']),
            total_marks=data['total_marks'],
            assignment_type=data['assignment_type']
        )
        db.session.add(new_assignment)
        db.session.commit()

        return jsonify({
            'id': new_assignment.id,
            'title': new_assignment.title,
            'description': new_assignment.description,
            'due_date': new_assignment.due_date.isoformat(),
            'total_marks': new_assignment.total_marks,
            'assignment_type': new_assignment.assignment_type
        }), 201


# View, update or delete a specific assignment
@api.route('/subjects/<int:subject_id>/weeks/<int:week_number>/assignments/<int:assignment_id>',
           methods=['GET', 'PUT', 'DELETE'])
def specific_assignment(subject_id, week_number, assignment_id):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    subject = Subject.query.get_or_404(subject_id)

    assignment = Assignment.query.filter_by(id=assignment_id, subject_id=subject_id,
                                            week_number=week_number).first_or_404()

    if request.method == 'GET':
        return jsonify({
            'id': assignment.id,
            'title': assignment.title,
            'description': assignment.description,
            'due_date': assignment.due_date.isoformat(),
            'total_marks': assignment.total_marks,
            'assignment_type': assignment.assignment_type
        }), 200

    elif request.method == 'PUT':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can update this assignment.'}), 403

        data = request.get_json()
        if not data:
            return jsonify({'message': 'Invalid input. No data provided.'}), 400

        assignment.title = data.get('title', assignment.title)
        assignment.description = data.get('description', assignment.description)
        assignment.due_date = datetime.fromisoformat(data['due_date']) if 'due_date' in data else assignment.due_date
        assignment.total_marks = data.get('total_marks', assignment.total_marks)
        assignment.assignment_type = data.get('assignment_type', assignment.assignment_type)

        db.session.commit()

        return jsonify({
            'message': 'Assignment updated successfully',
            'id': assignment.id,
            'title': assignment.title,
            'description': assignment.description,
            'due_date': assignment.due_date.isoformat(),
            'total_marks': assignment.total_marks,
            'assignment_type': assignment.assignment_type
        }), 200

    elif request.method == 'DELETE':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can delete this assignment.'}), 403

        db.session.delete(assignment)
        db.session.commit()

        return jsonify({'message': 'Assignment deleted successfully'}), 204


# Edit or delete a specific question
@api.route(
    '/subjects/<int:subject_id>/weeks/<int:week_number>/assignments/<int:assignment_id>/questions/<int:question_id>',
    methods=['PUT', 'DELETE'])
def manage_assignment_question(subject_id, week_number, assignment_id, question_id):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    subject = Subject.query.get_or_404(subject_id)
    assignment = Assignment.query.filter_by(id=assignment_id, subject_id=subject_id,
                                            week_number=week_number).first_or_404()

    if assignment.assignment_type == "MCQ":
        question = Graded_Assignment.query.filter_by(id=question_id, assignment_id=assignment_id).first_or_404()
    else:
        question = Programming_Assignment.query.filter_by(id=question_id, assignment_id=assignment_id).first_or_404()

    if request.method == 'PUT':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can update this question.'}), 403

        data = request.get_json()
        if not data:
            return jsonify({'message': 'Invalid input. No data provided.'}), 400

        question.question_text = data.get('question_text', question.question_text)
        question.hint = data.get('hint', question.hint)

        if assignment.assignment_type == "MCQ":
            if 'options' in data:
                question.option_a = data['options'].get('A', question.option_a)
                question.option_b = data['options'].get('B', question.option_b)
                question.option_c = data['options'].get('C', question.option_c)
                question.option_d = data['options'].get('D', question.option_d)
            question.correct_option = data.get('correct_option', question.correct_option)

        db.session.commit()

        return jsonify({'message': 'Question updated successfully'}), 200

    elif request.method == 'DELETE':
        if user.role != "instructor" or user.id != subject.instructor_id:
            return jsonify({'message': 'Permission denied. Only the instructor can delete this question.'}), 403

        db.session.delete(question)
        db.session.commit()

        return jsonify({'message': 'Question deleted successfully'}), 204


# function to execute the programming questions
def execute_code(user_code, input_data):
    try:
        full_code = f"""
def user_function(n):
{user_code}

print(user_function({input_data}))
"""

        # Run the code in a secure sandboxed environment
        result = subprocess.run(
            ["python3", "-c", full_code],  # Execute the Python script
            capture_output=True, text=True, timeout=5  # Timeout after 5 seconds
        )

        # If execution fails, return an error message
        if result.returncode != 0:
            return "Error"

        return result.stdout.strip()  # Return the function output

    except subprocess.TimeoutExpired:
        return "Timeout"
    except Exception as e:
        return "Error"


@api.route('/assignments/<int:assignment_id>/submit', methods=['POST'])
def submit_assignment(assignment_id):
    user_id = verify_token()
    user = User.query.get_or_404(user_id)

    assignment = Assignment.query.get_or_404(assignment_id)

    data = request.get_json()
    if not data:
        return jsonify({'message': 'Invalid input. No data provided.'}), 400

    if assignment.assignment_type == "MCQ":
        # Validate MCQ submission
        if 'answers' not in data or not isinstance(data['answers'], dict):
            return jsonify({'message': 'Invalid input. MCQ submission requires an "answers" dictionary.'}), 400

        # Fetch all questions for this assignment
        questions = Graded_Assignment.query.filter_by(assignment_id=assignment_id).all()
        correct_answers = {q.id: q.correct_option for q in questions}

        # Evaluate the student's answers
        total_correct = sum(1 for q_id, answer in data['answers'].items() if correct_answers.get(q_id) == answer)
        score = (total_correct / len(correct_answers)) * assignment.total_marks

    elif assignment.assignment_type == "Programming":
        # Validate programming submission
        if 'code' not in data:
            return jsonify({'message': 'Invalid input. Programming assignment requires "code".'}), 400

        # Fetch test cases for grading
        test_cases = TestCase.query.filter_by(assignment_id=assignment_id).all()
        if not test_cases:
            return jsonify({'message': 'No test cases found for this assignment. Manual evaluation required.'}), 400

        # Execute code against test cases
        passed_cases = 0
        for test_case in test_cases:
            expected_output = test_case.expected_output
            actual_output = execute_code(data['code'], test_case.input_data)
            if actual_output == expected_output:
                passed_cases += 1

        score = (passed_cases / len(test_cases)) * assignment.total_marks

    else:
        return jsonify({'message': 'Invalid assignment type'}), 400

    # Store submission record
    submission = UserAssignment(user_id=user_id, assignment_id=assignment_id, score=score, submission_data=data)
    db.session.add(submission)
    db.session.commit()

    return jsonify({
        'message': f'{assignment.assignment_type} assignment submitted successfully',
        'score': score,
        'total_marks': assignment.total_marks
    }), 201


# API endpoint for chatbot query
@app.route('/query', methods=['POST'])
async def query():
    data = request.get_json()
    session_id = data.get('session_id', 'default')
    user_query = data.get('query')
    if not user_query:
        return jsonify({"error": "No query provided"}), 400
    db_session = DBSession()

    # Retrieve conversation history for the session, ordered by timestamp
    conversation_history = db_session.query(Conversation).filter(
        Conversation.session_id == session_id
    ).order_by(Conversation.timestamp.asc()).all()

    # Build a string that represents the conversation history.
    history_text = ""
    for entry in conversation_history:
        history_text += f"User: {entry.user_query}\nAssistant: {entry.agent_response}\n"

    # Retrieve relevant documents from FAISS for the current query.
    retrieved_docs = search_documents(user_query, faiss_index, metadata_docs, k=3)
    context_text = "\n".join(
        [f"Document ID: {doc['id']}, Content: {doc['content']}" for doc in retrieved_docs]
    )

    # Build the complete prompt including conversation history and context.
    prompt = (
        "You are an AI academic guide. Your role is to nudge students toward learning strategies "
        "and suggest resources without providing direct answers to assignments.\n"
        f"Conversation History:\n{history_text}\n"
        f"Context:\n{context_text}\n"
        f"Student Query: {user_query}\n"
        "Please provide a thoughtful, helpful response."
    )
    agent_response = await call_gemini_api(prompt)

    conversation_log = Conversation(
        session_id=session_id,
        user_query=user_query,
        agent_response=agent_response
    )
    db_session.add(conversation_log)
    db_session.commit()
    db_session.close()

    return jsonify({"response": agent_response})


app.register_blueprint(auth)
app.register_blueprint(api)
@app.get('/')
def home():
    return render_template("index.html")

if __name__=="__main__":
    app.run(debug=True,port=5001)



