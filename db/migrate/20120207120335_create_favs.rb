class CreateFavs < ActiveRecord::Migration
  def change
    create_table :favs do |t|
      t.integer :memo_id
      t.integer :fav_user_id

      t.timestamps
    end
  end
end
