Rails.application.routes.draw do

  devise_for :users, :controllers => { :registrations => 'members' }

  resources :user do
    resources :bookshelves, path: 'bookshelf'
  end

  root to: 'application#home'
  get 'all_books', to: 'books#all'
  get 'catalog', to: 'books#catalog'
end
