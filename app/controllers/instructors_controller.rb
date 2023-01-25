class InstructorsController < ApplicationController
  
  skip_before_action :authorized

  def index
    instructors = Instructor.all
    render json: instructors
  end
end
