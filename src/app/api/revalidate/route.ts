import { revalidateTag } from 'next/cache';
import { NextRequest } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { tags } = await request.json();

    revalidateTag(tags);

    return Response.json({ success: true });
  } catch {
    return Response.json({ success: false });
  }
}
