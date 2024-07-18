import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
    try {

        //retriving jwt token from cookie 
        const token = req.cookies.get('token');

        // checking the presence of token
        if (!token) {
            return NextResponse.json({ message: "You're already logged out" }, { status: 401 })
        };

        const response = NextResponse.json({ message: "Logged out successfully" });

        // removing the token from cookie by setting it to ''
        response.cookies.set('token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV !== 'development',
            expires: new Date(0),
            sameSite: 'strict',
            path: '/'
        });

        return response;

    } catch(error){
        console.error('Logout error:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
}
