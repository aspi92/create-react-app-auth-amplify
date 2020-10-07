exports.handler = async(event) => {
    // TODO implement
    const response = {
        statusCode: 200,
        "headers": {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Origin": "*",
        },
        //  Uncomment below to enable CORS requests
        //  headers: {
        //      "Access-Control-Allow-Origin": "*"
        //  }, 
        body: JSON.stringify('Hello from Lambda!'),
    };
    return response;
};
