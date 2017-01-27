class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception
  include ApplicationHelper

  def home
    if current_user
      redirect_to user_path(current_user)
    end
  end

  def after_sign_in_path_for(resource_or_scope)
    user_path(current_user)
  end

end
