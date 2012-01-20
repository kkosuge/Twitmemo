class AddMemoToTwitterUserId < ActiveRecord::Migration
  def change
    add_column :memos, :twitter_user_id, :integer
    remove_column :memos, :twitter_id
    remove_column :memos, :name
  end
end
