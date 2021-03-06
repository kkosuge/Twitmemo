# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120208094020) do

  create_table "favs", :force => true do |t|
    t.integer  "memo_id"
    t.integer  "fav_user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "fav_screen_name"
  end

  create_table "memos", :force => true do |t|
    t.text     "note"
    t.integer  "flag"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "author",             :limit => 255
    t.integer  "twitter_user_id"
    t.string   "name"
    t.string   "author_screen_name"
    t.integer  "fav_flag"
  end

  add_index "memos", ["author"], :name => "index_memos_on_author"
  add_index "memos", ["name"], :name => "index_memos_on_name"

  create_table "twitter_users", :force => true do |t|
    t.integer  "twitter_id"
    t.string   "screen_name"
    t.string   "img_url"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "users", :force => true do |t|
    t.integer  "twitter_id"
    t.string   "name"
    t.string   "nickname"
    t.string   "img"
    t.string   "token"
    t.string   "secret"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
