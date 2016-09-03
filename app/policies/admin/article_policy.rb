class Admin::ArticlePolicy < Admin::ApplicationPolicy
  def index?
    true
  end

  def show?
    @user.admin? || @user.articles.include?(@record)
  end

  def new?
    create?
  end

  def edit?
    update?
  end

  def create?
    index?
  end

  def update?
    show?
  end

  def destroy?
    show?
  end

  def permitted_attributes
    base_params = [:title, :text, :created_at, :is_published, :all_tags]
    @user.admin? ? [:user_id] + base_params : base_params
  end

  class Scope < Scope
    def resolve
      @user.admin? ? Article.all : @user.articles
    end
  end
end
