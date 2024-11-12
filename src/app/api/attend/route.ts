import { NextResponse } from 'next/server';
import mongoose, { Schema, Document } from 'mongoose';
import { connectDB } from '../../../../lib/mongodb';

interface AttendDocument extends Document {
  name: string;
  tel: string;
  boarding: string;
  direction: string;
}

const AttendSchema = new Schema<AttendDocument>({
  name: String,
  tel: String,
  boarding: String,
  direction: String,
});

const Attend =
  mongoose.models.Attend ||
  mongoose.model<AttendDocument>('Attend', AttendSchema);

export async function POST(req: Request) {
  await connectDB();

  try {
    const { name, tel, boarding, direction } = await req.json();

    const newAttend = await Attend.create({
      name,
      tel,
      boarding,
      direction,
    });

    await newAttend.save();

    const response = NextResponse.json(
      { message: 'User added successfully' },
      { status: 201 }
    );

    response.headers.set('Access-Control-Allow-Origin', '*'); // 모든 도메인 허용
    response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS'); // 허용된 메서드
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type'); // 허용된 헤더

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch users${error}` },
      { status: 500 }
    );
  }
}

export async function OPTIONS() {
  const response = NextResponse.json({}, { status: 200 });
  response.headers.set('Access-Control-Allow-Origin', '*');
  response.headers.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');

  return response;
}
