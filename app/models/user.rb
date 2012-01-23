class User < ActiveRecord::Base
  def self.create_account(auth)
    user = User.new
    user.nickname = auth['user_info']['nickname']
    user.name = auth['user_info']['name']
    user.img = auth['user_info']['image']
    user.token = auth['credentials']['token']
    user.secret = auth['credentials']['secret']
    user.twitter_id = auth["uid"]
    user.save!

    twitteruser = TwitterUser.new
    twitteruser.twitter_id = auth["uid"]
    twitteruser.screen_name = auth['user_info']['nickname']
    twitteruser.img_url = auth['user_info']['image']
    twitteruser.save!
    user
  end

  def self.update_twitter_user(auth)
    twitter_user = TwitterUser.find_by_twitter_id(auth["uid"])
    twitter_user.screen_name = auth['user_info']['nickname']
    twitter_user.img_url = auth['user_info']['image']
    twitter_user.save!
  end
end
