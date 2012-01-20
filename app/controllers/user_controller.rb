class UserController < ApplicationController
  def index
    @users = User.find(session[:user_id])
    @memos = Memo.order("updated_at DESC")
    @notes = Memo.where(twitter_id:session[:twitter_id])

    @twitter = TwitterUser.find_by_screen_name(params[:screen_name])
  end
end
