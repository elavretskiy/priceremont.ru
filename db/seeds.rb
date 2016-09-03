def self.create_emails(email, role = 1)
  params = { email: email, password: 'password', password_confirmation: 'password',
             confirmed_at: Time.current, confirmation_token: nil, role: role }
  User.find_by(email: email) || User.create!(params)
end

def self.create_article(user)
  params = { title: Faker::Hipster.paragraph, text: Faker::Hipster.paragraph(30) }
  user.articles.find_or_create_by!(params)
end

emails = ['admin@priceremont.ru', 'user@priceremont.ru']
emails.each_with_index { |email, index| create_emails(email, index) }

1..30.times { create_emails(Faker::Internet.email) } if User.count < 30

User.all.each { |user| 1..30.times { create_article(user) } if user.articles.count < 30 }

User.all.each do |user|
  Article.all.each do |article|
    next if article.comments.count >= 30
    article.comments.create(text: Faker::Hipster.paragraph, user: user)
  end
end
