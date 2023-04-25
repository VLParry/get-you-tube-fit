Rails.application.routes.draw do
  
  resources :workout_tags
  resources :tags
  resources :workouts
  resources :users, only:[:show, :create]

  post "/signup", to: "users#create"
  post "/login", to: "sessions#create"
  get "/auth", to: "users#show"
  delete "/logout", to: "sessions#destroy"


  # Routing logic: fallback requests for React Router.
  # Leave this here to help deploy your app later!
  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
