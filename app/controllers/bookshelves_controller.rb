class BookshelvesController < ApplicationController
  include BookshelvesHelper

  def new
  end

  def create
    if current_user
      @bookshelf = Bookshelf.new
      @bookshelf.user = current_user
      @bookshelf.book_ids = params[:bookshelf][:book_ids]
      if @bookshelf.save
        redirect_to bookshelf_path(@bookshelf)
      end
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
    if logged_in?
      @bookshelf = Bookshelf.find_by_id(params[:id])
      @bookshelf.book_ids += params[:bookshelf][:book_ids]
      if @bookshelf.save
        redirect_to bookshelf_path(@bookshelf)
      end
    else
      redirect_to root_path
    end
  end

  def add_book
    @bookshelf = Bookshelf.find_by_id(params[:bookshelf_id])
    @book = Book.find_by_id(params[:book_id])
    @bookshelf.books << @book
    @bookshelf.save 
  end

private

    def shelf_params
      params.require(:bookshelf).permit(:id, :book_ids)
    end

    def logged_in?
      current_user && current_user.bookshelf.id.to_i == params[:id].to_i
    end

end
