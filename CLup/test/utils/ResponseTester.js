class ResponseTester {
    static compare(response, status, location) {
        return response.status == status && response.header.location == location;
    }

    static redirected(response) {
        return response.status >= 300 && response.status < 400
    }
}

module.exports = ResponseTester;