class AddMemoFavFlag < ActiveRecord::Migration
  def up
    add_column :memos, :fav_flag, :integer
  end

  def down
  end
end
