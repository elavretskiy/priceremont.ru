module OnlinerModel
  extend ActiveSupport::Concern

  included do
    include IndexPage
    
    belongs_to :account
    has_one :user, through: :account
    has_many :platforms, through: :account

    enum state: { not_active: 0, is_up: 1, is_archive: 2 }

    validates :text, :title, :system_id, :state, :up_at, presence: true

    before_create :set_up_at
    before_save :set_up_at_sec

    scope :by_system_ids, -> system_ids { where(system_id: system_ids) }
    scope :not_is_archive, -> { where.not(state: 2) }
    scope :as_is_archive, -> system_ids { where.not(system_id: system_ids) }
    scope :as_is_up, -> system_ids { where(system_id: system_ids, state: 2) }
    scope :as_up_at, -> up_at { where(up_at: up_at, state: 1) }

    scope :search, -> q {
      where = 'lower(text) LIKE lower(:q) OR ' +
        'lower(title) LIKE lower(:q) OR ' +
        'lower(accounts.username) LIKE lower(:q) OR ' +
        'lower(accounts.system_id) LIKE lower(:q) OR ' +
        'lower(users.email) LIKE lower(:q)'
      joins(:account, :user).where(where, q: "%#{q}%")
    }

    scope :by_state, -> state {
      state == 'all' ? not_is_archive : where(state: state)
    }

    def collection_states
      OnlinerAd.states.map { |key, value| [I18n.t("states.#{key}"), key] }
    end

    def set_upped_at_for_apartment
      time = Time.current
      update_attributes(up_at: time + 5.minutes, upped_at: time)
    end

    def set_upped_at_for_ad
      update_attribute(:upped_at, Time.current)
    end

    def self.as_json_include
      { include: { account: { only: [:username, :id] }, user: { only: [:email, :id] } } }
    end

    private

    def set_up_at
      self.up_at = Time.current.change(sec: 0)
    end

    def set_up_at_sec
      self.up_at = up_at.change(sec: 0)
    end
  end
end
