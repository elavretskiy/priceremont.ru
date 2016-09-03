class CreateArticles < ActiveRecord::Migration
  def change
    create_table :articles do |t|
      t.string :title, null: false, unique: true
      t.text :text, null: false, unique: true
      t.belongs_to :user

      t.timestamps null: false
    end

    add_index :articles, :text
    add_index :articles, :title
  end
end
