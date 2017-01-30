class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include ApplicationHelper

  def home
    if current_user && current_user.bookshelf
      shelf_number = Bookshelf.find_by(user_id: current_user.id)
      redirect_to bookshelf_path(shelf_number)
    elsif current_user
      redirect_to user_path(current_user)
    end
  end

  def after_sign_in_path_for(resource_or_scope)
    bookshelf_path(current_user.bookshelf)
  end

end
