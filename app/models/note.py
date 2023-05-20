from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin
from datetime import datetime

class Note(db.Model, UserMixin):
    __tablename__ = 'notes'

    if environment == 'production':
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False, default='Untitled')
    content = db.Column(db.Text)
    public = db.Column(db.Boolean, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)
    notebook_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notebooks.id'), ondelete='CASCADE'), nullable=False)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    user = db.relationship('User', back_populates='notes')
    notebook = db.relationship('Notebook', back_populates='notes', lazy='joined')
    user_note = db.relationship('User_Note', back_populates='note')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'content': self.content,
            'public': self.public,
            'userId': self.user_id,
            'notebookId': self.notebook_id,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at
        }
