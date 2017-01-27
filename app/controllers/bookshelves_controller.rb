class BookshelvesController < ApplicationController

  def new
  end

  def create
    @bookshelf = Bookshelf.new
    @bookshelf.user = current_user
    @bookshelf.book_ids = params[:bookshelf][:book_ids]
    if @bookshelf.save
      redirect_to bookshelf_path(@bookshelf)
    end

  end

  def show
    @bookshelf = Bookshelf.find_by_id(params[:id])
  end

  def edit
    @bookshelf = Bookshelf.find_by_id(params[:id])
  end

  def update
    @bookshelf = Bookshelf.find_by_id(params[:id])
    @bookshelf.book_ids += params[:bookshelf][:book_ids]
    if @bookshelf.save
      redirect_to bookshelf_path(@bookshelf)
    end
  end

private

    def shelf_params
      params.require(:bookshelf).permit(:id, :book_ids)
    end

end
