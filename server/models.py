from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import MetaData
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy

from config import db

class User(db.Model, SerializerMixin):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  username = db.Column(db.String)

  pets = db.relationship("Pet", back_populates="user")

class Pet(db.Model, SerializerMixin):
  __tablename__ = "pets"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String)
  cause = db.Column(db.String)
  owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

  user = db.relationship('User', back_populates="pets")
  donations = db.relationship("Donation")

class Donation(db.Model, SerializerMixin):
  __tablename__ = "donations"

  id = db.Column(db.Integer, primary_key=True)
  amount = db.Column(db.Integer)
  pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'))
  donator_id = db.Column(db.Integer, db.ForeignKey('users.id'))

