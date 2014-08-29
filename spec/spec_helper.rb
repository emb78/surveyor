require 'rubygems'

ENV['RAILS_ENV'] ||= 'test'
require File.expand_path('../../config/environment', __FILE__)
require 'rspec/rails'
require 'capybara/rails'
require 'rspec/autorun'
require 'capybara/poltergeist'
Capybara.javascript_driver = :poltergeist

Capybara.server do |app, port|
  require 'rack/handler/thin'
  Rack::Handler::Thin.run(app, :Port => port)
end


RSpec.configure do |config|
  config.include FactoryGirl::Syntax::Methods
  config.order = 'random'
  config.mock_with :rspec
  config.use_transactional_fixtures = true

end
