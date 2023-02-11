type Mods = Record<string, boolean | string>

export function classNames(cls: string, mods: Mods, additionsl: string[]): string {
    return [
        cls,
        ...additionsl,
        ...Object.entries(mods)
            .filter(([clsName, isShow]) => Boolean(isShow))
            .map(([clsName]) => clsName),
    ].join(' ');
}