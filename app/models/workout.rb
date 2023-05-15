class Workout < ApplicationRecord
  belongs_to :user
  has_many :workout_tags, dependent: :destroy
  has_many :tags, through: :workout_tags

  validates :title, presence: true, length: { maximum: 100 }
  validates :description, presence: true, uniqueness: true, length: { maximum: 200 }
  validates :duration, presence: true, numericality: { greater_than: 0 }
  validates :video_url, presence: true, uniqueness: true, format: { with: /\Ahttps?:\/\/[\S]+\z/i, message: "must be a valid URL" }
  validates :user_id, presence: true
end
