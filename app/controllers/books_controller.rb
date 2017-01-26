class BooksController < ApplicationController

  def all
    @all_books = Book.all
    respond_to do |f|
      f.json {render json: @all_books}
    end
  end

  def catalog
    @books = Book.all
  end

end
