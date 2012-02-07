Twitmemo::Application.routes.draw do
  resources :memos
  root :to => "memos#index"
  # omniauth
  match 'auth/:provider/callback' => 'sessions#login'
  match '/logout' => 'sessions#logout', :as => :logout
  match  '/auth/failure' => "memos#index"
  # rooting
  match '/following' => 'note#index' , :as => :following
  match '/user/:screen_name' => 'user#index', :as => :user
  match '/terms' => 'terms#index', :as => :terms
  match '/api/post' => 'memos#create'
  match '/api/following/:id' => 'following#index'
  match '/api/memos' => 'memos#index'
  match '/api/memos/:screen_name' => 'memos#search'
  match '/api/fav' => 'fav#favorite'
end
