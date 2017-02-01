module BookshelvesHelper

  def current_user_bookshelf_check
    current_user && current_user.bookshelf.id.to_i == params[:id].to_i
  end



end
