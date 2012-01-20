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
  end
end

# == Schema Information
#  Table name : users
#  id         :integer         not null, primary key
#  twitter_id :integer
#  name       :string(255)
#  nickname   :string(255)
#  img        :string(255)
#  token      :string(255)
#  secret     :string(255)
#  created_at :datetime
#  updated_at :datetime
