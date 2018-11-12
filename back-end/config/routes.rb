Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :products
      post "users", to: "users#create"
      post "sessions", to: "sessions#create"
    end
  end
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
