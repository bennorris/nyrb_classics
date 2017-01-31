require 'csv'
module ApplicationHelper

  def self.scrape_books
    i = 1
    all_books = []
    while i < 9
      page = "https://www.nyrb.com/collections/classics?page=#{i}&sort_by=title-ascending"
      doc = Nokogiri::HTML(open(page))
      doc.search('.product').each do |book|
        title = book.at_css('.title').text
        author = book.at_css('.author').text
        link = "http://www.nyrb.com" + book.at_css('.image').children[1]['href']
        image = "http:" + book.at_css('.image').children[1].children[1]['src']

        book = Book.new
        book.title = title
        book.author = author
        book.link = link
        book.image = image
        book.save
      end
        i +=1
    end
  end

  def self.get_book_description
    @books = Book.all

    @books.each do |book|
      link = book.link
      url = link.split('://')[1]
      new_proto = "https://"
      link = new_proto + url

      doc = Nokogiri::HTML(open(link))
      description = doc.search('.span8 .description p').text
      book.description = description
      book.save
    end
  end

end
