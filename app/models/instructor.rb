class Instructor < ApplicationRecord
  has_many :reservations
  has_many :users ,through: :reservations
  has_many :courses ,through: :reservations
end
