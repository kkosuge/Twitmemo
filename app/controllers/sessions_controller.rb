# encoding: utf-8
class SessionsController < ApplicationController
  def login
    auth = request.env['omniauth.auth']
    if user = User.find_by_nickname(auth['user_info']['nickname'])
      user.img = auth['user_info']['image']
      user.nickname = auth['user_info']['nickname']
      user.token = auth['credentials']['token']
      user.secret = auth['credentials']['secret']
      user.save!

      User.update_twitter_user(auth)
    else 
      User.create_account(auth)
    end

    session[:user_id] = user.id
    session[:twitter_id] = user.twitter_id
    logger.debug auth.to_yaml
    redirect_to root_url, :notice => 'ログインしました。'
  end
 
  def logout
    session[:user_id] = nil
    session[:twitter_id] = nil
    redirect_to root_url, :notice => 'ログアウトしました。'
  end
end
