import { MenuOption } from '@lexical/react/LexicalTypeaheadMenuPlugin';

import { ComponentPickerOptionType } from './useComponentPickerBaseOptions';

export class ComponentPickerOption extends MenuOption {
    // What shows up in the editor
    title: string;

    // Icon for display
    icon?: JSX.Element;

    // For extra searching.
    keywords: Array<string>;

    // TBD
    keyboardShortcut?: string;

    type: ComponentPickerOptionType;

    // What happens when you select this option?
    onSelect: (queryString: string) => void;

    constructor(
        title: string,
        options: {
            icon?: JSX.Element;
            keywords?: Array<string>;
            keyboardShortcut?: string;
            onSelect: (queryString: string) => void;
            type: ComponentPickerOptionType;
        },
    ) {
        super(title);
        this.title = title;
        this.keywords = options.keywords || [];
        this.icon = options.icon;
        this.keyboardShortcut = options.keyboardShortcut;
        this.onSelect = options.onSelect.bind(this);
        this.type = options.type;
    }
}
