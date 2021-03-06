class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  has_one :bookshelf
  has_one :wishlist
  has_many :books, through: :bookshelf

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
end
