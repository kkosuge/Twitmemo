# encoding: utf-8
class SessionsController < ApplicationController
  def login
    auth = request.env['omniauth.auth']
    if user = User.find_by_nickname(auth['user_info']['nickname'])
      user.img = auth['user_info']['image']
      user.nickname = auth['user_info']['nickname']
      user.name = auth['user_info']['name']
      user.token = auth['credentials']['token']
      user.secret = auth['credentials']['secret']
      user.save!
      User.update_twitter_user(auth)
    else 
      user = User.create_account(auth)
    end

    session[:user_id] = user.id
    session[:twitter_id] = user.twitter_id
    session[:screen_name] = user.nickname
    logger.debug auth.to_yaml

    if session[:return_to]
      return_to = session[:return_to]
      session.delete :return_to
      redirect_to return_to, :notice => "ログインしました。"
      return
    end
    redirect_to root_url, :notice => 'ログインしました。'
  end
 
  def logout
    reset_session
    redirect_to root_url, :notice => 'ログアウトしました。'
  end
end
