Twitmemo::Application.routes.draw do
  resources :memos
  root :to => "memos#index" 
  # omniauth
  match 'auth/:provider/callback' => 'sessions#login'
  match '/logout' => 'sessions#logout', :as => :logout
  match  '/auth/failure' => "memos#index"
  # rooting
  match '/note' => 'note#index'
  match '/memos' => 'memos#index'
  match '/user/:screen_name' => 'user#index'
  # api
  match '/api/post' => 'memos#create'
  match '/api/following/:id' => 'following#index'
  match '/api/memos' => 'memos#index'
end
