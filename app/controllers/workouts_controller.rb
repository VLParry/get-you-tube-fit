class WorkoutsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        render json: Workout.all
    end

    def show
        workout = find_workout
        render json: workout, status: 200
    end

    private

    def workout_params
        params.permit(:title, :description, :duration, :warmup, :cooldown, :video_url)
    end

    def find_workout
        workout = Workout.find(params[:id])
    end

end
