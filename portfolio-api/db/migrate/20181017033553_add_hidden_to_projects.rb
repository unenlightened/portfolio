class AddHiddenToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :hidden, :boolean, :default => 0
  end
end