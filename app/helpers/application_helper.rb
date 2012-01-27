module ApplicationHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def memo_count
    @users = User.find(session[:user_id]) 
    @twitter ||= TwitterUser.find_by_screen_name(@users.nickname)
    @count = @twitter.memos.count
  end

  def memoed_count
    @count = Memo.where(author: session[:twitter_id])
    @count.count
  end
end
