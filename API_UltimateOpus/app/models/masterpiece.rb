class Masterpiece < ActiveRecord::Base
  has_many :cards, dependent: :destroy
  validates :titre, presence: true,
            length: {
                minimum: 5,
                maximum:100
            }
  validates :lieu, presence: true,
            length: {
                minimum: 3,
                maximum:50
            }
  validates :auteur, presence: true,
            length: {
                minimum: 5,
                maximum:130
            }
  validates :date, presence: true,
            length: {
                minimum: 3,
                maximum:80
            }
  validates :courant, presence: true,
            length: {
                minimum: 5,
                maximum:150
            }
  validates :son, presence: true,
            length: {
                minimum: 5,
                maximum:50
            }
  validates :image, presence: true,
            length: {
                minimum: 5,
                maximum:150
            }
  validates :localisation, presence: true,
            length: {
                minimum: 5,
                maximum:150
            }
end
