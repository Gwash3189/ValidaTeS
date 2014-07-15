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
        this.FlagString = "Flag";
        this.CheckString = "Check";
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
        this.Rule = new Rule(this.prop, this.sub, this.instance);
        return this;
    };
    Validator.prototype.Validate = function () {
        var _this = this;
        var results = [];
        Object.keys(this.Rule).map(function (propName) {
            if (propName.indexOf(_this.FlagString) > -1 && _this.Rule.subValidator[propName] === true) {
                var check = propName.replace(_this.FlagString, _this.CheckString);
                results.push(_this.Rule.subValidator[check](_this.Rule.instance[_this.Rule.property]));
            }
        });
        return results.indexOf(false) === -1;
    };
    return Validator;
})();
