import { double } from "../src/maths/double"

describe ( "Test double ", () => {

    test("Check double is working", () => {
        const db = double(2);

        expect (db).toBe(4)
    })

})