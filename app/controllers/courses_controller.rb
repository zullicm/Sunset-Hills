class CoursesController < ApplicationController
    # GET /courses
    def index
      courses = Course.all
      render json: courses
    end
end
