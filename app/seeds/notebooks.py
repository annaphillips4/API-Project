from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebooks():
    notebooks = [
        Notebook(name='Recipes', color='#E0E8E9', description="A collection of my favorite dishes, cooking techniques, and culinary experiments. Where I can organize delicious recipes, jot down ingredient measurements, cooking times, and personal notes to create my own personalized cookbook.", user_id=1),
        Notebook(name='Improv', color='#E6E6FA', description="Notes from improv class", user_id=1),
        Notebook(name='For Reference', color='#D0ECE7', description="General reference stuff", user_id=1),
        Notebook(name='Quotes', color='#F5F5F5', description="Where I create captivating stories, poems, and character sketches. It's my personal space to unleash my creativity and capture my literary inspirations.", user_id=1)
    ]

    db.session.add_all(notebooks)
    db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
