class Tag < ApplicationRecord
    has_many :workout_tags
    has_many :workouts, through: :workout_tags

    validates :name, presence: true, uniqueness: true
end
