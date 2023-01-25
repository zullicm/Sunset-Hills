class ReservationsController < ApplicationController

  def
    reservations = Reservation.all
    render json: reservation, status: :ok
  end

  def create
    reservation = Reservation.create(reservation_params)
    render json: reservation, status: :created
  end

  private

  def reservation_params
    params.permit(:golf, :player_num, :time, :course_id, :instructor_id, :user_id, :reservation)
  end

end


