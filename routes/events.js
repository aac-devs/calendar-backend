const { Router } = require("express");
const { check } = require("express-validator");

const {
  getEvents,
  deleteEvent,
  updateEvent,
  createEvent,
} = require("../controllers/events");
const { validateJWT } = require("../middlewares/validate-jwt");
const { validateFields } = require("../middlewares/validate-fields");
const { isDate } = require("../helpers/isDate");

const router = Router();
router.use(validateJWT);

// Obtener eventos
router.get("/", getEvents);

// Crear un nuevo evento
router.post(
  "/",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateFields,
  ],
  createEvent
);

// Actualizar evento
router.put(
  "/:id",
  [
    check("title", "El título es obligatorio").not().isEmpty(),
    check("start", "Fecha de inicio es obligatoria").custom(isDate),
    check("end", "Fecha de finalización es obligatoria").custom(isDate),
    validateFields,
  ],
  updateEvent
);

// Borrar evento
router.delete("/:id", deleteEvent);

module.exports = router;
