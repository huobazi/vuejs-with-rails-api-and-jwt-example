module Api
  module V1
    class UsersController < ApplicationController
      before_action :authenticate_request!

      # POST /register
      def create
        @user = User.create(user_params)
        if @user.save
          response = {message: "User created successfully"}
          render json: response, status: :created
        else
          render json: @user.errors, status: :bad
        end
      end

      private

      def user_params
        params.permit(:username, :password)
      end
    end
  end
end
