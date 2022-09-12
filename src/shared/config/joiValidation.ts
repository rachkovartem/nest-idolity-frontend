import Joi from "joi";
import i18nMessages from "./i18n-messages";

export const userSchema = Joi.object({
  name: Joi.string().min(4).required().messages({
    "string.min": i18nMessages.minLengthName,
    "string.empty": i18nMessages.nameRequired,
  }),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      "string.email": i18nMessages.incorrectEmailFormat,
      "string.empty": i18nMessages.emailRequired,
    }),
  password: Joi.string().required().messages({
    "string.empty": i18nMessages.passwordRequired,
  }),
});
