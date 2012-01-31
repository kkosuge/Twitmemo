class UserController < ApplicationController
  def index
    if params[:screen_name]
      @twitter = TwitterUser.find_by_screen_name(params[:screen_name])
      if @twitter
        @users = User.find_by_twitter_id(@twitter.twitter_id)
      else
        return
      end
   else
     unless current_user
       redirect_to root_path
       return
     end
      @users = User.find(session[:user_id]) 
   end

    @twitter ||= TwitterUser.find_by_screen_name(@users.nickname)
    @count = @twitter.memos
    @memos = @twitter.memos.where(flag: 1)
  end
end
