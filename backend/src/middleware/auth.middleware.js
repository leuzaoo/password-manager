import jwt from "jsonwebtoken";

export function authenticateUser(req, res, next) {
  const token = req.cookies["password-manager"];

  if (!token) {
    return res.status(401).json({ message: "Usuário precisa estar logado." });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;

    if (!req.userId) {
      return res.status(401).json({ message: "Token inválido" });
    }

    next();
  } catch (error) {
    console.error("Erro na autenticação do token: ", error);
    return res.status(400).json({ message: "Token inválido." });
  }
}
