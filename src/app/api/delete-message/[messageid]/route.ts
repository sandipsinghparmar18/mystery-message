import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { User } from "next-auth";

export async function DELETE(
  request: NextRequest,
  context: any
): Promise<NextResponse> {
  const { messageid } = (await context.params) as { messageid: string };
  await dbConnect();
  const session = await getServerSession(authOptions);
  const _user: User = session?.user as User & { _id: string };
  if (!session || !_user) {
    return NextResponse.json(
      {
        success: false,
        message: "Not Authenticated",
      },
      { status: 401 }
    );
  }
  try {
    const updateResult = await UserModel.updateOne(
      { _id: _user._id },
      { $pull: { messages: { _id: messageid } } }
    );
    if (updateResult.modifiedCount == 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Message not found or already delete",
        },
        { status: 404 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Message Deleted Successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("An unexpected error occured during message deleted ", error);
    return NextResponse.json(
      {
        success: false,
        message: "Error in deleting messages",
      },
      {
        status: 500,
      }
    );
  }
}
