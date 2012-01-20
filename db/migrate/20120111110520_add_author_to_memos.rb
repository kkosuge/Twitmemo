class AddAuthorToMemos < ActiveRecord::Migration
  def change
    add_column :memos, :author, :string
  end
end
