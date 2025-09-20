import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";
import { Message } from "@/model/User";

export async function POST(request: Request) {
  dbConnect();
  const { username, content } = await request.json();
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      return Response.json(
        {
          success: false,
          message: "User Not Found",
        },
        {
          status: 404,
        }
      );
    }
    //is user accepting the meesage
    if (!user.isAcceptingMessage) {
      return Response.json(
        {
          success: false,
          message: "User Not Accepting Message",
        },
        {
          status: 403,
        }
      );
    }
    const newMessage = { content, createdAt: new Date() };
    user.messages.push(newMessage as Message);
    await user.save();
    return Response.json(
      {
        success: true,
        message: "Message send Successfully",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error in Sending message to user ", error);
    return Response.json(
      {
        success: false,
        message: "Error in Sending message to user",
      },
      {
        status: 500,
      }
    );
  }
}
