class BooksController < ApplicationController

  def all
    @all_books = Book.all
    respond_to do |f|
      f.json {render json: @all_books}
    end
  end

  def catalog
    @books = Book.all

    respond_to do |f|
      f.json {render json: @books}
    end
  end

  def search
    if current_user
      @res = Book.all.select {|book| book.author.include?(params[:q].titleize) ||book.title.include?(params[:q].titleize) }
      if @res.length > 0
        render partial: 'search_results'
      else
        redirect_to edit_bookshelf_path(current_user.bookshelf)
      end
    else
      redirect_to root_path
    end
  end

  def show
    @book = Book.find_by_id(params[:id])
    respond_to do |f|
      f.json {render json: @book}
    end
  end

end
