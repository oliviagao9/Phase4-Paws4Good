#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from config import db
from models import User, Pet, Donation

if __name__ == '__main__':
    with app.app_context():
        User.query.delete()
        Pet.query.delete()
        Donation.query.delete()

        u1 = User (name = "Tom", username = "Tom2006", _password_hash = "")
        u1.password_hash = "abcd"
        u2 = User (name = "Danny", username = "Dany2006", _password_hash = "")
        u2.password_hash = "abcd"
        db.session.add_all([u1, u2])
        db.session.commit()

        p1 = Pet (name = 'Lucky', age = 6, image = 'https://www.howitworksdaily.com/wp-content/uploads/2015/08/131216Cute-dog-sticking-out-his-tongue-wallpaper-200x200.jpg', cause = 'Stage 1 kidney disease', goal = 2500, owner_id = 1)
        p2 = Pet (name= 'Happy', age = 3, image = 'https://www.seasidehillcrest.com/wp-content/uploads/elementor/thumbs/french-bulldog-summer-smile-joy-160846-pbs68iyk9uiydonz1hxrat0x8jebwy91monj9icb80.jpeg', cause = 'Stage 2 lung cancer', goal = 1400, owner_id = 2)
        db.session.add_all([p1, p2])
        db.session.commit()

        d1 = Donation (amount = 50, pet_id = 1, donor_id = 2)
        d2 = Donation (amount = 150, pet_id = 2, donor_id = 1)
        db.session.add_all([d1, d2])
        db.session.commit()
        print('seed data completed')

