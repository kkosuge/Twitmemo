class Memo < ActiveRecord::Base
  belongs_to :twitter_user

  validates :name,    :presence => true
  
  validates :note,    :presence => true

  validates :flag,    :presence => true

  scope :keyword_search, lambda { |keyword|
    where 'note like :q or name like :q', :q => "%#{keyword}%"
  }
end
