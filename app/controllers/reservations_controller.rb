class ReservationsController < ApplicationController

  skip_before_action :authorized, only: :index

  def index
    reservations = Reservation.all
    render json: reservations, include: ['user', 'course', 'instructor']
  end

  def create
    reservation = Reservation.create(reservation_params)
    if reservation.valid?
      render json: reservation, status: :created
    else
      render json: { errors: reservation.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    reservation = Reservation.find_by(id: params[:id])
    reservation.update(reservation_params)
    render json: reservation
  end

  def destroy
    reservation = Reservation.find_by(id: params[:id])
    if reservation
      reservation.destroy
      render json: reservation 
    else
      render json: { error: "Reservation not found" }, status: :not_found
    end
  end

  private

  def reservation_params
    params.permit(:golf, :player_num, :cost, :time, :course_id, :instructor_id, :user_id, :reservation)
  end

end


