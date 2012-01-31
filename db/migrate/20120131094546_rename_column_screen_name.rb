class RenameColumnScreenName < ActiveRecord::Migration
  def self.up
    rename_column :memos, :screen_name, :author_screen_name
  end

  def self.down
    rename_column :memos, :author_screen_name, :screen_name
  end
end
