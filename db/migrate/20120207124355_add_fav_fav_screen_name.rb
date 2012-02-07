class AddFavFavScreenName < ActiveRecord::Migration
  def up
    add_column :favs, :fav_screen_name, :string
  end

  def down
  end
end
