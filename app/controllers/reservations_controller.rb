class ReservationsController < ApplicationController
  
require 'debug'


  def create
    reservation = Reservation.create(reservation_params)
      debugger
    render json: reservation, status: :created
  end

  private

  def reservation_params
    params.permit(:type, :player_num, :time, :course_id, :instructor_id, :user_id)
  end

end


