export function GET(

    req:Request,
    {params}: {params: {userId: string}}
){
    return Response.json({
        "data": {
            "id": params.userId,
            "name": "John Doe",
            "email": ""
        }

    })
}