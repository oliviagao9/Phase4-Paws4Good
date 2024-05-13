#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, Flask, make_response, session
from flask_restful import Api, Resource

# Local imports
from config import app, db, api

# Add your model imports
from models import User, Pet, Donation, Favorite

# Views go here!

class Auth(Resource):
    def get(self):
        try:
            print('checking session')
            print(session['user_id'])
            user_id = session.get('user_id')
            user = User.query.filter_by(id=user_id).first()
            return make_response({
                'user_id': user.id,
                'name': user.name,
                'username': user.username}, 200)
        except:
            return('Unauthorized', 401)

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

            return make_response({
                'user_id': new_user.id,
                'name': new_user.name,
                'username': new_user.username}, 201)
        
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
                    "user_id": user.id,
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

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)

        return make_response("User not found", 404)

    def patch(self, id):
        user = User.query.filter_by(id=id).first()

        if user:
            try:
                body = request.get_json()

                if User.query.filter_by(username=body['username']).first():
                    return {"errors": "Username already exists"}, 400
                
                for attr in body:
                    if attr == 'password':
                        user.password_hash = body['password']
                    else:
                        setattr(user,attr,body[attr])

                db.session.add(user)
                db.session.commit()
                return make_response({
                    "user_id": user.id,
                    "name": user.name,
                    "username": user.username},202)
            except:
                return make_response({"errors": "Failed to update user"},400)
            
        return make_response({"errors":"User not found"}, 404)
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            try:
                db.session.delete(user)
                db.session.commit()
                session['user_id'] = None
                return make_response({"message":"Successful deleted user"}, 204)
            except:
                return make_response({"errors": "Failed to delete user"},400)
            
        return make_response({"errors": "User not found"}, 404)
        
class Pets(Resource):
    def get(self):
        try:

            all_pets = [pet.to_dict() for pet in Pet.query.all()]

            return make_response(all_pets, 200)
        
        except Exception:
            return make_response({"errors": "Unable to fetch pets."}, 404)    
        
    def post(self):
        try:
            body = request.get_json()
            new_pet = Pet(**body)
            db.session.add(new_pet)
            db.session.commit()
            return make_response(new_pet.to_dict(), 201)
        
        except Exception:
            db.session.rollback()
            return make_response({"errors": "Unable to create pet."}, 400)

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
            return make_response({"errors": "Unable to delete listing."}, 400)

class Donations(Resource):
    def get(self):
        try:

            all_donations = [donation.to_dict() for donation in Donation.query.all()]

            return make_response(all_donations, 200)
        
        except Exception:
            return make_response({"errors": "Unable to fetch pets."}, 404)    
        
    def post(self):
        try:
            body = request.get_json()
            new_donation = Donation(**body)
            db.session.add(new_donation)
            db.session.commit()
            return make_response(new_donation.to_dict(), 201)
        
        except Exception:
            db.session.rollback()
            return make_response({"errors": "Unable to create donation."}, 400)

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
            return make_response({"errors": "Unable to delete donation."}, 400)

class Favorites(Resource):
    def get(self):
        try:

            all_favorites = [favorite.to_dict() for favorite in Favorite.query.all()]

            return make_response(all_favorites, 200)

        except Exception:
            return make_response({"errors": "Unable to fetch favorites."}, 404)

api.add_resource(Users, '/api/users')
api.add_resource(Pets, '/api/pets')
api.add_resource(PetById, '/api/petbyid/<int:id>')
api.add_resource(Donations, '/api/donations')
api.add_resource(DonationById, '/api/donationbyid/<int:id>')
api.add_resource(Signup, '/api/signup')
api.add_resource(Login, '/api/login')
api.add_resource(Logout, '/api/logout')
api.add_resource(Auth, '/api/auth')
api.add_resource(UserByID, "/api/users/<int:id>")
api.add_resource(Favorites, '/api/favorites')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

