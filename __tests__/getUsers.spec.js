describe("Get user by id function", () => {
    test("it should get one user from the collection", () => {
        const input = "69b64e0c23fb3a87d6ac2270";

        const output = {name, email, phone, role};

        expect(getUserById(input, "id")).toEqual(output);
    });
});