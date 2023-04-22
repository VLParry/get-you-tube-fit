class WorkoutTag < ApplicationRecord
  belongs_to :tag
  belongs_to :workout
end
