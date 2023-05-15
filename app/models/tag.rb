class Tag < ApplicationRecord
    has_many :workout_tags
    has_many :workouts, through: :workout_tags

    validates :name, presence: true, uniqueness: true

    #below returns all the workouts associated with a tag. Using this method in the show action for tags
    def workouts_with_tag
        self.workouts 
    end
end
