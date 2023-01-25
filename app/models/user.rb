class User < ApplicationRecord
  has_secure_password
  has_many :reservations
  has_many :courses ,through: :reservations
  has_many :instructors ,through: :reservations
end
