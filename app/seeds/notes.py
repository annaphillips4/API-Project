from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    notes = [
        Note(name="Homemade Pizza Dough", content="Sample content for homemade pizza dough", public=False, user_id=1, notebook_id=1),
        Note(name="Baked Salmon with Lemon and Dill", content="Sample content for baked salmon", public=False, user_id=1, notebook_id=1),
        Note(name="Guacamole - The Perfect Dip", content="Sample content for guac is the perf dip", public=False, user_id=1, notebook_id=1),
        Note(name="Inspiring Quotes for Daily Motivation", content='"The only way to do great work is to love what you do." - Steve Jobs', public=False, user_id=1, notebook_id=2),
        Note(name="Empowering Words for Success", content='"The future belongs to those who believe in the beauty of their dreams." - Eleanor Roosevelt', public=False, user_id=1, notebook_id=2),
        Note(name="Quotes to Ignite Creativity", content='"Every artist was first an amateur." - Ralph Waldo Emerson', public=False, user_id=1, notebook_id=2),
        Note(name="Words of Encouragement in Difficult Times", content='"Hardships often prepare ordinary people for an extraordinary destiny." - C.S. Lewis', public=False, user_id=1, notebook_id=2)
    ]

    db.session.add_all(notes)
    db.session.commit()

def undo_notes():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notes"))

    db.session.commit()
