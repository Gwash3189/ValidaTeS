
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
	private Rule: Rule<T>;
	private instance: any;
	private prop: string;
	private toValidate;
	private FlagString = "Flag";
	private CheckString = "Check";
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
		this.Rule = new Rule<T>(this.prop, this.sub, this.instance);
		return this;
	}
	Validate() {
		var results = [];
		Object.keys(this.Rule).map((propName) => {
			if (propName.indexOf(this.FlagString) > -1 && this.Rule.subValidator[propName] === true) {
				var check = propName.replace(this.FlagString, this.CheckString);
				results.push(this.Rule.subValidator[check](this.Rule.instance[this.Rule.property]));
			}
		});
		return results.indexOf(false) === -1;
	}
}
