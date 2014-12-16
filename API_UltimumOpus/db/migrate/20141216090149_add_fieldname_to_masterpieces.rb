class AddFieldnameToMasterpieces < ActiveRecord::Migration
  def change
    add_column :masterpieces, :image2, :string
    add_column :masterpieces, :image3, :string
  end
end
