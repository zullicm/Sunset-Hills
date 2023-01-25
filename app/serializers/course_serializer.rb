class CourseSerializer < ActiveModel::Serializer
  attributes :id, :name, :difficulty, :image, :about

  has_many :reservations

end