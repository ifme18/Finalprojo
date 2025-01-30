# Standard library imports
from random import choice as rc

# Remote library imports
from faker import Faker
from flask_cors import CORS

# Local imports
from app import app
from models import db, Community, User, Event, Estate, Notification

if __name__ == '__main__':
    fake = Faker()
    CORS(app)
    with app.app_context():
        print("Starting seed...")

        
        db.session.query(Community).delete()
        db.session.query(User).delete()
        db.session.query(Event).delete()
        db.session.query(Estate).delete()
        db.session.query(Notification).delete()
        db.session.commit()

        
        communities = [
            Community(name="kimbo", location="123 Main St"),
            Community(name="Ruru ndani", location="456 Oak Ave"),
            Community(name="Pale Ngong", location="789 kisumu"),
            Community(name="Kiambu Road", location="101 kiambu"),
            Community(name="Njivanjee", location="202 Meadow Ln")
        ]
        db.session.add_all(communities)

        
        users = [
            User(name="John Doe", email="johndoe@example.com", occupation="Engineer", phoneno=1234567890, houseno=12, community=communities[0]),
            User(name="Mwas", email="mwas@yahoo.com", occupation="Doctor", phoneno=2345678901, houseno=34, community=communities[1]),
            User(name="Alice Gachagua", email="gachagua@gmail.com", occupation="Teacher", phoneno=3456789012, houseno=56, community=communities[2]),
            User(name="IRene K", email="KIMETO@example.com", occupation="Artist", phoneno=4567890123, houseno=78, community=communities[3]),
            User(name="Charlie Putin", email="charlieg@moringa.com", occupation="Chef", phoneno=5678901234, houseno=90, community=communities[4])
        ]
        db.session.add_all(users)

        
        events = [
            Event(eventname="Community Cleanup", eventdate="2024-02-10", community=communities[0]),
            Event(eventname="Annual Meeting", eventdate="2024-03-15", community=communities[1]),
            Event(eventname="Charity Run", eventdate="2024-04-20", community=communities[2]),
            Event(eventname="Food Festival", eventdate="2024-05-25", community=communities[3]),
            Event(eventname="Music Night", eventdate="2024-06-30", community=communities[4])
        ]
        db.session.add_all(events)

       
        estates = [
            Estate(estatename="Mason kahawa", user=users[0], community=communities[0]),
            Estate(estatename="Ichaweri estate", user=users[1], community=communities[1]),
            Estate(estatename="Kasongo estate", user=users[2], community=communities[2]),
            Estate(estatename="Oakwood Heights", user=users[3], community=communities[3]),
            Estate(estatename="Sugoi Springs", user=users[4], community=communities[4])
        ]
        db.session.add_all(estates)

       
        notifications = [
            Notification(name="Meeting Reminder", rsvp="yes", user=users[0], community=communities[0]),
            Notification(name="Event Update", rsvp="no", user=users[1], community=communities[1]),
            Notification(name="Security Alert", rsvp="maybe", user=users[2], community=communities[2]),
            Notification(name="Maintenance Notice", rsvp="yes", user=users[3], community=communities[3]),
            Notification(name="Community jela", rsvp="no", user=users[4], community=communities[4])
        ]
        db.session.add_all(notifications)

        db.session.commit()
        