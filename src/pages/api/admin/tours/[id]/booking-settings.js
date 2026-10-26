// Admin proxy. Admin session protection is assumed to be handled the same way
// as the other src/pages/api/admin/* endpoints (middleware on /api/admin/*).
// If those endpoints check the admin cookie explicitly, copy that check here.
import { updateTourBookingSettings } from "@/lib/adminApi.js";

export const prerender = false;

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

export async function PUT({ params, request }) {
  let body;
  try {
    body = await request.json();
  } catch {
    return json({ message: "Cuerpo de la solicitud no válido." }, 400);
  }

  if (typeof body?.cutoffEnabled !== "boolean") {
    return json({ message: "cutoffEnabled debe ser true o false." }, 400);
  }

  try {
    const data = await updateTourBookingSettings(params.id, { cutoffEnabled: body.cutoffEnabled });
    return json(data);
  } catch (err) {
    return json({ message: err?.message ?? "No se ha podido guardar." }, err?.status ?? 500);
  }
}