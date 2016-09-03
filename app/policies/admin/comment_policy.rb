class Admin::CommentPolicy < Admin::ApplicationPolicy
  def index?
    true
  end

  def show?
    @user.admin? || @user.comments.include?(@record)
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
    created_at = @record.try(:created_at)
    @user.admin? || (show? && created_at && (Time.current - 15.minutes) < created_at)
  end

  def destroy?
    update?
  end

  def permitted_attributes
    @user.admin? ? [:user_id, :text] : [:text]
  end

  class Scope < Scope
    def resolve
      @user.admin? ? Comment.all : @user.comments
    end
  end
end
