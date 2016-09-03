def self.create_emails(email, role = 1)
  params = { email: email, password: 'password', password_confirmation: 'password',
             confirmed_at: Time.current, confirmation_token: nil, role: role }
  User.find_by(email: email) || User.create!(params)
end

tags = Faker::Hipster.words(25)

def self.create_article(user, tags)
  params = { title: Faker::Hipster.paragraph, text: Faker::Hipster.paragraph(30) }
  article = user.articles.find_or_create_by!(params)
  count = [5, 10, 15].sample
  puts tags.sample(count).join(', ')
  article.all_tags = tags.sample(count).join(', ')
end

emails = ['admin@priceremont.ru', 'user@priceremont.ru']
emails.each_with_index { |email, index| create_emails(email, index) }

1..30.times { create_emails(Faker::Internet.email) } if User.count < 15

User.all.each { |user| 1..30.times { create_article(user, tags) } if user.articles.count < 10 }

User.all.each do |user|
  Article.all.each do |article|
    next if article.comments.count >= 15
    article.comments.create(text: Faker::Hipster.paragraph, user: user)
  end
end
