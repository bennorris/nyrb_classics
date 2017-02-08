class UsersController < ApplicationController

  def show
    @new_bookshelf = Bookshelf.new
    @new_bookshelf.books.build
  end

  def current_user_info
    render json: {id: current_user.bookshelf.id}
  end

end
