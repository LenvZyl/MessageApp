var request = require('request')
describe('get messages', () => {
    it('must be 200', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('must be none empty list', (done) => {
        request.get('http://localhost:3000/messages', (err, res) => {
            expect(JSON.parse(res.body).length).toBeGreaterThan(0)
            done()
        })
    })
})

describe('get message from user', () => {
    it('must be 200', (done) => {
        request.get('http://localhost:3000/messages/Len', (err, res) => {
            expect(res.statusCode).toEqual(200)
            done()
        })
    })
    it('must be equal to Len', (done) => {
        request.get('http://localhost:3000/messages/Len', (err, res) => {
            expect(JSON.parse(res.body)[0].name).toEqual('Len')
            done()
        })
    })
})