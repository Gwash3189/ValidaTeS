declare class Rule<T> {
    public property: string;
    public instance: T;
    public subValidator: SubValidator<T>;
    constructor(property: string, subValidator: SubValidator<T>, instance: T);
}
declare class SubValidator<T> {
    private NotEmptyFlag;
    private NotEqualFlag;
    private NotEqualValue;
    private MustBeCheck;
    private MustBeFlag;
    private NotEqualCheck(value);
    private NotEmptyCheck(value);
    public NotEmpty(): void;
    public NotEqual(notEqualValue: any): void;
    public MustBe(callback: (value: any) => boolean): void;
}
declare class Validator<T> {
    private Rule;
    private instance;
    private prop;
    private FlagString;
    private CheckString;
    private sub;
    constructor(value: any);
    public Property(value: any): Validator<T>;
    public Rules(callback: (subValidator: SubValidator<T>) => void): Validator<T>;
    public Validate(): boolean;
}
