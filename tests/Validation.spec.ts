///<reference path='reference.ts'/>

class Person {
    constructor(public Name:string) {
    }
}

describe("Validation", () => {
    describe("Validator", () => {
        it("Should run the provided rules against the provided model", () => {
            var pers = new Person("Stuff");
            var PersonValidator = new Validator<Person>(pers)
                .Property("Name")
                .Rules((Rules) => {
                    Rules.NotEmpty();
                });
            expect(PersonValidator.Validate()).toBe(true);
        });
    });
});
