# == Schema Information
#
# Table name: articles
#
#  id           :integer          not null, primary key
#  title        :string           not null
#  text         :text             not null
#  user_id      :integer
#  created_at   :datetime         not null
#  updated_at   :datetime         not null
#  is_published :boolean          default(TRUE)
#

class Article < ActiveRecord::Base
  include IndexPage

  acts_as_commentable

  belongs_to :user
  has_many :comments, as: :commentable
  has_many :taggings, dependent: :nullify
  has_many :tags, through: :taggings

  validates :title, :text, presence: true, uniqueness: true
  validates :user_id, presence: true

  scope :is_published, -> { where(is_published: true) }
  scope :by_ids, -> ids { where(id: ids) }

  scope :by_tag, -> name {
    joins(:tags).where(tags: { name: name }) if name != 'all'
  }

  scope :by_is_published, -> is_published {
    where(is_published: is_published) if is_published != 'all'
  }

  scope :search, -> q {
    where = 'CAST(articles.id AS TEXT) LIKE (:q) OR ' +
            'lower(title) LIKE lower(:q) OR lower(text) LIKE lower(:q) OR ' +
            'lower(users.email) LIKE lower(:q) OR lower(tags.name) LIKE lower(:q)'
    joins(:user, :tags).where(where, q: "%#{q}%").distinct
  }

  def all_tags=(names)
    return if title.blank? || text.blank?
    names = names.split(',').reject(&:blank?)
    self.tags = names.map { |name| Tag.find_or_create_by!(name: name.strip) }
  end

  def all_tags
    tags.map(&:name).join(', ')
  end

  def tag_classes
    tags = self.tags.counts
    classes = Tag.classes

    max = tags.sort_by(&:count).last
    tags.map do |tag|
      index = tag.count.to_f / max.count * (classes.size - 1)
      { name: tag.name, css: classes[index.round] }
    end
  end

  def self.as_json_include_admin_collection(user)
    return includes(:tags).as_json({ methods: :all_tags }) if !user.admin?
    includes(:user, :tags).as_json(
      { include: { user: { only: [:id, :email] } }, methods: :all_tags }
    )
  end

  def as_json_include_admin_show_resource(user)
    return as_json({ methods: :all_tags }) if !user.admin?
    as_json({ include: { user: { only: [:id, :email] } }, methods: :all_tags })
  end

  def as_json_include_admin_edit_resource
    as_json({ methods: :all_tags })
  end

  def self.as_json_include_main_collection
    includes(:user).as_json(
      { include: { user: { only: [:id, :email] } }, methods: :tag_classes }
    )
  end

  def as_json_include_main_resource
    as_json(
      { include: { user: { only: [:id, :email] },
                   comments: { only: [:id, :text, :created_at, :email],
                               include: { user: { only: [:email, :id] } } } },
        methods: :tag_classes }
    )
  end
end
