class Book < ApplicationRecord
  belongs_to :bookshelf
  has_many :users, through: :bookshelf
end
