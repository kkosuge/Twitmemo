require 'pit'

set :application, "twitmemo"
set :repository,  "https://kkosuge@bitbucket.org/hotchemi/twitmemo.git"

set :scm, :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `git`, `mercurial`, `perforce`, `subversion` or `none`

role :web, "59.106.178.251"                          # Your HTTP server, Apache/etc
role :app, "59.106.178.251"                          # This may be the same as your `Web` server
#role :db,  "your primary db-server here", :primary => true # This is where Rails migrations will run
#role :db,  "your slave db-server here"

ENV["EDITOR"] = 'vi' if ENV["EDITOR"] || ENV["EDITOR"] != ""
pit = Pit.get("capistrano_scm_user", :require => {
  "scm_user" => "svn user name",
})
set :scm_user, pit["scm_user"]

set :user, "knm"
set :deploy_to, "/usr/local/rails/#{application}"
set :current_path, "#{deploy_to}/current"

set :use_sudo, false

set :deploy_via, :copy

set :rails_env, "production"


namespace :deploy do

  desc "START server"
  task :start, :roles=>:app do
    run "cd #{current_path} && BUNDLE_GEMFILE=#{current_path}/Gemfile bundle exec unicorn_rails -c #{current_path}/config/unicorn.rb -E #{rails_env} -D"
  end

  desc "RESTART server"
  task :restart, :roles=>:app do
    run "kill -USR2 `cat #{deploy_to}/shared/pids/unicorn.pid`"
  end

end

#
# if you're still using the script/reaper helper you will need
# these http://github.com/rails/irs_process_scripts

# If you are using Passenger mod_rails uncomment this:
# namespace :deploy do
