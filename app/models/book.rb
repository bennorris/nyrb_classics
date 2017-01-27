class Book < ApplicationRecord
  has_and_belongs_to_many :bookshelf
  has_many :users, through: :bookshelf


  def title_with_author
    "#{title} - #{author}"
  end

  def author_with_title
    "#{author} - #{title}"
  end

  def last_name
    self.author.split(' ')[-1]
  end

  def self.sort_by_author
    books = Book.all
    books.sort_by {|book| book.last_name}
  end

  def self.add_books(current_collection)
    all_books = Book.all
    unique_books = all_books - current_collection
  end

  def self.add_books_by_author(current_collection)
    all_books = Book.all
    unique_books = all_books - current_collection
    unique_books.sort_by {|book| book.last_name}
  end



end
