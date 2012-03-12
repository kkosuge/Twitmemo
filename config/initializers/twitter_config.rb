require "yaml"

Twitmemo::Application.configure do 
  twitter = YAML.load(File.open("config/twitter.yml"))

  config.consumer_key = twitter["consumer_key"]
  config.consumer_secret = twitter["consumer_secret"]
end
