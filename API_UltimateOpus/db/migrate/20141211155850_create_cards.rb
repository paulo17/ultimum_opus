class CreateCards < ActiveRecord::Migration
  def change
    create_table :cards do |t|
      t.string :caracteristique
      t.string :titre_contenu
      t.text :content
      t.references :masterpiece, index: true

      t.timestamps
    end
  end
end
