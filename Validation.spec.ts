///<reference path='./typings/jasmine/jasmine.d.ts'/>
///<reference path='./Validation.d.ts'/>

class Person {
    constructor(public Name: string){}
}
describe("Validation", () => {
    describe("Validator", () => {
        it("Should run the provided rules against the provided model", () => {
                var pers = new Person("Stuff");
                var PersonValidator = new Validator<Person>()
                    .For(pers)
                    .Property("Name")
                    .Rules((Rules) => {
                        Rules.NotEmpty();
                    });
                    expect(PersonValidator.Validate()).toBe(true);

        });
    });
});
