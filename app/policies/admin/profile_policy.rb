class Admin::ProfilePolicy < Admin::ApplicationPolicy
  def index?
    false
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
    index?
  end

  def update?
    show?
  end

  def destroy?
    index?
  end

  def permitted_attributes
    params = [:password, :password_confirmation, :current_password, :id]
    @user.admin? ? params : params - [:id]
  end

  class Scope < Scope
    def resolve
      Profile.by_ids(@user.id).limit(1)
    end
  end
end
