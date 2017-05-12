var chakram = require("chakram"),
    expect = chakram.expect;

describe("GET /wishes", function() {
    var apiResponse;
  
    before(function (){
      apiResponse = chakram.get("http://127.0.0.1:5000/wishes");
      return apiResponse;
    });

    it("should have success status code", function () {
      return expect(apiResponse).to.have.status(200);
    });
    it("should have correct 'Content-Type' header", function () {
      return expect(apiResponse).to.have.header("Content-Type",
        "application/json")
    });
    it("should have 'Server' header", function () {
      return expect(apiResponse).to.have.header("Server");
    });
    it("should have 'Date' header", function () {
      return expect(apiResponse).to.have.header("Date");
    });
    it("should have 'Content-Length' header", function () {
      return expect(apiResponse).to.have.header("Content-Length");
    });
    it("should have JSON", function () {
      return expect(apiResponse).to.have.schema({
        "required": ["wishes"]
      });
    });
    it("should have json bla", function () {
      return expect(apiResponse).to.have.json([
        "hello"
      ])
    });
    // TODO : shouldn't leak too much server info
});

// TODO:
// - incorrect request !
// - wishes with and without trailing slash
