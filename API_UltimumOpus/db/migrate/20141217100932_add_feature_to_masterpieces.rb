class AddFeatureToMasterpieces < ActiveRecord::Migration
  def change
    add_column :masterpieces, :feature, :string
  end
end
