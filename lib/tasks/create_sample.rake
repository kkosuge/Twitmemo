# -*- coding: utf-8 -*-
namespace :db do
  task :create_sample => :environment do
   require 'faker'
	Rake::Task['db:reset'].invoke
	make_memos
	end
end

def make_memos
  20.times do
    Memo.create(:name => "hotchemi",
                :note => "これはテストデータです｡これはテストデータです｡これはテストデータです｡",
                :author => "hotchemi",
                :flag => rand(2),
                :twitter_id => 10000
               )
  end
end
