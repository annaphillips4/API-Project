from flask import Blueprint, jsonify, request
from flask_login import current_user, login_required
from app.models import Notebook, db
from app.forms import NotebookForm
from .auth_routes import validation_errors_to_error_messages

notebook_routes = Blueprint('notebooks', __name__)


@notebook_routes.route('')
@login_required
def notebooks():
    all_notebooks = Notebook.query.filter(Notebook.user_id == current_user.id).all()
    return {notebook.id: notebook.to_dict() for notebook in all_notebooks}

@notebook_routes.route('/', methods=['POST'])
@login_required
def new_notebook():
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        notebook = Notebook(**request.json)
        db.session.add(notebook)
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@notebook_routes.route('/<int:notebook_id>', methods=['PUT'])
@login_required
def edit_notebook(notebook_id):
    form = NotebookForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    notebook = Notebook.query.filter(Notebook.id == notebook_id, Notebook.user_id == current_user.id).first()
    if not notebook:
        return jsonify({'error': f'Notebook with id of {notebook_id} not found'}), 404
    elif form.validate_on_submit():
        notebook.name = form.data['name']
        notebook.color = form.data['color']
        notebook.description = form.data['description']
        db.session.commit()
        return notebook.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@notebook_routes.route('/<int:notebook_id>', methods=['DELETE'])
@login_required
def delete_notebook(notebook_id):
    notebook = Notebook.query.filter(Notebook.id == notebook_id, Notebook.user_id == current_user.id).first()
    if notebook:
        db.session.delete(notebook)
        db.session.commit()
        return jsonify({'message': f'Notebook with id of {notebook_id} deleted successfully.'}), 200
    return jsonify({'error': f'Notebook with id of {notebook_id} not found for user {current_user.username}.'}), 404
