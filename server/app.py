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

        response_dict_list = [n.to_dict() for n in Pet.query.all()]

        response = make_response(
            response_dict_list,
            200,
        )

        return response
    
    
api.add_resource(Users, '/users')
api.add_resource(Pets, '/pets')

if __name__ == '__main__':
    app.run(port=5555, debug=True)

