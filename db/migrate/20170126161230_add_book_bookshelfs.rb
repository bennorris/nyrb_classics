class AddBookBookshelfs < ActiveRecord::Migration[5.0]
  def change
    create_table :books_bookshelves, :id => false do |t|
      t.integer :book_id
      t.integer :bookshelf_id
    end
  end
end
