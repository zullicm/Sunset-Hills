Rails.application.routes.draw do
  namespace :api do
    resources :reservations
    resources :courses
    resources :users, only:[:show, :create]
    resources :instructors
    post "/signup", to: "users#create"
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }

  # resources :reservations
  # resources :courses
  # resources :users
  # resources :instructors
end
