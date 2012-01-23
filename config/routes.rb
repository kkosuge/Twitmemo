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
  match '/user(/:screen_name)' => 'user#index'
  # api
  match '/api/post' => 'memos#create'
  match '/api/following/:id' => 'following#index'
  match '/api/memos' => 'memos#index'
end

#== Route Map
# Generated on 08 Jan 2012 12:01
#           POST   /memos(.:format)                   {:action=>"create", :controller=>"memos"}
#  new_memo GET    /memos/new(.:format)               {:action=>"new", :controller=>"memos"}
# edit_memo GET    /memos/:id/edit(.:format)          {:action=>"edit", :controller=>"memos"}
#      memo GET    /memos/:id(.:format)               {:action=>"show", :controller=>"memos"}
#           PUT    /memos/:id(.:format)               {:action=>"update", :controller=>"memos"}
#           DELETE /memos/:id(.:format)               {:action=>"destroy", :controller=>"memos"}
#      root        /                                  {:controller=>"memos", :action=>"index"}
#                  /auth/:provider/callback(.:format) {:controller=>"sessions", :action=>"login"}
#    logout        /logout(.:format)                  {:controller=>"sessions", :action=>"logout"}
