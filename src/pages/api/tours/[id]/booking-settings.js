import { getTourBookingSettings } from "@/lib/api.js";

export const prerender = false;

export async function GET({ params }) {
  try {
    const settings = await getTourBookingSettings(params.id);
    return new Response(JSON.stringify(settings), {
      status: 200,
      headers: { "Content-Type": "application/json", "Cache-Control": "no-store" }
    });
  } catch (err) {
    console.error("Failed to load tour booking settings", err);
    return new Response(
      JSON.stringify({ message: "No se han podido cargar los ajustes de reserva." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}