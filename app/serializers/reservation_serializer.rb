class ReservationSerializer < ActiveModel::Serializer
  attributes :id, :golf, :player_num, :time, :about, :instructor_id, :user_id, :course_id

  has_one :user
  has_one :course
  has_one :instructor
end