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
  it("should have valid JSON as answer", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["wishes"],
      "properties": {
        "wishes": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "acquired": { "type": "boolean" },
              "id": { "type": "integer" },
              "link": { "type": "string" },
              "name": { "type": "string" }
            }
          }
        }
      }
    });
  });
});


  // TODO:
  // - incorrect request !
  // - wishes with and without trailing slash
  // shouldn't leak too much server info
