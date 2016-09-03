class Admin::TagPolicy < Admin::ApplicationPolicy
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
    false
  end

  def update?
    index?
  end

  def destroy?
    index?
  end

  def permitted_attributes
    @user.admin? ? [:name] : []
  end

  class Scope < Scope
    def resolve
      @user.admin? ? Tag.all : Tag.none
    end
  end
end
