module Api
  module V1
    class ApplicationController < ActionController::API
      include ExceptionHandler

      before_action :authenticate_request!

      attr_reader :current_user

      def current_user
        @current_user
      end

      def logged_in?
        !!@current_user
      end

      protected

      def authenticate_request!
        unless user_id_in_token?
          raise AuthenticationError, "Not Authenticated"
          return
        end
        @current_user = User.find(auth_token[:user_id])
      rescue JWT::VerificationError
        raise InvalidToken, "Not Authenticated"
      rescue JWT::DecodeError
        raise DecodeError, "Not Authenticated"
      end

      private

      def http_token
        @http_token ||= if request.headers["Authorization"].present?
                          request.headers["Authorization"].split(" ").last
                        end
      end

      def auth_token
        @auth_token ||= JsonWebToken.decode(http_token)
      end

      def user_id_in_token?
        http_token && auth_token && auth_token[:user_id].to_i
      end
    end
  end
end
