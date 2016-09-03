class AddIsPublishedToArticles < ActiveRecord::Migration
  def change
    add_column :articles, :is_published, :boolean, default: true
    add_index :articles, :is_published
  end
end
