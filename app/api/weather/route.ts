import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {

  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;

    if (!apiKey) {
      return new Response("API key not found", { status: 500 });
    }

    const searchParams = req.nextUrl.searchParams;
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");

    if (!lat || !lon) {
      return new Response("Missing or invalid latitude/longitude parameters", {
        status: 400,
      });
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    const { data } = await axios.get(url);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching forecast data", error);

    if (axios.isAxiosError(error) && error.response) {
      return new Response(`Error: ${error.response.statusText}`, {
        status: error.response.status,
      });
    }
    //return NextResponse.json({ message: "Weather API is working" });

    return new Response("An unexpected error occurred", { status: 500 });
  }
}
