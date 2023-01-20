Rails.application.routes.draw do
  namespace :api do
    resources :reservations
    resources :courses
    resources :users
    resources :instructors
  end
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
