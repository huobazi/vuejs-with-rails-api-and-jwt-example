module Api
  module V1
    class UsersController < ApplicationController
      skip_before_action :authenticate_request!, only: [:create]

      # POST /register
      def create
        @user = User.create(user_params)
        if @user.save
          response = {message: "User created successfully"}
          render json: response, status: :created
        else
          render json: @user.errors
        end
      end

      private

      def user_params
        params.require(:user).permit(:username, :password, :password_confirmation)
      end
    end
  end
end
