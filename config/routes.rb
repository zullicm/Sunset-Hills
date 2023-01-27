Rails.application.routes.draw do
#   namespace :api do
resources :reservations, only: [:index, :create, :update, :destroy]
resources :courses, only: [:index]
get "allinstructors", to: "instructors#index"
post "/signup", to: "users#create"
get "/auth", to: "users#show"
post "/signin", to: "sessions#create"
delete "/logout", to: "sessions#destroy"
# end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
