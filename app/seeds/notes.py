from app.models import db, Note, environment, SCHEMA
from sqlalchemy.sql import text

def seed_notes():
    notes = [
        Note(name="Homemade Pizza Dough", content="<h3>Ingredients</h3><ul><li>2-2 ⅓ cups   all-purpose flour OR bread flour¹ divided (250-295g)</li><li>1 packet   instant yeast² (2 ¼ teaspoon)</li><li>1 ½ teaspoons   sugar</li><li>¾ teaspoon   salt</li><li>⅛-¼ teaspoon   garlic powder and/or dried basil leaves optional</li><li>2 Tablespoons   olive oil + additional </li><li>¾ cup    warm water³ (175ml)</li></ul><h3>Instructions</h3><ul><li>Combine 1 cup (125g) of flour, instant yeast, sugar, and salt in a large bowl. If desired, add garlic powder and dried basil at this point as well.</li><li>Add olive oil and warm water and use a wooden spoon to stir well very well.</li><li>Gradually add another 1 cup (125g) of flour. Add any additional flour as needed (I've found that sometimes I need as much as an additional ⅓ cup), stirring until the dough is forming into a cohesive, elastic ball and is beginning to pull away from the sides of the bowl (see video above recipe for visual cue). The dough will still be slightly sticky but still should be manageable with your hands.</li><li>Drizzle a separate, large, clean bowl generously with olive oil and use a pastry brush to brush up the sides of the bowl.</li><li>Lightly dust your hands with flour and form your pizza dough into a round ball and transfer to your olive oil-brushed bowl. Use your hands to roll the pizza dough along the inside of the bowl until it is coated in olive oil, then cover the bowl tightly with plastic wrap and place it in a warm place.</li><li>Allow dough to rise for 30 minutes or until doubled in size. If you intend to bake this dough into a pizza, I also recommend preheating your oven to 425F (215C) at this point so that it will have reached temperature once your pizza is ready to bake.</li><li>Once the dough has risen, use your hands to gently deflate it and transfer to a lightly floured surface and knead briefly until smooth (about 3-5 times).&nbsp;</li><li>Use either your hands or a rolling pin to work the dough into 12 inch circle.</li><li>Transfer dough to a parchment paper lined pizza pan and either pinch the edges or fold them over to form a crust.</li><li>Drizzle additional olive oil (about a Tablespoon) over the top of the pizza and use your pastry brush to brush the entire surface of the pizza (including the crust) with olive oil.&nbsp;</li><li>Use a fork to poke holes all over the center of the pizza to keep the dough from bubbling up in the oven.</li><li>Add desired toppings (see the notes for a link to my favorite, 5-minute pizza sauce recipe!) and bake in a 425F (215C) preheated oven for 13-15 minutes or until toppings are golden brown. Slice and serve.</li></ul>", public=False, user_id=1, notebook_id=1),
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
