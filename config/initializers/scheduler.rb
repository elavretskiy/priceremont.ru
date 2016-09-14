require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

scheduler.cron '10 0 * * 1' do
  Article.unscoped.where(user_id: nil).destroy_all

  Comment.unscoped.where(user_id: nil).destroy_all
  Comment.unscoped.where(commentable_id: nil).destroy_all

  Tagging.where(article_id: nil).destroy_all
  Tagging.where(tag_id: nil).destroy_all
end
