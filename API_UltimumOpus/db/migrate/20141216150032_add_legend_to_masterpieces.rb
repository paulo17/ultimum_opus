class AddLegendToMasterpieces < ActiveRecord::Migration
  def change
    add_column :masterpieces, :legend, :string
  end
end
