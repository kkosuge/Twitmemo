class UserController < ApplicationController
  def index
    @users = User.find(session[:user_id])
    @memos = Memo.order("updated_at DESC")
    @twitter = TwitterUser.find_by_screen_name(params[:screen_name] || @users.nickname)
  end
end
