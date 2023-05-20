from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from app.models import Notebook

class NotebookForm(FlaskForm):
    name = StringField('name')
    color = StringField('color')
    description = TextAreaField('description')
