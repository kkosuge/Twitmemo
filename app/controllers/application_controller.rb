class ApplicationController < ActionController::Base
  protect_from_forgery

  before_filter :twitter_client

  def twitter_client
    user = User.find(session[:user_id])

    Twitter.configure do |config|
      config.consumer_key = 'meZ5LEt3X70KqbOBzUCpHg'
      config.consumer_secret = 'DCsSNYO9h7YcsY8HtrTXpif9Ofrl2TQjOpGWSKd8w'
      config.oauth_token = '153838559-uH2LDcQACra67LjaEbDA1eTnnAcnefi8bfKpFaF8'
      config.oauth_token_secret = 'NXvTc7bxgIDW6chrQM2Ox6fKnidlOfGXIaxrqY86LG4'
    end

   pp "*"*100
   pp Twitter.rate_limit_status

   @twitter_client = Twitter::Client.new
  end
end
