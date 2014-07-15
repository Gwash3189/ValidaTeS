///<reference path='./typings/jasmine/jasmine.d.ts'/>
///<reference path='./Validation.d.ts'/>
var Person = (function () {
    function Person(Name) {
        this.Name = Name;
    }
    return Person;
})();
describe("Validation", function () {
    describe("Validator", function () {
        it("Should run the provided rules against the provided model", function () {
            var pers = new Person("Stuff");
            var PersonValidator = new Validator().For(pers).Property("Name").Rules(function (Rules) {
                Rules.NotEmpty();
            });
            expect(PersonValidator.Validate()).toBe(true);
        });
    });
});
