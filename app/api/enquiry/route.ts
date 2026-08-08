import { NextResponse } from "next/server";
import { validateEnquiry, deliverEnquiry } from "@/lib/enquiry";

/**
 * POST /api/enquiry
 *
 * A thin edge over lib/enquiry.ts. All configuration and provider logic lives
 * there, so swapping delivery providers never touches this file.
 *
 * 200  accepted (check `delivered` — false means no provider is configured
 *      or the submission was discarded as spam)
 * 400  validation failed, with per-field messages
 * 501  no delivery provider configured; the client offers an email fallback
 * 502  the configured provider failed
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, message: "Expected a JSON body." },
      { status: 400 }
    );
  }

  const { data, errors } = validateEnquiry(body);
  if (!data) {
    return NextResponse.json(
      { ok: false, message: "Please check the highlighted fields.", errors },
      { status: 400 }
    );
  }

  const result = await deliverEnquiry(data);

  if (result.ok) {
    return NextResponse.json(
      { ok: true, reference: result.reference, delivered: result.delivered },
      { status: 200 }
    );
  }

  return NextResponse.json(
    { ok: false, message: result.message, errors: result.errors },
    { status: result.status }
  );
}
