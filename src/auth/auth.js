class AuthService {
  constructor(logger) {
    this._logger = logger;
  }

  login() {
    return { success: true };
  }

  register() {
    return { success: true };
  }
}

module.exports = AuthService;
