class Tag < ApplicationRecord
    has_many :workout_tags
    has_many :workouts, through: :workout_tags
end
