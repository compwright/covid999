require('dotenv').config()

const GSR = require('google-search-results-nodejs')

const client = new GSR.GoogleSearchResults(process.env.SERP_API_KEY)

function search (query) {
  return new Promise((resolve, reject) => {
    try {
      client.json(query, resolve)
    } catch (e) {
      reject(e)
    }
  })
}

async function main () {
  for (let i = 1; i < 1000; i++) {
    const data = await search({
      q: `"${i} new cases"`,
      hl: 'en',
      gl: 'us'
    })

    const result = {
      i,
      top_result: data.organic_results[0],
      other_results: data.organic_results.slice(1)
    }

    console.log(JSON.stringify(result))
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
