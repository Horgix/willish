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

describe("Basic valid POST on /wishes", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "New Keyboard",
      link: "http://www.thekeyboardwaffleiron.com/"
    };
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish);
    return apiResponse;
  });

  it("should have status code 201", function () {
    return expect(apiResponse).to.have.status(201);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have a 'Server' header", function () {
    return expect(apiResponse).to.have.header("Server");
  });
  it("should have a 'Date' header", function () {
    return expect(apiResponse).to.have.header("Date");
  });
  it("should have a 'Content-Length' header", function () {
    return expect(apiResponse).to.have.header("Content-Length");
  });
  it("should have valid JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["acquired", "id", "link", "name"],
      "properties": {
        "acquired": { "type": "boolean" },
        "id":       { "type": "integer" },
        "link":     { "type": ["string"] },
        "name":     { "type": ["string"] }
      }
    });
  });
  it("should have correct name", function () {
    return expect(apiResponse).to.have.json("name", "New Keyboard");
  });
  it("should have correct link", function () {
    return expect(apiResponse).to.have.json("link", "http://www.thekeyboardwaffleiron.com/");
  });
  it("should have a non-acquired status", function () {
    return expect(apiResponse).to.have.json("acquired", false);
  });
});


  // TODO:
  // - incorrect request !
  // - wishes with and without trailing slash
  // shouldn't leak too much server info
  // HTTP version
  // Status Message (Created, OK, etc)
  // Wrong Accept header
