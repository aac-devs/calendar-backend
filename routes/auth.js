/*
  Rutas de usuarios / Auth
  host + /api/auth
*/
const { Router } = require("express");
const { check } = require("express-validator");

const {
  userCreate,
  userLogin,
  userRenewToken,
} = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/new",
  [
    // middlewares:
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe contener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  userCreate
);

router.post(
  "/",
  [
    // middlewares:
    check("email", "El email es obligatorio").isEmail(),
    check(
      "password",
      "El password debe contener al menos 6 caracteres"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  userLogin
);

router.get("/renew", validateJWT, userRenewToken);

module.exports = router;
