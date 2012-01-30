class FollowingController < ApplicationController
  def index
    @datas = getdata(params[:id]) 
    render json: @datas
  end

  def getdata(num)
    twitter = twitter_client

    begin
    case num = num.to_i
      when 1
        userfriends = twitter.friend_ids.ids[0..10]
      else
        userfriends = twitter.friend_ids.ids[(num+9*(num-1))..num*10]
      end
    rescue => e
      return [:error => e]
    end

    users = twitter.users(userfriends)
    twitter_users = TwitterUser.where("twitter_id in (?)", userfriends)

    userinfo = []
    twitter_users.each{|user| userinfo << user.id}
    memos = Memo.where("author = ? AND twitter_user_id in (?)", session[:twitter_id], userinfo)    

    correct = []
    newdata=[]

    userfriends.each do |i|
	   users.each do |j|
		  if j['id'] == i
		    correct << j
        end
      end
    end

    if memos.size == 0
      return correct
    end

	 correct.each do |i|
      newdata << Hash[i]
      memos.each do |m|
		  if Hash[i]['screen_name'] == m.name
		    newdata[-1]['note'] = m.note
        else
		  	 newdata[-1]['note'] = nil
        end
      end
    end

    return newdata
  end
end
