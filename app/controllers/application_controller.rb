class ApplicationController < ActionController::Base
  include ApplicationHelper
  protect_from_forgery :except => ["create"]
  before_filter :set_return_to

  def need_oauth
    unless current_user
      redirect_to root_url
      return
    end
  end

  def set_return_to
    unless current_user
      return_to = request.path
      unless return_to.match(/\.|login|logout|twitter|auth/)
        session[:return_to] = return_to
      end
    end 
  end

  def twitter_client
    user = User.find(session[:user_id]) if session[:user_id]
    Twitter.configure do |config|
      config.consumer_key = Twitmemo::Application.config.consumer_key
      config.consumer_secret = Twitmemo::Application.config.consumer_secret
      config.oauth_token = user.token
      config.oauth_token_secret = user.secret
    end
   @twitter_client = Twitter::Client.new
  end
end
