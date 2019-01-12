class JsonWebToken
  ALGORITHM = "HS256"

  class << self
    def token_secret
      ENV["JWT_AUTH_SECRET"] || Rails.application.credentials.secret_key_base
    end

    def encode(paylod, exp = 1.hours.from_now)
      paylod[:exp] = exp.to_i
      JWT.encode(paylod, token_secret, ALGORITHM)
    end

    def decode(token)
      body = JWT.decode(token, token_secret, false, {algorithm: ALGORITHM})[0]
      return HashWithIndifferentAccess.new body
    rescue JWT::ExpiredSignature, JWT::VerificationError => e
      raise ExceptionHandler::ExpiredSignature, e.message
    rescue JWT::DecodeError, JWT::VerificationError => e
      raise ExceptionHandler::DecodeError, e.message
    end
  end
end
