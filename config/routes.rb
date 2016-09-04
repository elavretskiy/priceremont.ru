Rails.application.routes.draw do
  require 'sidekiq/web'

  authenticate :user, lambda { |user| user.admin? } do
    mount Sidekiq::Web => '/sidekiq'
  end

  devise_for :users, path: 'auth', controllers: { registrations: 'registrations' }

  scope module: :main do
    root to: 'articles#index'

    resources :comments, only: [:create, :show]
    resources :articles, only: [:index]
  end

  namespace :admin do
    root to: 'main#index'

    resources :users
    resources :articles
    resources :comments, except: [:new, :create]
    resources :tags, except: [:new, :create]

    get 'profile', action: :show, controller: 'profiles'
    patch 'profile', action: :update, controller: 'profiles'
    put 'profile', action: :update, controller: 'profiles'
  end

  get 'admin/profile/edit', action: :edit, controller: 'admin/profiles', as: :edit_admin_profile
  get 'articles/:id', action: :show, controller: 'main/articles', as: :article, cache: false
end
