class TagsController < ApplicationController
    skip_before_action :authorized, only: [:index, :show]

    def index
        render json: Tag.all
    end

    def show
        tag = Tag.find(params[:id])
        render json: tag
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
