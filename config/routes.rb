Rails.application.routes.draw do
  resources :reservations
  resources :courses
  resources :users
  resources :instructors
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "courses#index"
end
