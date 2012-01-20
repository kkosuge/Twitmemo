class Memo < ActiveRecord::Base
  belongs_to :twitter_user
  
  validates :note,    :presence => true

  validates :flag,    :presence => true
end
