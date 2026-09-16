// app/api/call-id/route.ts
//
// Server-side proxy to Modal's /call_id polling endpoint.
// Same pattern as /api/transcribe: browser never sees the Modal URL or key.

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
  const callId = incomingForm.get("call_id");

  if (!callId) {
    return NextResponse.json({ error: "No call_id provided" }, { status: 400 });
  }

  const outgoingForm = new FormData();
  outgoingForm.append("call_id", callId);

  const modalResponse = await fetch(`${MODAL_URL}/call_id`, {
    method: "POST",
    headers: {
      "x-api-key": MODAL_API_KEY,
    },
    body: outgoingForm,
  });

  // Pass through Modal's 202 (still processing) as-is
  if (modalResponse.status === 202) {
    return NextResponse.json("", { status: 202 });
  }

  if (!modalResponse.ok) {
    return NextResponse.json(
      { error: `Modal error: ${modalResponse.status}` },
      { status: modalResponse.status },
    );
  }

  const data = await modalResponse.json();
  return NextResponse.json(data);
}
