class AddScreenNameToMemo < ActiveRecord::Migration
  def change
    add_column :memos, :screen_name, :string
  end
end
