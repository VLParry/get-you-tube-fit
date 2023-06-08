class TagsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        render json: Tag.all
    end

    def show
        tag = Tag.find(params[:id])
        workouts = tag.workouts_with_tag
        render json: { name: tag.name, workouts: workouts}
    end

    def create  
        tag = Tag.create!(tag_params)
        render json: tag, status: :created
    end

    private

    def tag_params
        params.permit(:name)
    end

end
