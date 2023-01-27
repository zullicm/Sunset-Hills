class Reservation < ApplicationRecord
  belongs_to :instructor
  belongs_to :course
  belongs_to :user

  validates :cost, presence: true
  validates :time, presence: { message: "& Date Must be filled" }
  validates :user_id, presence: true
  validate :player_num_present

  def player_num_present
    errors.add(:base, "Fill in number of players") if player_num.blank?
  end

end
