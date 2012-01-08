class Memo < ActiveRecord::Base
  validates :name,        :presence => true,
                          :length => { :maximum => 15}

  validates :note,        :length => { :maximum => 140}

  validates :flag,        :presence => true
end
# == Schema Information
#
# Table name: memos
#
#  id         :integer         not null, primary key
#  name       :string(255)
#  note       :text
#  flag       :integer
#  created_at :datetime
#  updated_at :datetime
#

