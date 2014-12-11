class CreateMasterpieces < ActiveRecord::Migration
  def change
    create_table :masterpieces do |t|
      t.string :titre
      t.string :lieu
      t.string :auteur
      t.string :date
      t.string :courant
      t.string :son
      t.string :image
      t.string :localisation

      t.timestamps
    end
  end
end
