var chakram = require("chakram"),
  expect = chakram.expect;

describe("GET on /wishes", function() {
  var apiResponse;

  before(function (){
    apiResponse = chakram.get("http://127.0.0.1:5000/wishes");
    return apiResponse;
  });

  it("should have status code 200", function () {
    return expect(apiResponse).to.have.status(200);
  });
  it("should have 'application/json' as Content-Type", function () {
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
  it("should have valid JSON in body", function () {
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
              "link": { "type": ["string","null"] },
              "name": { "type": ["string","null"] }
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
  // HTTP version
  // Status Message (Created, OK, etc)
