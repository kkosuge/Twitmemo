class AddTwitterIdToMemos < ActiveRecord::Migration
  def change
    add_column :memos, :twitter_id, :integer
  end
end
