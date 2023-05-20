from app.models import db, Notebook, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notebooks():
    notebooks = [
        Notebook(name='Recipes', color='#E0E8E9', description="A collection of my favorite dishes, cooking techniques, and culinary experiments. Where I can organize delicious recipes, jot down ingredient measurements, cooking times, and personal notes to create my own personalized cookbook.", user_id=1),
        Notebook(name='Quotes', color='#E6E6FA', description="Inspiring and thought-provoking lines that resonate with me. A treasure trove of wisdom, filled with motivational sayings, memorable passages from books, movies, and speeches that have touched my heart and mind.", user_id=1),
        Notebook(name='Bucket List!', color='#D0ECE7', description="Travel destinations, thrilling adventures, personal goals, and exciting challenges I want to accomplish and check off one by one!", user_id=1),
        Notebook(name='Creative Writing', color='#F5F5F5', description="Where I create captivating stories, poems, and character sketches. It's my personal space to unleash my creativity and capture my literary inspirations.", user_id=1),
        Notebook(name='Personal', color='#E6EE9C', description="Reflection of my life: a diary, a journal, and a sanctuary for my thoughts, reflections, and ideas. This is where I pour my heart out, jot down memories, and keep a record of the things that hold significance to me.", user_id=1),
        Notebook(name='Book Club', color='#F0FFF0', description="Delving into the world of literature with fellow book enthusiasts. A space where we share book recommendations, summaries, and engage in discussions about the books we read. It's like our virtual library where we exchange thoughts and insights with each other.", user_id=1)
    ]

    db.session.add_all(notebooks)
    db.session.commit()

def undo_notebooks():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.notebooks RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM notebooks"))

    db.session.commit()
