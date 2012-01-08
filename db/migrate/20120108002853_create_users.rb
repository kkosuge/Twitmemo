class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.integer :twitter_id
      t.string :name
      t.string :nickname
      t.string :img
      t.string :token
      t.string :secret

      t.timestamps
    end
  end
end
