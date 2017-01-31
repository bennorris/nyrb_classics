Rails.application.routes.draw do

  devise_for :users
  resources :users
  resources :bookshelves, path: 'bookshelf'
  resources :books, only: [:show]

  # devise_for :users, :controllers => { :registrations => 'members' }
  #
  # resources :user do
    # resources :bookshelves, path: 'bookshelf'
  # end

  root to: 'application#home'
  get 'all_books', to: 'books#all'
  get 'catalog', to: 'books#catalog'
  post 'search', to: 'books#search'
  post 'add_new_book', to: 'bookshelves#add_book'

end
