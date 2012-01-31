class ChangeAuthorTypeToInteger < ActiveRecord::Migration
  def up
    change_column :memos, :author, :integer
  end

  def down
  end
end
