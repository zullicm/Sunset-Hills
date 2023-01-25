class Reservation < ApplicationRecord
  belongs_to :instructor
  belongs_to :course
  belongs_to :user
end
