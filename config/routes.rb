Rails.application.routes.draw do
  devise_for :users

  namespace :api do
    resources :posts, only: [:index, :show] do
      resources :comments
    end
  end

  root to: 'client#index'
  get '*path', to: 'client#index'

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
