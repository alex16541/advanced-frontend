export type Mods = Record<string, boolean | string | undefined>;

export function classNames(
    cls: string,
    mods: Mods = {},
    additionsl: Array<string | undefined> = [],
): string {
    return [
        cls,
        ...additionsl.filter(Boolean),
        ...Object.entries(mods)
            .filter(([clsName, isShow]) => Boolean(isShow))
            .map(([clsName]) => clsName),
    ].join(' ');
}
