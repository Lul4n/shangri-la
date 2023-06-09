import { ToStringHelper } from './ToStringHelper';

class Test {
    public toString(): string {
        return ToStringHelper.toStringHelper(this).add('123', '456').toString();
    }
}

describe('ToStringHelper', () => {
    describe('created from null', () => {
        const underTest = ToStringHelper.toStringHelper(null);
        test('with no properties results in {}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('{}');
        });
        test('with property a=123 results in {a:123}', () => {
            underTest.reset().add('a', 123);
            expect(underTest.toString()).toBe('{a:123}');
        });
        test("with property a='123' results in {a:123}", () => {
            underTest.reset().add('a', '123');
            expect(underTest.toString()).toBe('{a:123}');
        });
        test('with property b=true results in {b:true}', () => {
            underTest.reset().add('b', true);
            expect(underTest.toString()).toBe('{b:true}');
        });
        test('with property c=null results in {c:null}', () => {
            underTest.reset().add('c', null);
            expect(underTest.toString()).toBe('{c:null}');
        });
        test('with property c=undefined results in {c:null}', () => {
            underTest.reset().add('c', undefined);
            expect(underTest.toString()).toBe('{c:null}');
        });
        test('with value 123 results in {123}', () => {
            underTest.reset().value(123);
            expect(underTest.toString()).toBe('{123}');
        });
        test('with values 123,123 results in {123,123}', () => {
            underTest.reset().value(123).value(123);
            expect(underTest.toString()).toBe('{123,123}');
        });
        test("with value '123' results in {123}", () => {
            underTest.reset().value('123');
            expect(underTest.toString()).toBe('{123}');
        });
        test("with values '123' and 123 results in {123,123}", () => {
            underTest.reset().value('123').value(123);
            expect(underTest.toString()).toBe('{123,123}');
        });
        test('with value true results in {true}', () => {
            underTest.reset().value(true);
            expect(underTest.toString()).toBe('{true}');
        });
        test('with value false results in {false}', () => {
            underTest.reset().value(false);
            expect(underTest.toString()).toBe('{false}');
        });
        test('with value {} results in {[object Object]}', () => {
            underTest.reset().value({});
            expect(underTest.toString()).toBe('{[object Object]}');
        });
        test('with value new Test() results in {Test{123:456}}', () => {
            underTest.reset().value(new Test());
            expect(underTest.toString()).toBe('{Test{123:456}}');
        });
        test("with values false and true and properties a=123 and b='abc' results in {a:123,b:abc,false,true}", () => {
            underTest.reset().value(false).value(true).add('a', 123).add('b', 'abc');
            expect(underTest.toString()).toBe('{a:123,b:abc,false,true}');
        });
    });
    describe("created from 'abc'", () => {
        const underTest = ToStringHelper.toStringHelper('abc');
        test('with no properties results in abc{}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('abc{}');
        });
        test('with property a=123 results in abc{a:123}', () => {
            underTest.reset().add('a', 123);
            expect(underTest.toString()).toBe('abc{a:123}');
        });
        test('with values false results in abc{false}', () => {
            underTest.reset().value(false);
            expect(underTest.toString()).toBe('abc{false}');
        });
    });
    describe('created from 123', () => {
        const underTest = ToStringHelper.toStringHelper(123);
        test('with no properties results in 123{}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('123{}');
        });
    });
    describe('created from {}', () => {
        const underTest = ToStringHelper.toStringHelper({});
        test('with no properties results in Object{}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('Object{}');
        });
    });
    describe('created from function(){}', () => {
        const underTest = ToStringHelper.toStringHelper(function () {
            console.log('something');
        });
        test('with no properties results in {}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('{}');
        });
    });
    describe('created from function abc(){}', () => {
        const underTest = ToStringHelper.toStringHelper(function abc() {
            console.log('something');
        });
        test('with no properties results in abc{}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('abc{}');
        });
    });
    describe('created from class XYZ{}', () => {
        // eslint-disable-next-line @typescript-eslint/no-extraneous-class
        const underTest = ToStringHelper.toStringHelper(class XYZ {});
        test('with no properties results in XYZ{}', () => {
            underTest.reset();
            expect(underTest.toString()).toBe('XYZ{}');
        });
        test('with object property that uses ToStringHelper results in XYZ{abc:Test{123:456}}', () => {
            underTest.reset().add('abc', new Test());
            expect(underTest.toString()).toBe('XYZ{abc:Test{123:456}}');
        });
    });
    describe('omnitNullValues', () => {
        test('supresses null values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().value(null);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses null properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().add('a', null);
            expect(underTest.toString()).toBe('{}');
        });
        test('does not suppress false values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().value(false);
            expect(underTest.toString()).toBe('{false}');
        });
        test('does not suppress false properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().add('a', false);
            expect(underTest.toString()).toBe('{a:false}');
        });
        test('does not suppress zero values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().value(0);
            expect(underTest.toString()).toBe('{0}');
        });
        test('does not suppress zero properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().add('a', 0);
            expect(underTest.toString()).toBe('{a:0}');
        });
        test('does not suppress empty string values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().value('');
            expect(underTest.toString()).toBe('{}');
        });
        test('does not suppress empty string properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitNullValues().add('a', '');
            expect(underTest.toString()).toBe('{a:}');
        });
    });
    describe('omnitFalsish', () => {
        test('supresses null values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().value(null);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses null properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().add('a', null);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses false values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().value(false);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses false properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().add('a', false);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses zero values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().value(0);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses zero properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().add('a', 0);
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses empty string values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().value('');
            expect(underTest.toString()).toBe('{}');
        });
        test('supresses empty string properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().add('a', '');
            expect(underTest.toString()).toBe('{}');
        });

        test('does not supress 1 as value', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().value(1);
            expect(underTest.toString()).toBe('{1}');
        });
        test('does not supress 1 as property', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().add('a', 1);
            expect(underTest.toString()).toBe('{a:1}');
        });
        test('does not supress blank string values', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().value(' ');
            expect(underTest.toString()).toBe('{ }');
        });
        test('does not supress blank string properties', () => {
            const underTest = ToStringHelper.toStringHelper().omnitFalsishValues().add('a', ' ');
            expect(underTest.toString()).toBe('{a: }');
        });
    });
});
