const httpClient = require("supertest");
const app = require("../../src/app");
const connection = require("../../src/connection");

describe("Book inventory", function() {
    it("allows to stock up the items", async function() {
        const db = await connection();
        const request = httpClient(app(db));

        for(let i = 100 ; i < 200; ++i) {

            const createResult = await request
                .post('/book')
                .send({
                    title: "JavaScript in Action",
                    authors: ["James Smith", "Kate Donovan"],
                    isbn: `0123456${i}`,
                    description: "The ultimate JS book!"
                })
                .set('Content-Type', 'application/json')
                .expect(302);
        }

        const createResult = await request
            .post('/book')
            .send({
                title: "JavaScript in Action",
                authors: ["James Smith", "Kate Donovan"],
                isbn: "0123456789",
                description: "The ultimate JS book!"
            })
            .set('Content-Type', 'application/json')
            .expect(302);

        await request.get(createResult.header.location)
            .set("Accept", "application/json")
            .expect(200, {
            title: "JavaScript in Action",
            slug: "javascript-in-action",
            authors: ["James Smith", "Kate Donovan"],
            isbn: "0123456789",
            description: "The ultimate JS book!"
        });

        await request.delete(createResult.header.location).expect(204);

        await request.get(createResult.header.location).expect(404);
    });
});

