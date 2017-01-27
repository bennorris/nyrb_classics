class UsersController < ApplicationController

  def show
    @new_bookshelf = Bookshelf.new
    @new_bookshelf.books.build 
  end



end
