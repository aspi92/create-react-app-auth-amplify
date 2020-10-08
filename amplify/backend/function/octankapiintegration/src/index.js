exports.handler = async(event) => {
    const filter = event.queryStringParameters['filter'] || '';
    
    const bookingsStub = [
        {
            bookingId: "booking123",
            city: 'New York',
            paymentStatus: 'Done',
        },
        {
            bookingId: "booking741",
            city: 'New York',
            paymentStatus: 'Not done',
        },
        {
            bookingId: "booking874",
            city: 'Chicago',
            paymentStatus: 'Done',
        },
        {
            bookingId: "booking9881",
            city: 'Chicago',
            paymentStatus: 'Done',
        },
        {
            bookingId: "booking1223",
            city: 'Chicago',
            paymentStatus: 'Not done',
        },
        {
            bookingId: "booking914",
            city: 'Chicago',
            paymentStatus: 'Done',
        },
        {
            bookingId: "booking997",
            city: 'San Francisco',
            paymentStatus: 'Failed',
        },
        {
            bookingId: "booking0897",
            city: 'Seattle',
            paymentStatus: 'Done',
        },
        {
            bookingId: "booking98126",
            city: 'Dallas',
            paymentStatus: 'Not done',
        },
        {
            bookingId: "booking572",
            city: 'Dallas',
            paymentStatus: 'Failed',
        },
    ];
    
    const filteredResponse = filter
        ? bookingsStub.filter(item => item.city.toLowerCase() === filter.toLowerCase())
        : bookingsStub;

    const response = {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Credentials": true,
            "Access-Control-Allow-Headers": "Content-Type",
            "Access-Control-Allow-Methods": "OPTIONS,POST,GET",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(filteredResponse),
    };
    return response;
};
