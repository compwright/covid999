const es = require('event-stream')

console.log('<ol>')

process.stdin
  .pipe(es.split())
  .pipe(es.map((line, done) => {
    try {
      const data = JSON.parse(line)
      console.log(
        `<h2>${data.i}. <a href="${data.top_result.link}">${data.top_result.title}</a></h2><p>${data.top_result.snippet}</p>`
      )
    } catch {
      // ignore
    } finally {
      done()
    }
  }))
  .pipe(process.stdout)
