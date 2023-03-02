const EleventyFetch = require("@11ty/eleventy-fetch");

module.exports = async function() {

    console.log("***getting data from api");
    let url = "http://localhost/members";

    return EleventyFetch(url, {
        duration: '1m', 
        type: 'json'
    });


}