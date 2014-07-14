
class Rule<T> {
	property: string;
	instance: T;
	subValidator: SubValidator<T>
	constructor(property: string, subValidator: SubValidator<T>, instance: T) {
		this.property = property;
		this.subValidator = subValidator;
		this.instance = instance;
	}
}

class SubValidator<T> {
	private NotEmptyFlag: boolean;
	private NotEqualFlag: boolean;
	private NotEqualValue: any;
	private MustBeCheck: (value: any) => boolean
	private MustBeFlag: boolean;
	private NotEqualCheck(value) {
		if(value === this.NotEqualValue){
			return false;
		}
		return true;
	}
	private NotEmptyCheck(value:string) {
		if (value === "") {
			return false;
		}
		return true;
	}
	public NotEmpty() {
		this.NotEmptyFlag = true;
	}
	public NotEqual(notEqualValue){
		this.NotEqualFlag = true;
		this.NotEqualValue = notEqualValue;
	}
	public MustBe(callback: (value: any) => boolean){
		this.MustBeCheck = callback;
		this.MustBeFlag = true;
	}
}
class Validator<T>{
	private RuleArray = Array<Rule<T>>();
	private instance: any;
	private prop: string;
	private toValidate;
	private sub = new SubValidator();
	For(value:any) {
		if(typeof value === "object"){
			this.instance = value;
		} else {
			this.instance = value();
		}
		return this;
	}
	Property(value:any) {
		if( typeof value === "string"){
			this.prop = value;
		} else {
			this.prop = value();
		}
		return this;
	}
	Rules(callback: (subValidator: SubValidator<T>) => void) {
		callback.call(this.sub, this.sub);
		this.RuleArray.push(new Rule(this.prop, this.sub, this.instance));
		return this;
	}
	Validate() {
		var results = new Array<boolean>();
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
	}

}

class Person {
	constructor(public Name: string) {}
}

	
	var pers = new Person("debuName");
	pers.Name = "Vlad";
	var BeValidName = function(name) {
		return name === "Vlad";
	}
	var PersonValidator = new Validator<Person>()
		.For(pers)
		.Property("Name")
		.Rules((Rules) => {
			Rules.NotEmpty();
			Rules.NotEqual("Joe");
			Rules.MustBe(BeValidName);
		});
		console.log(PersonValidator.Validate());
		