class BookshelvesController < ApplicationController
  include BookshelvesHelper

  def new
    if current_user.bookshelf
      redirect_to root_path
    end
    @new_bookshelf = Bookshelf.new
  end

  def create
    if current_user && !current_user.bookshelf
      @bookshelf = Bookshelf.new
      current_user.bookshelf = @bookshelf
      current_user.save
      @bookshelf.save
      redirect_to bookshelf_path(@bookshelf)
    else
      redirect_to root_path
    end
  end

  def show
    @bookshelf = Bookshelf.find_by_id(params[:id])
    @user = User.find_by_id(@bookshelf.user.id)
    @catalog_length = Book.all.length

    respond_to do |f|
      f.html {render :show}
      f.json {render json: @bookshelf}
    end

  end

  def edit
    if logged_in?
      @bookshelf = Bookshelf.find_by_id(params[:id])
    else
      redirect_to root_path
    end
  end

  def update
    @bookshelf = Bookshelf.find_by_id(params[:id])

    if logged_in?
      @delete_book = Book.find_by_id(params['delete_id'].to_i)
      @bookshelf.books.delete(@delete_book)
      @bookshelf.save
   else
      redirect_to root_path
   end

   respond_to do |f|
     f.json {render json: @bookshelf}
   end
  end

  def add_book
    if logged_in?
      @bookshelf = Bookshelf.find_by_id(params[:id])
      @book = Book.find_by_id(params[:book_id])

      if !@bookshelf.books.include?(@book)
        @bookshelf.books << @book
        @bookshelf.save
      else
        render :status => 500
      end
    else
      redirect_to root_path
    end
  end

private

    def shelf_params
      params.require(:bookshelf).permit(:id, :book_ids)
    end

    def logged_in?
      current_user && current_user.bookshelf.id.to_i == params[:id].to_i
    end

end
