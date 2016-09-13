require 'rufus-scheduler'

scheduler = Rufus::Scheduler.new

scheduler.cron '10 0 * * 1' do
  Article.where(user_id: nil).destroy_all

  Comment.where(user_id: nil).destroy_all
  Comment.where(commentable_id: nil).destroy_all

  Tagging.where(article_id: nil).destroy_all
  Tagging.where(tag_id: nil).destroy_all
end
