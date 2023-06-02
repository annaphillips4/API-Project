from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class Notebook(db.Model, UserMixin):
    __tablename__ = 'notebooks'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), default='Untitled', nullable=False)
    color = db.Column(db.String(7))
    description = db.Column(db.Text)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete='CASCADE'), nullable=False)

    user = db.relationship('User', back_populates='notebooks')
    notes = db.relationship('Note', back_populates='notebook', cascade='all, delete')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'color': self.color,
            'description': self.description,
            'userId': self.user_id
        }
