import { doubleCsrf } from "csrf-csrf";
import { env, isProd } from "./env";

/**
 * Protección CSRF (sección 6/16): como la autenticación usa cookies,
 * SameSite=Lax reduce el riesgo pero no lo elimina para peticiones
 * cross-site que usan GET simple con efectos secundarios o para navegadores
 * antiguos. Se añade "double-submit cookie": el cliente debe enviar un
 * header `x-csrf-token` que coincide con un valor firmado en una cookie
 * separada (no HttpOnly, para que Angular pueda leerla).
 *
 * Se aplica solo a métodos mutantes (POST/PUT/PATCH/DELETE).
 */
export const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => env.CSRF_SECRET,
  cookieName: isProd ? "__Host-csrf" : "csrf_token",
  cookieOptions: {
    httpOnly: false,
    sameSite: "lax",
    secure: isProd,
    path: "/",
  },
  size: 64,
  getSessionIdentifier: (req) => req.cookies?.access_token ?? "anonymous",
});
