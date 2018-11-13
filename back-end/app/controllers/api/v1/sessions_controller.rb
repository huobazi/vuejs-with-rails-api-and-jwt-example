module Api
  module V1
    class SessionsController < ApplicationController
      skip_before_action :authenticate_request!, only: [:create]

      # POST /login
      def create
        user = User.find_by(username: user_params[:username])
        if user && user.authenticate(params[:password])
          render json: json_to_render(user), status: :created
        else
          render json: {message: ["用户名或密码错误"]}
        end
      end

      private

      def json_to_render(user)
        return nil unless user and user.id
        {
          auth_token: JsonWebToken.encode({user_id: user.id}),
          user: {id: user.id, username: user.username},
        }
      end

      private

      def user_params
        params.permit(:username, :password)
      end
    end
  end
end
