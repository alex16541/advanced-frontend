export type FormattingStyle = 'underline' | 'bold' | 'italic' | 'strikeThrough';
export type EditorChildren = HTMLImageElement | HTMLHeadingElement | HTMLParagraphElement;
export type ParagraphChildren = HTMLSpanElement | Text;

export interface Position {
    paragraph: HTMLParagraphElement | null;
    span: HTMLSpanElement | null;
}
