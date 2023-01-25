class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.boolean :golf
      t.integer :player_num
      t.string :time
      t.integer :cost
      t.belongs_to :course, null: false, foreign_key: true
      t.belongs_to :instructor, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
