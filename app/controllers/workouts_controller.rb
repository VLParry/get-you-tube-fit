class WorkoutsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        render json: Workout.all
    end

    def show
        workout = find_workout
        if workout
            render json: workout, include: :tags, status: 200
        else
            render json: { message: "Workout not found" }, status: 404
        end
    end

    def create
        workout = @current_user.workouts.build(workout_params)
      
        if workout.save
          # Add tags to the workout
          tag_ids = params[:tag_ids]
          tag_ids.each do |tag_id|
            WorkoutTag.create(workout: workout, tag_id: tag_id)
          end
      
          render json: workout, include: :tags, status: :created
        else
          render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
        end
      end


      def update
        workout = find_workout
      
        if workout.user == @current_user
          if workout.update(workout_params)
            # Update tags of the workout
            tag_ids = params[:workout][:tag_ids]
            workout.tags = Tag.where(id: tag_ids) if tag_ids.present?
      
            render json: workout, include: :tags, status: :ok
          else
            render json: { errors: workout.errors.full_messages }, status: :unprocessable_entity
          end
        else
          render json: { error: 'Not Authorized' }, status: :unauthorized
        end
      end
      
  
      

    def destroy
        workout = find_workout
        if workout.user == @current_user
            workout.destroy
            head :no_content
        else
            render json: { error: 'Not Authorized' }, status: :unauthorized
        end 
    end

    private

    def workout_params
        params.require(:workout).permit(:user_id, :title, :description, :duration, :warmup, :cooldown, :video_url, tag_ids: [])
    end
    #tag_ids is permitted as an empty array. When the user submits the form to create a new workout, the selected tag ids will be sent as an array in the tag_ids parameter. You can then use this array to create the WorkoutTag records associated with the workout.

# The :workout key is used to encapsulate the parameters for the workout being created. In the log output you posted, it shows that the params hash includes a workout key that has all of the parameters for the workout, such as the title, description, warmup, cooldown, etc.

# In the create action of your WorkoutsController, you are currently using params to access the values of these parameters. However, because params includes more than just the parameters for the workout, you need to explicitly permit the parameters you want to allow to be submitted. This is done using strong parameters.

# By using the :workout key in the strong parameters, you are specifying that you only want to allow parameters that are nested under the workout key to be submitted.

    def find_workout
        workout = Workout.find(params[:id])
    end

end
