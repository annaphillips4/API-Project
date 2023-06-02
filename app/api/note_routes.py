from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
import datetime
from app.models import Note, db
from app.forms import NoteForm
from .auth_routes import validation_errors_to_error_messages

note_routes = Blueprint('notes', __name__)

@note_routes.route('')
@login_required
def notes():
    all_notes = Note.query.filter(Note.user_id == current_user.id).all()
    return {note.id: note.to_dict() for note in all_notes}

@note_routes.route('/', methods=['POST'])
@login_required
def new_note():
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        note = Note(**request.json)
        db.session.add(note)
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@note_routes.route('/<int:note_id>', methods=['PUT'])
@login_required
def edit_note(note_id):
    form = NoteForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    note = Note.query.filter(Note.id == note_id, Note.user_id == current_user.id).first()
    if not note:
        return jsonify({'error': f'Note with id of {note_id} not found'}), 404
    elif form.validate_on_submit():
        note.name = form.data['name']
        note.content = form.data['content']
        note.public = form.data['public']
        note.updated_at = datetime.datetime.utcnow()
        db.session.commit()
        return note.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@note_routes.route('/<int:note_id>', methods=['DELETE'])
@login_required
def delete_note(note_id):
    note = Note.query.filter(Note.id == note_id, Note.user_id == current_user.id).first()
    if note:
        db.session.delete(note)
        db.session.commit()
        return jsonify({'message': f'Note with id of {note_id} deleted successfully.'}), 200
    return jsonify({'error': f'Note with id of {note_id} not found for user {current_user.username}.'}), 404
