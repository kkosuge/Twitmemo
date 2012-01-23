class ApplicationController < ActionController::Base
  protect_from_forgery
  # before_filter :twitter_client

  def twitter_client
    user = User.find(session[:user_id]) if session[:user_id]

    Twitter.configure do |config|
      config.consumer_key = '0qzNniUyKkWdGIUe7kMEA'
      config.consumer_secret = 'czidLzD2WJQgSY5TBd15vBsYNzrj5FzarYOoe1fw'
      config.oauth_token = user.token
      config.oauth_token_secret = user.secret
    end

   pp "*"*100
   pp Twitter.rate_limit_status

   @twitter_client = Twitter::Client.new
  end
end
