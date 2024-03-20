#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response
from flask_restful import Api, Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Pet, Donation
import os

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        body = request.get_json()

        if User.query.filter_by(username=body['username']).first():
            return make_response({"message", "Username already exists"}, 400)

        try:
            new_user = User(
                name=body['name'],
                username=body['username'],
                _password_hash=''
            ) 
            
            new_user.password_hash = body['password']
            db.session.add(new_user)
            db.session.commit()
            return make_response(new_user.to_dict(), 201)
        
        except Exception as e:
            db.session.rollback()
            return make_response({"message", "Unable to create account."}, 400)

class Users(Resource):
    def get(self):
        response_dict_list = [n.to_dict() for n in User.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
class Pets(Resource):
    def get(self):
        try:

            all_pets = [pet.to_dict() for pet in Pet.query.all()]

            return make_response(all_pets, 200)
        
        except Exception:
            return make_response({"message": "Unable to fetch pets."}, 404)    
        
    def post(self):
        try:
            body = request.get_json()
            new_pet = Pet(**body)
            db.session.add(new_pet)
            db.session.commit()
            return make_response(new_pet.to_dict(), 201)
        
        except Exception:
            db.session.rollback()
            return make_response({"message": "Unable to create pet."}, 400)

class PetById(Resource):
    def get(self, id):
        try:
            target = db.session.get(Pet, id)
            return make_response(target.to_dict(), 200)
        
        except Exception:
            return make_response({}, 404)
    
    def delete(self, id):
        try:
            target = db.session.get(Pet, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception:
            db.session.rollback()
            return make_response({"message": "Unable to delete listing."}, 400)

class Donations(Resource):
    def get(self):
        try:

            all_donations = [donation.to_dict() for donation in Donation.query.all()]

            return make_response(all_donations, 200)
        
        except Exception:
            return make_response({"message": "Unable to fetch pets."}, 404)    
        
    def post(self):
        try:
            body = request.get_json()
            new_donation = Donation(**body)
            db.session.add(new_donation)
            db.session.commit()
            return make_response(new_donation.to_dict(), 201)
        
        except Exception:
            db.session.rollback()
            return make_response({"message": "Unable to create donation."}, 400)

class DonationById(Resource):
    def get(self, id):
        try:
            target = db.session.get(Donation, id)
            return make_response(target.to_dict(), 200)
        
        except Exception:
            return make_response({}, 404)
    
    def delete(self, id):
        try:
            target = db.session.get(Donation, id)
            db.session.delete(target)
            db.session.commit()
            return make_response({}, 204)
        
        except Exception:
            db.session.rollback()
            return make_response({"message": "Unable to delete donation."}, 400)
    
api.add_resource(Users, '/users')
api.add_resource(Pets, '/pets')
api.add_resource(PetById, '/petbyid/<int:id>')
api.add_resource(Donations, '/donations')
api.add_resource(DonationById, '/donationbyid/<int:id>')
api.add_resource(Signup, '/signup')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

