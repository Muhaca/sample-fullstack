import usersList from '@/app/api/users/data.json';
import { NextRequest, NextResponse } from "next/server";

export async function GET(request = new NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    let keys = '';
    for (const name of searchParams.keys()) {
        keys = name;
    }
    const values = {
        'id': searchParams.get('id'),
        'gender': searchParams.get('gender'),
        'first_name': searchParams.get('first_name'),
        'last_name': searchParams.get('last_name'),
    };

    const data = keys ? usersList.filter(el => values[keys] === el[keys].toString()) : usersList;
    return NextResponse.json({ data });
}

export async function POST(requst) {
    const data = await requst.json();
    return NextResponse.json({ data });
}



