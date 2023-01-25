class CoursesController < ApplicationController
  skip_before_action :authorized, only: :index
    # GET /courses
    def index
      courses = Course.all
      render json: courses
    end
    
end
