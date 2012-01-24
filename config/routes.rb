Twitmemo::Application.routes.draw do
  resources :memos
  root :to => "memos#index" 
  # omniauth
  match 'auth/:provider/callback' => 'sessions#login'
  match '/logout' => 'sessions#logout', :as => :logout
  match  '/auth/failure' => "memos#index"
  # rooting
  match '/note' => 'note#index' , :as => :note
  match '/memos' => 'memos#index', :as => :memos
  match '/user/:screen_name' => 'user#index', :as => :user
  # api
  match '/api/post' => 'memos#create'
  match '/api/following/:id' => 'following#index'
  match '/api/memos' => 'memos#index'
end
