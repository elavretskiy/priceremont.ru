class AddRoleToUsers < ActiveRecord::Migration
  def change
    add_column :users, :role, :integer, default: 1, null: false
    add_index :users, :role
  end
end
