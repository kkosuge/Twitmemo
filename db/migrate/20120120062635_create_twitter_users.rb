class CreateTwitterUsers < ActiveRecord::Migration
  def change
    create_table :twitter_users do |t|
      t.integer :twitter_id
      t.string :screen_name
      t.string :img_url

      t.timestamps
    end
  end
end
