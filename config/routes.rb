Rails.application.routes.draw do
#   namespace :api do
#   #   resources :reservations
#   #   resources :courses
#   #   # resources :users, only:[:show, :create]
#   #   resources :instructors
# end
  # Sessions
  post "/signin", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  
  # Users
  resources :users, only: [:show, :create]
  post "/signup", to: "users#create"
  get "/auth", to: "users#show"
  
  # Instructors
  # get "/trainers", to: "instructors#index"
  resources :instructors

  # Reservations
  resources :reservations

  # Courses
  resources :courses
  
  
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
