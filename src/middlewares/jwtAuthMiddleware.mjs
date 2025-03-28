import sessionManager from "../utills/SessionManager.mjs";

const jwtAuthverifyMiddleware = async (req, res, next) => {
  try {
    let token = null;

    // Check token in Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // Check token in HTTP-only cookie
    if (!token && req.cookies?.jwtToken) {
      token = req.cookies.jwtToken;
    }

    if (!token) {
      return res.status(401).json({
        msg: "No token provided",
        data: null,
      });
    }

    const decoded = sessionManager.verifyToken(token);
    if (!decoded) {
      return res.status(401).json({
        msg: "Invalid token",
        data: null,
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      msg: "Unauthorized",
      data: null,
    });
  }
};

export { jwtAuthverifyMiddleware };