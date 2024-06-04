import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({
        hello: 'word'
    });
}

export async function POST(requst) {
    const data = await requst.json();
    return NextResponse.json({ data, });
}