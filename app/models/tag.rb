# == Schema Information
#
# Table name: tags
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Tag < ActiveRecord::Base
  include IndexPage

  has_many :taggings, dependent: :nullify
  has_many :articles, through: :taggings

  validates :name, presence: true, uniqueness: true

  scope :by_name, ->(name) { where(name: name.strip) }

  scope :counts, -> {
    select('name, count(taggings.tag_id) as count').joins(:taggings).group('taggings.tag_id, tags.name')
  }

  scope :search, -> q {
    where = 'CAST(tags.id AS TEXT) LIKE (:q) OR lower(name) LIKE lower(:q)'
    where(where, q: "%#{q}%")
  }

  def self.classes
    %w{label-info label-success label-warning label-danger}
  end
end
