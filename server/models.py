from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property

from config import db, bcrypt

class User(db.Model, SerializerMixin):
  __tablename__ = "users"

  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable = False)
  username = db.Column(db.String, nullable = False, unique=True)
  _password_hash  = db.Column(db.String, nullable = False)

  #Relationships
  pets = db.relationship("Pet", back_populates="user", cascade='all, delete-orphan')
  donations = db.relationship("Donation", back_populates="donor", cascade='all, delete-orphan')
  favorites = db.relationship("Favorite", back_populates="user", cascade='all, delete-orphan')

  donated_pets = association_proxy('donations', 'pet')
  favorite_pets = association_proxy('favorites', 'pet')
  #Serialization 
  serialize_rules = ('-pets.user',)
  
  @validates('username')
  def validate_username(self, _, value):
    if not isinstance(value, str) or len(value) < 1 or len(value) > 15:
      raise Exception('Username must be a string')
    return value

  @hybrid_property
  def password_hash(self):
    return self._password_hash

  @password_hash.setter
  def password_hash(self, password):
    password_hash  = bcrypt.generate_password_hash(password).decode('utf-8')
    self._password_hash = password_hash 

  def authenticate(self, password):
      return bcrypt.check_password_hash(self._password_hash, password)
  
  def __repr__(self):
    return f'<User {self.id} | {self.name}>'

class Pet(db.Model, SerializerMixin):
  __tablename__ = "pets"

  serialize_rules = ('-user.pets', '-user._password_hash',)
 
  id = db.Column(db.Integer, primary_key=True)
  name = db.Column(db.String, nullable = False)
  age = db.Column (db.Integer, nullable = False)
  image = db.Column (db.String, nullable = False)
  cause = db.Column(db.String, nullable = False)
  goal = db.Column(db.Integer,
                   db.CheckConstraint('amount > 0'),
                   nullable = False)
  owner_id = db.Column(db.Integer, 
                       db.ForeignKey('users.id'), 
                       nullable = False)

  #Relationships
  user = db.relationship('User', back_populates="pets")
  donations = db.relationship("Donation", back_populates="pet", cascade='all, delete-orphan')
  favorites = db.relationship("Favorite", back_populates="pet", cascade="all, delete-orphan")

  @validates('owner_id')
  def validate_owner_id(self, _, value):
    if not User.query.filter_by(id = value):
      raise Exception('That user does not exist.')
    return value

  def __repr__(self):
    return f'<Pet {self.id} | {self.name}>'
  
class Donation(db.Model, SerializerMixin):
  __tablename__ = "donations"

  serialize_only = ('id', 'amount', 'pet_id', 'donor_id')

  id = db.Column(db.Integer, primary_key=True)
  amount = db.Column(db.Integer, 
                     db.CheckConstraint('amount > 0'),
                     nullable = False)
  pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable = False)
  donor_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

  #Relationships
  pet = db.relationship("Pet", back_populates="donations")
  donor = db.relationship("User", back_populates="donations")

  @validates('pet_id')
  def validate_owner_id(self, _, value):
    if not Pet.query.filter_by(id = value):
      raise Exception('That pet does not exist.')
    return value
  
  @validates('donor_id')
  def validate_owner_id(self, _, value):
    if not User.query.filter_by(id = value):
      raise Exception('That donor does not exist.')
    return value

class Favorite(db.Model, SerializerMixin):
  __tablename__ = "favorites"

  serialize_only = ('id', 'pet_id', 'user_id')

  id = db.Column(db.Integer, primary_key=True)
  pet_id = db.Column(db.Integer, db.ForeignKey('pets.id'), nullable = False)
  user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable = False)

  user = db.relationship("User", back_populates="favorites")
  pet = db.relationship("Pet", back_populates="favorites")
