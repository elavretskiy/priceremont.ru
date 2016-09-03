class Main::ArticlePolicy < Main::ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def new?
    create?
  end

  def edit?
    update?
  end

  def create?
    false
  end

  def update?
    true
  end

  def destroy?
    create?
  end

  def permitted_attributes
    [comment: [:text]]
  end

  class Scope < Scope
    def resolve
      Article.is_published
    end
  end
end
