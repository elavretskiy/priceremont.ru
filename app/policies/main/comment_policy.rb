class Main::CommentPolicy < Main::ApplicationPolicy
  def index?
    false
  end

  def show?
    index?
  end

  def new?
    index?
  end

  def edit?
    index?
  end

  def create?
    true
  end

  def update?
    index?
  end

  def destroy?
    index?
  end

  def permitted_attributes
    [:text, :commentable_id, :commentable_type]
  end

  class Scope < Scope
    def resolve
      @user.comments
    end
  end
end
