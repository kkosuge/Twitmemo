#coding:UTF-8
# Load the rails application
require File.expand_path('../application', __FILE__)

# Initialize the rails application
Twitmemo::Application.initialize!
Time::DATE_FORMATS[:jp] = "%m/%d "
