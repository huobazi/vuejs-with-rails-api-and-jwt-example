module Api
  module V1
    class ApplicationController < ActionController::API
      include ExceptionHandler

      before_action :authenticate_request!

      def current_user
        @current_user
      end

      def logged_in?
        !!@current_user
      end

      protected

      def authenticate_request!
        if !http_token
          raise AuthenticationError, "Not Authenticated: Require X-Authorization-Token"
        end
        unless user_id_in_token?
          raise AuthenticationError, "Not Authenticated: Bad tok format"
        end
        @current_user = User.find(auth_token[:user_id])
      rescue JWT::VerificationError
        raise InvalidToken, "Not Authenticated: InvalidToken, Bad tok format"
      rescue JWT::DecodeError
        raise DecodeError, "Not Authenticated: DecodeError, Bad tok format"
      end

      private

      def http_token
        return request.headers["X-Authorization-Token"].split(" ").last if request.headers["X-Authorization-Token"].present?
        nil
      end

      def auth_token
        JsonWebToken.decode(http_token)
      end

      def user_id_in_token?
        http_token && auth_token && auth_token[:user_id].to_i
      end
    end
  end
end
