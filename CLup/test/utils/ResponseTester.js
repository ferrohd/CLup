class ResponseTester {
    static compare(response, status, location) {
        return response.status == status && response.header.location == location;
    }
}

module.exports = ResponseTester;