class ApplicationController < ActionController::Base
  include ApplicationHelper
  protect_from_forgery

  def need_oauth
    unless current_user
     redirect_to root_url
     return
    end
  end


  def twitter_client
    user = User.find(session[:user_id]) if session[:user_id]

    Twitter.configure do |config|
      config.consumer_key = '0qzNniUyKkWdGIUe7kMEA'
      config.consumer_secret = 'czidLzD2WJQgSY5TBd15vBsYNzrj5FzarYOoe1fw'
      config.oauth_token = user.token
      config.oauth_token_secret = user.secret
    end

   @twitter_client = Twitter::Client.new
  end
end
