module IndexPage
  extend ActiveSupport::Concern

  included do
    scope :index, -> { order(created_at: :desc) }
  end
end
