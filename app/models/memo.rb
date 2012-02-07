class Memo < ActiveRecord::Base
  belongs_to :twitter_user
  has_many :favs, :dependent => :delete_all

  validates :name,    :presence => true,
                      :length => {:maximum => 15}
  
  validates :note,    :presence => true,
                      :length => {:maximum => 200}

  validates :flag,    :presence => true

  scope :keyword_search, lambda { |keyword|
    where 'note like :q or name like :q', :q => "%#{keyword}%"
  }
end
