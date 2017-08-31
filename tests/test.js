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
      "wishes": {
        "type": "array",
        "items": {
          "type": "object",
          "properties": {
            "acquired": { "type": "boolean" },
            "id": { "type": "integer" },
            "link": { "type": ["string", "null"] },
            "name": { "type": ["string", "null"] }
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

describe("POST on /wishes without name or link", function() {
  var apiResponse;

  before(function (){
    newWish = {};
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish);
    return apiResponse;
  });

  it("should have status code 422", function () {
    return expect(apiResponse).to.have.status(422);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});

describe("POST on /wishes without 'application/json' Content-Type", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "New Keyboard",
      link: "http://www.thekeyboardwaffleiron.com/"
    };
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish,
      { headers: {"Content-Type": "invalid/contenttype"}}
    );
    return apiResponse;
  });

  it("should have status code 400", function () {
    return expect(apiResponse).to.have.status(400);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    //console.log(apiResponse)
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});

describe("POST on /wishes with only a string in JSON", function() {
  var apiResponse;

  before(function (){
    newWish = 'This is valid JSON since it is only a string, but is not a valid data format for this POST';
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish
    );
    return apiResponse;
  });

  it("should have status code 422", function () {
    return expect(apiResponse).to.have.status(422);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});


describe("POST on /wishes with invalid JSON", function() {
  var apiResponse;

  before(function (){
    // Note the missing closing curly bracket and the fact that it's a string
    newWish = '{"name": "New Keyboard", "link": "http://www.thekeyboardwaffleiron.com/"';
    apiResponse = chakram.post(
      "http://127.0.0.1:5000/wishes",
      newWish,
      param = {
        "json": false,
        "json_response": true,
        "headers": {"Content-Type": "application/json"}
      }
    ).then(function(value) {
      value.body = JSON.parse(value.body);
      return value;
    }, function(reason) {
      return reason;
    });
    return apiResponse;
  });

  it("should have status code 400", function () {
    return expect(apiResponse).to.have.status(400);
  });
  it("should have 'application/json' as Content-Type", function () {
    return expect(apiResponse).to.have.header("Content-Type",
      "application/json")
  });
  it("should have error declaration as JSON in body", function () {
    return expect(apiResponse).to.have.schema({
      "type": "object",
      "required": ["error"],
      "properties": {
        "error": { "type": "string" }
      }
    });
  });
});

// TODO this test should not depend on POST
describe("GET of newly added wish", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "19959ca5-ad72-487a-9e6a-f4ac8cf06a9b"
    };
    // Add a new wish
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish).
      then(function(value) {
        // ... get its ID from POST response
        new_id = value.body['id'];
        // ... then try to GET it by its ID
        new_get = chakram.get("http://127.0.0.1:5000/wishes/" + new_id)
        return new_get;
    }, function(reason) {
      return reason;
    });
    return apiResponse;
  });

  it("should have status code 200", function () {
    return expect(apiResponse).to.have.status(200);
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
        "link":     { "type": ["string", "null"] },
        "name":     { "type": ["string", "null"] }
      }
    });
  });
  it("should have correct name", function () {
    return expect(apiResponse).to.have.json("name", "19959ca5-ad72-487a-9e6a-f4ac8cf06a9b");
  });
});

describe("DELETE of newly added wish", function() {
  var apiResponse;

  before(function (){
    newWish = {
      name: "34740ac6-e396-443f-877d-b8252092ca11"
    };
    // Add a new wish
    apiResponse = chakram.post("http://127.0.0.1:5000/wishes", newWish).
      then(function(value) {
        // ... get its ID from POST response
        new_id = value.body['id'];
        // ... then try to GET it by its ID
        new_delete = chakram.delete("http://127.0.0.1:5000/wishes/" + new_id)
        return new_delete;
    }, function(reason) {
      return reason;
    });
    return apiResponse;
  });

  it("should have status code 200", function () {
    return expect(apiResponse).to.have.status(200);
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
      "required": ["acquired", "id", "link", "name", "deleted"],
      "properties": {
        "acquired": { "type": "boolean" },
        "id":       { "type": "integer" },
        "link":     { "type": ["string", "null"] },
        "name":     { "type": ["string", "null"] },
        "deleted":  { "type": "boolean" }
      }
    });
  });
  it("should have correct name", function () {
    return expect(apiResponse).to.have.json("name", "34740ac6-e396-443f-877d-b8252092ca11");
  });
  it("should be marked as deleted", function () {
    return expect(apiResponse).to.have.json("deleted", true);
  });
});


  // TODO:
  // - wishes with and without trailing slash
  // shouldn't leak too much server info
  // HTTP version
  // Status Message (Created, OK, etc)
  // Wrong Accept header
  // No content-type
