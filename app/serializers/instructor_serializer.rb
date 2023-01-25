class InstructorSerializer < ActiveModel::Serializer
  attributes :id, :name, :difficulty, :image_1, :image_2, :about, :price

  has_many :reservations

end