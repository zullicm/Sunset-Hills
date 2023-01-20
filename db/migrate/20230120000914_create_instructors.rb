class CreateInstructors < ActiveRecord::Migration[7.0]
  def change
    create_table :instructors do |t|
      t.string :name
      t.string :about
      t.string :difficulty
      t.integer :price
      t.string :image_1
      t.string :image_2

      t.timestamps
    end
  end
end