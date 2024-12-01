import { createHMAC } from 'refloat-nextjs-integration/app/utils/refloat';
import { NextResponse } from 'next/server';

const REFLOAT_CLIENT_SECRET = process.env.REFLOAT_CLIENT_SECRET;

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!REFLOAT_CLIENT_SECRET) {
    return NextResponse.json({
      error: 'Unable to compute user hash (`REFLOAT_CLIENT_SECRET` undefined).'
    }, { status: 500 });
  }

  try {
    const hmac = await createHMAC(userId, REFLOAT_CLIENT_SECRET);
    return NextResponse.json({ hmac });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate HMAC' }, { status: 500 });
  }
}
