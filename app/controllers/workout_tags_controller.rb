class WorkoutTagsController < ApplicationController

    def index
        render json: WorkoutTag.all
    end

end
