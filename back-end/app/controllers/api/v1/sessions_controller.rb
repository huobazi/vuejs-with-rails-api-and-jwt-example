module Api
  module V1
    class SessionsController < ApplicationController
      before_action :authenticate_request!

      # POST /login
      def create
        user = User.find_by(username: user_params[:username])

        if user.authenticate?(params[:password])
          render json: payload(user)
        else
          render json: {message: ["用户名或密码错误"]}, status: :unauthorized
        end
      end

      private

      def payload(user)
        return nil unless user and user.id
        {
          auth_token: JsonWebToken.encode({user_id: user.id, exp: (Time.now + 1.hours).to_i}),
          user: {id: user.id, email: user.email},
        }
      end

      private

      def user_params
        params.permit(:username, :password)
      end
    end
  end
end
