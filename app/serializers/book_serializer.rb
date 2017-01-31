class BookSerializer < ActiveModel::Serializer
  attributes :id, :title, :author, :image, :link, :description 
end
