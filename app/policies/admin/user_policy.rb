class Admin::UserPolicy < Admin::ApplicationPolicy
  def index?
    @user.admin?
  end

  def show?
    index?
  end

  def new?
    create?
  end

  def edit?
    update?
  end

  def create?
    @user.id != @record.try(:id)
  end

  def update?
    create?
  end

  def destroy?
    create?
  end

  def permitted_attributes
    params = [:id, :role, :email, :password, :password_confirmation, :current_password]
    @user.admin? ? params : []
  end

  class Scope < Scope
    def resolve
      @user.admin? ? User.all : User.none
    end
  end
end
