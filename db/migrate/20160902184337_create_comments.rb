class CreateComments < ActiveRecord::Migration
  def self.up
    create_table :comments do |t|
      t.text :text, null: false
      t.references :commentable, polymorphic: true
      t.references :user
      t.string :role, default: 'comments'
      t.timestamps
    end

    add_index :comments, :commentable_type
    add_index :comments, :commentable_id
    add_index :comments, :user_id
    add_index :comments, :text
  end

  def self.down
    drop_table :comments
  end
end
