class AddLinkToBooks < ActiveRecord::Migration[5.0]
  def change
    add_column :books, :link, :string  
  end
end
