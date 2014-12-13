class CreateMasterpieces < ActiveRecord::Migration
  def change
    create_table :masterpieces do |t|
      t.string :titre
      t.string :date
      t.text :text
      t.string :image
      t.string :video

      t.timestamps
    end
  end
end
