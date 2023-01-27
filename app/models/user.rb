class User < ApplicationRecord
  has_secure_password
  has_many :reservations
  has_many :courses ,through: :reservations
  has_many :instructors ,through: :reservations

  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP } 
  validates :full_name, presence: true

end
