xml2js = require("xml2js").parseString
request = require("restler")
async = require("async")
Wolfram = Wolfram = (key) ->
  @key = key
  return

Wolfram::ask = (term, callback) ->
  return callback("Please set Wolfram App Key", null)  unless @key
  data =
    input: term.query or ""
    assumption: term.assumption or ""
    translation: term.translation or false
    reinterpret: term.reinterpret or false
    primary: term.primary or true
    appid: @key

  @setQuery data
  query_url = "http://api.wolframalpha.com/v2/query"
  async.waterfall [
    (next) ->
      
      #Request query to Wolfram
      request.get(query_url,
        query: data
      ).on("complete", (results, response) ->
        next null, results  if response.statusCode is 200
        return
      ).on "error", (err, response) ->
        next err, null
        return

    (results, next) ->
      
      #Convert the XML to JSON
      xml2js results, (error, result) ->
        next null, result
        return

    (result, next) ->
      
      #Check for errors in result
      if result.queryresult.$.error is "true"
        err = result.queryresult.error[0].msg
        next err, null
      next null, result
  ], (err, result) ->
    return callback(err, null)  if err
    Wolfram::setResults result.queryresult
    callback null, result.queryresult

  return

Wolfram::setResults = (result) ->
  @query_results = result
  return

Wolfram::getResults = (callback) ->
  return callback(null, @query_results)  if @query_results
  callback "No Results Found. Check if you initialized Query", null

Wolfram::setQuery = (query) ->
  @query = query
  return

Wolfram::getQuery = (callback) ->
  return callback(null, @query)  if @query
  callback "No Query set.", null

Wolfram::getPod = (callback) ->
  return callback(null, @query_results.pod)  if @query_results
  callback "No Results Found. Check if you initialized Query", null

module.exports =
  wolfram: Wolfram
  init: (key) ->
    new Wolfram(key)