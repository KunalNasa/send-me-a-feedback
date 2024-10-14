import connectDB from "@/lib/dbConnect";
import UserModel from "@/models/User.model";

export async function POST(request : Request){
    await connectDB();

    try {
        const {username, code} = await request.json();
        const decodedUsername = decodeURIComponent(username);
        const user = await UserModel.findOne({username : decodedUsername});
        if(!user){
            return Response.json({
                success : false,
                message : "Can not find user with this username"
            }, {status : 400})
        }
        const isCodeValid = user.verifyCode === code
        const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();
        
        if(isCodeValid && isCodeNotExpired){
            user.isVerified = true
            await user.save()
            return Response.json({
                success : true,
                message : "account verified successfully"
            }, {status : 200})
        }else{
            if(!isCodeNotExpired){
                return Response.json({
                    success : false,
                    message : "Verification code expired. Please signup again"
                }, {status : 400})
            }
            return Response.json({
                success : false,
                message : "Invalid code entered"
            }, {status : 400})
        }
    } catch (error) {
        console.error('Error verifying user', error);
    return Response.json(
      {
        success: false,
        message: 'Error verifying user',
      },
      { status: 500 }
    );
    }
}