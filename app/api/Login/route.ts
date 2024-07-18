import { NextResponse } from "next/server";
import { SignJWT } from 'jose';

//Serect_key for jwt token
const SECRET_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function POST(req: Request) {

    // For testing
    // console.log('Request method:', req.method);
    // console.log('Request body:', req.body);

    try {
        const { email, password } = await req.json();

        //check if the email is password is missing or not
        if (!email || !password || !process.env.JWT_SECRET) {
            console.error('Email or Password not found !')
            return NextResponse.json({
                message: 'Server config error, variable missing'
            }, { status: 500 })
        }
        
        //check the credentials 
        if (email === process.env.LOGIN_EMAIL && password === process.env.LOGIN_PASSWORD) {

            //creating the token
            const token = await new SignJWT({ email })
                .setProtectedHeader({ alg: 'HS256' })
                .setExpirationTime('1h')
                .sign(SECRET_KEY);

            const response = NextResponse.json({ message: 'Logged in successfully' });

            //set JWT token in cookie
            response.cookies.set('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV !== 'development',
                maxAge: 3600,
                sameSite: 'strict',
                path: '/'
            });

            return response

        } else {
            return NextResponse.json({ message: 'Incorrect Password or Email' }, { status: 401 });
        }
    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}