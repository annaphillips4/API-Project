from .db import db, environment, SCHEMA, add_prefix_for_prod
from flask_login import UserMixin

class User_Note(db.Model, UserMixin):
    __tablename__= 'user_note'

    if environment == 'production':
        __table_args__= {'schema':SCHEMA}

    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id'), ondelete="CASCADE"), primary_key=True)
    note_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('notes.id'), ondelete="CASCADE"), primary_key=True)
    edit_priv = db.Column(db.Boolean, default=False)

    user = db.relationship('User', back_populates='user_note')
    note = db.relationship('Note', back_populates='user_note')

    def to_dict(self):
        return {
            'userId': self.user_id,
            'noteId': self.note_id,
            'editPriv': self.edit_priv
        }
