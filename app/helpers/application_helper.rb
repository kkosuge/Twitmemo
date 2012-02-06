#coding:UTF-8
module ApplicationHelper
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end

  def memo_count
    @twitter = Memo.where(name: session[:screen_name])
    if @twitter.size == 0
      return 0
    end
    @twitter.size
  end

  def memoed_count
    @memo = Memo.where(author: session[:twitter_id])
    @memo.count
  end

  def hbr(str)
    ERB::Util.html_escape(str).gsub(/\r\n|\r|\n/, '<br />').html_safe
  end
end
