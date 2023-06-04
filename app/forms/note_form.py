from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, DateTimeField, IntegerField
from wtforms.validators import DataRequired
from datetime import datetime
from app.models import Note

class NoteForm(FlaskForm):
    name = StringField('name', default='Untitled', validators=[DataRequired()])
    content = TextAreaField('content')
    notebook_id = IntegerField('notebook_id')
    public = BooleanField('public', default=False)
