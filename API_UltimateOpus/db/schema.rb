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
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20141211155850) do

  create_table "cards", force: true do |t|
    t.string   "caracteristique"
    t.string   "titre_contenu"
    t.text     "content"
    t.integer  "masterpiece_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "cards", ["masterpiece_id"], name: "index_cards_on_masterpiece_id"

  create_table "masterpieces", force: true do |t|
    t.string   "titre"
    t.string   "lieu"
    t.string   "auteur"
    t.string   "date"
    t.string   "courant"
    t.string   "son"
    t.string   "image"
    t.string   "localisation"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
