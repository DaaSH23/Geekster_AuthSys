import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

//Serect_key for jwt token
const SECERT_KEY = new TextEncoder().encode(process.env.JWT_SECRET);

export async function middleware(req: NextRequest) {
    //retriving jwt token from cookie 
    const tokenCookie = req.cookies.get('token');

    //for testing
    // console.log('Middleware invoked');
    // console.log('Token Cookie:', tokenCookie);

    // checking the presence of token
    if (!tokenCookie) {
        return NextResponse.redirect(new URL('/?auth=N', req.url));
    }

    const token = tokenCookie.value;

    // verify the token
    try {
        await jwtVerify(token, SECERT_KEY);
        console.log('Token is valid, proceeding to next response');
        return NextResponse.next();
    } catch (error) {
        console.error('Invalid token:', error);
        return NextResponse.redirect(new URL('/?auth=N', req.url)); //sending query parameter for unauthorised access
    }
}

export const config = {
    matcher: ['/Dashboard'], // Apply the middleware to the dashboard route and its sub-routes
};


