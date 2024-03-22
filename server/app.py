#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, session
from flask_restful import Api, Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Pet, Donation
from dotenv import load_dotenv
import os

# Views go here!
load_dotenv()
app.secret_key = os.urandom(24)

DATABASE_URI = os.getenv('DATABASE_URI')
app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URI

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Signup(Resource):
    def post(self):
        body = request.get_json()

        if User.query.filter_by(username=body['username']).first():
            return {"errors": "Username already exists"}, 400

        try:
            new_user = User(
                name=body['name'],
                username=body['username'],
                _password_hash=''
            ) 
            
            new_user.password_hash = body['password']
            db.session.add(new_user)
            db.session.commit()

            session['user_id'] = new_user.id

            return make_response(new_user.to_dict(), 201)
        
        except Exception as e:
            db.session.rollback()
            return {"errors": "Unable to create account."}, 400
        
class Login(Resource):
    def post(self):
        data = request.get_json()

        username = data.get("username")
        password = data.get("password")

        user = User.query.filter(User.username == username).first()
        if user:
            if user.authenticate(password):
                session['user_id'] = user.id
                return make_response( {
                    "id": user.id,
                    "name": user.name,
                    "username": user.username,
                }, 200)
            else:
                return {"errors": "Invalid password"}, 401
        else:
            return {"errors": "Invalid username or password"}, 401

class Logout(Resource):
    def delete(self):
        try:
            session['user_id'] = None
            return ({}, 204)
        except:
            return {"errors": "No user currently logged in"}, 401

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
api.add_resource(Login, '/login')
api.add_resource(Logout, '/logout')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

