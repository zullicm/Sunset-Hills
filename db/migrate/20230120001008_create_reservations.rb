class CreateReservations < ActiveRecord::Migration[7.0]
  def change
    create_table :reservations do |t|
      t.string :type
      t.integer :player_num
      t.datetime :time
      t.belongs_to :course, null: false, foreign_key: true
      t.belongs_to :instructor, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
