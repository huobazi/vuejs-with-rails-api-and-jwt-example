class JsonWebToken
  ALGORITHM = "HS256"

  class << self
    def token_auth_secret
      ENV["JWT_AUTH_SECRET"] || Rails.application.secrets.secret_key_base
    end

    def encode(playod, exp = 1.hours.from_now)
      payload[:exp] = exp.to_i
      JWT.encode(payload, token_auth_secret, ALGORITHM)
    end

    def decode(token)
      body = JWT.decode(token, auth_secret, true, {algorithm: ALGORITHM})[0]
      HashWithIndifferentAccess.new body
    rescue JWT::ExpiredSignature, JWT::VerificationError => e
      raise ExceptionHandler::ExpiredSignature, e.message
    rescue JWT::DecodeError, JWT::VerificationError => e
      raise ExceptionHandler::DecodeError, e.message
    else
      nil
    end
  end
end
