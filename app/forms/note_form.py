from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField, BooleanField, DateTimeField
from wtforms.validators import DataRequired
from datetime import datetime
from app.models import Note

class NoteForm(FlaskForm):
    name = StringField('name', default='Untitled', validators=[DataRequired()])
    content = TextAreaField('content')
    public = BooleanField('public', default=False)
