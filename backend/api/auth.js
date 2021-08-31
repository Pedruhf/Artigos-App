const { authSecret } = require("../.env");
const jwt = require("jwt-simple");
const bcrypt = require("bcrypt-nodejs");

module.exports = (app) => {
  const signin = async (req, res) => {
    if (!req.body.email || !req.body.password) {
      return req.status(400).send("Informe o usuário e senha!");
    }

    const user = await app.db("users")
      .where({ email: req.body.email })
      .first();

    if (!user) {
      return res.status(400).send("Usuário não encontrado!");
    }

    const isMatch = bcrypt.compareSync(req.body.password, user.password);

    if (!isMatch) {
      return res.status(401).send("Email e/ou senha inválido(a)");
    }

    const now = Math.floor(Date.now() / 1000); // Data atual em segundos
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      admin: user.admin,
      iat: now, // emitido em (data atual)
      exp: now + (60 * 60 * 24 * 3) // 60 segundos * 60 minutos * 24 horas * 3 dias
    };

    res.json({
      ...payload,
      token: jwt.encode(payload, authSecret)
    });
  };

  const validateToken = async (req, res) => {
    const userData = req.body || null;

    try {
      if (userData) {
        const token = jwt.encode(userData.token, authSecret);
        if (new Date(userData.exp * 1000) > new Date()) {
          return res.send(true);
        }
      }
    } catch (e) {
      // Problema com o token
    }

    res.send(false);
  };

  return { signin, validateToken };
};
