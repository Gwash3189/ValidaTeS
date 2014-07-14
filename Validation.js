var Rule = (function () {
    function Rule(property, subValidator, instance) {
        this.property = property;
        this.subValidator = subValidator;
        this.instance = instance;
    }
    return Rule;
})();

var SubValidator = (function () {
    function SubValidator() {
    }
    SubValidator.prototype.NotEqualCheck = function (value) {
        if (value === this.NotEqualValue) {
            return false;
        }
        return true;
    };
    SubValidator.prototype.NotEmptyCheck = function (value) {
        if (value === "") {
            return false;
        }
        return true;
    };
    SubValidator.prototype.NotEmpty = function () {
        this.NotEmptyFlag = true;
    };
    SubValidator.prototype.NotEqual = function (notEqualValue) {
        this.NotEqualFlag = true;
        this.NotEqualValue = notEqualValue;
    };
    SubValidator.prototype.MustBe = function (callback) {
        this.MustBeCheck = callback;
        this.MustBeFlag = true;
    };
    return SubValidator;
})();
var Validator = (function () {
    function Validator() {
        this.RuleArray = Array();
        this.sub = new SubValidator();
    }
    Validator.prototype.For = function (value) {
        if (typeof value === "object") {
            this.instance = value;
        } else {
            this.instance = value();
        }
        return this;
    };
    Validator.prototype.Property = function (value) {
        if (typeof value === "string") {
            this.prop = value;
        } else {
            this.prop = value();
        }
        return this;
    };
    Validator.prototype.Rules = function (callback) {
        callback.call(this.sub, this.sub);
        this.RuleArray.push(new Rule(this.prop, this.sub, this.instance));
        return this;
    };
    Validator.prototype.Validate = function () {
        var results = new Array();
        for (var i = 0; i < this.RuleArray.length; i++) {
            for (var key in this.RuleArray[i]) {
                if (this.RuleArray[i].hasOwnProperty(key) && key === "subValidator") {
                    for (var sub in this.RuleArray[i][key]) {
                        if (sub.indexOf("Flag") > -1 && this.RuleArray[i][key][sub] === true) {
                            var check = sub.replace("Flag", "Check");
                            results.push(this.RuleArray[i][key][check](this.RuleArray[i].instance[this.RuleArray[i].property]));
                        }
                    }
                }
            }
            return results.indexOf(false) === -1;
        }
    };
    return Validator;
})();

var Person = (function () {
    function Person(Name) {
        this.Name = Name;
    }
    return Person;
})();
    var pers = new Person("Name");
    pers.Name = "Vlad";
    var BeValidName = function (name) {
        return name === "Vlad";
    };
    var PersonValidator = new Validator().For(pers).Property("Name").Rules(function (Rules) {
        Rules.NotEmpty();
        Rules.NotEqual("Joe");
        Rules.MustBe(BeValidName);
    });
    console.log(PersonValidator.Validate());

