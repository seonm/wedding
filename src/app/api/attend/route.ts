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

const Attend = mongoose.models.Attend || mongoose.model<AttendDocument>('Attend', AttendSchema);

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
    return NextResponse.json(newAttend.toJSON(), { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
  }
}
