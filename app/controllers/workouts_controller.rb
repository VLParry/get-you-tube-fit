class WorkoutsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        render json: Workout.all
    end

    def show
        workout = find_workout
        render json: workout, status: 200
    end

    def create  
        # user = User.find(params[:user_id])
        workout = @current_user.workouts.create!(workout_params)
        render json: workout, status: :created
    end

    def update
        workout = Workout.find(params[:id])
        if workout.user == @current_user
            workout.update(workout_params)
            render json: workout 
        else
            render json: { error: 'Not Authorized' }, status: :unauthorized
        end
    end

    private

    def workout_params
        params.permit(:user_id, :title, :description, :duration, :warmup, :cooldown, :video_url, :tags)
    end

    def find_workout
        workout = Workout.find(params[:id])
    end

end
