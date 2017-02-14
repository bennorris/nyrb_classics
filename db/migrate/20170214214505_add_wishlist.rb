class AddWishlist < ActiveRecord::Migration[5.0]
  create_table :wishlists do |t|
    t.integer :user_id

    t.timestamps
  end
end
