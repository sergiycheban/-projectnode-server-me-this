const Response = function (response) {
    this.responseObject = response;
    return this;
}
Response.prototype.html = function (text) {
    this.responseObject.write(text);
    this.responseObject.end();
}

module.exports = Response;