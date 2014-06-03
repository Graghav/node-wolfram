wolfram = require("../")
assert = require("assert")
describe "node-wolfram", ->
  it "must throw error when app id is not set", ->
    Wolfram = wolfram.init()
    query = query: "differentiate x^2"
    Wolfram.ask query, (err, result) ->
      assert.ok err?, "No Key Set"


  it "must throw error if app id is invalid", ->
    @timeout 10000
    Wolfram = wolfram.init("Invalid Key")
    query = query: "differentiate x^2"
    Wolfram.ask query, (err, result) ->
      assert.ok err?, "Returns Invalid Key Error"


  it "must return the result of differentiate x^2", ->
    @timeout 10000
    Wolfram = wolfram.init(process.env.APPID)
    query = query: "differentiate x^2"
    Wolfram.ask query, (err, result) ->
      assert.ok not err?, "No Error"
      assert.ok result?, "Results must be present"
      assert.equal "d/dx(x^2) = 2 x", result.pod[0].subpod[0].plaintext[0]


  return
