class Makeindex < ActiveRecord::Migration
  def up
    add_index :memos, :name
    add_index :memos, :author
  end

  def down
    remove_index :memos, :name
    remove_index :memos, :author
  end
end
