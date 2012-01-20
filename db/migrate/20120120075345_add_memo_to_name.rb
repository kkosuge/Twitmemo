class AddMemoToName < ActiveRecord::Migration
  def change
    add_column :memos, :name, :string
  end
end
