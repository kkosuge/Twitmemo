#coding:UTF-8
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

  def hbr(str)
    ERB::Util.html_escape(str).gsub(/\r\n|\r|\n/, '<br />').html_safe
  end
end
