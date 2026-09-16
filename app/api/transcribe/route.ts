// app/api/transcribe/route.ts
//
// Server-side proxy to the Modal transcription endpoint.
// The browser calls THIS route, never the Modal URL directly.
// The Modal API key and URL live only in server environment variables,
// so they never appear in client-side JS, network tab, or the repo.

import { NextRequest, NextResponse } from "next/server";

const MODAL_URL = process.env.MODAL_TRANSCRIBE_URL as string;
const MODAL_API_KEY = process.env.MODAL_API_KEY as string;

export async function POST(request: NextRequest) {
  if (!MODAL_URL || !MODAL_API_KEY) {
    return NextResponse.json(
      { error: "Server misconfigured: missing Modal env vars" },
      { status: 500 },
    );
  }

  const incomingForm = await request.formData();
  const file = incomingForm.get("file");

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const outgoingForm = new FormData();
  outgoingForm.append("file", file);

  const modalResponse = await fetch(`${MODAL_URL}/transcribe`, {
    method: "POST",
    headers: {
      "x-api-key": MODAL_API_KEY,
    },
    body: outgoingForm,
  });

  if (!modalResponse.ok) {
    return NextResponse.json(
      { error: `Modal error: ${modalResponse.status}` },
      { status: modalResponse.status },
    );
  }

  const data = await modalResponse.json();
  return NextResponse.json(data);
}
