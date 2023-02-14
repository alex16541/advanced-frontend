import { classNames } from './classNames';

describe('classNames', () => {
    test('with only first param', () => {
        expect(classNames('class1')).toBe('class1');
    });

    test('with additional class', () => {
        expect(classNames('class1', {}, ['class2', 'class3']))
            .toBe('class1 class2 class3');
    });

    test('with mods', () => {
        expect(classNames('class1', { hovered: true, visible: true }, ['class2', 'class3']))
            .toBe('class1 class2 class3 hovered visible');
    });

    test('with mods false', () => {
        expect(classNames('class1', { hovered: true, visible: false }, ['class2', 'class3']))
            .toBe('class1 class2 class3 hovered');
    });

    test('with mods undefined', () => {
        expect(classNames('class1', { hovered: true, visible: undefined }, ['class2', 'class3']))
            .toBe('class1 class2 class3 hovered');
    });
});
