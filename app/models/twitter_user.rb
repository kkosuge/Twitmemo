class TwitterUser < ActiveRecord::Base
  has_many :memos
end
