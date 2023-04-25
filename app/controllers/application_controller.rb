class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordInvalid, with: :render_unprocessable_entity_response
  rescue_from ActiveRecord::RecordNotFound, with: :not_found
  
  before_action :authorized

  private

  def authorized
    @current_user = User.find_by(id: session[:user_id])
     render json:{error: "Not Authorized"}, status: :unauthorized unless @current_user
  end
  
  def render_unprocessable_entity_response(exception)
    render json: { errors: exception.record.errors.full_messages }, status: :unprocessable_entity 
  end

  def not_found
    render json: {error: "Cannot find what you're looking for!"}, status: unauthorized
  end

end
