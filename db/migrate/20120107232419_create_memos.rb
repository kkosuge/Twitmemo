class CreateMemos < ActiveRecord::Migration
  def change
    create_table :memos do |t|
      t.string :name
      t.text :note
      t.integer :flag

      t.timestamps
    end
  end
end
