import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { $wrapNodeInElement, mergeRegister } from '@lexical/utils';
import {
    $createParagraphNode,
    $createRangeSelection,
    $getSelection,
    $insertNodes,
    $isNodeSelection,
    $isRootOrShadowRoot,
    $setSelection,
    COMMAND_PRIORITY_EDITOR,
    COMMAND_PRIORITY_HIGH,
    COMMAND_PRIORITY_LOW,
    createCommand,
    DRAGOVER_COMMAND,
    DRAGSTART_COMMAND,
    DROP_COMMAND,
    LexicalCommand,
    LexicalEditor,
} from 'lexical';
import { useEffect, useRef, useState } from 'react';

import FileIcon from '@/shared/assets/svg/awesome_icons/file-image-solid.svg';
import LinkIcon from '@/shared/assets/svg/awesome_icons/link-solid.svg';
import { CAN_USE_DOM } from '@/shared/consts/dom';
import { Button } from '@/shared/ui/redesigned/Button';
import { Icon } from '@/shared/ui/redesigned/Icon';
import { Input } from '@/shared/ui/redesigned/Input';

import './ImagesPlugin.scss';

import { $createImageNode, $isImageNode, ImageNode, ImagePayload } from './ImageNode';

export type InsertImagePayload = Readonly<ImagePayload>;

const getDOMSelection = (targetWindow: Window | null): Selection | null =>
    CAN_USE_DOM ? (targetWindow || window).getSelection() : null;

export const INSERT_IMAGE_COMMAND: LexicalCommand<InsertImagePayload> = createCommand('INSERT_IMAGE_COMMAND');

export function InsertImageUriDialogBody({ onClick }: { onClick: (payload: InsertImagePayload) => void }) {
    const [src, setSrc] = useState('');
    const [altText, setAltText] = useState('');

    const isDisabled = src === '';

    return (
        <>
            <Input
                data-test-id="image-modal-url-input"
                label="URL*"
                placeholder="i.e. https://website.com/image.png"
                value={src}
                fullWidth
                onChange={setSrc}
            />
            <Input
                data-test-id="image-modal-alt-text-input"
                label="Alt text"
                placeholder="Alt text for the image"
                value={altText}
                fullWidth
                onChange={setAltText}
            />
            <Button
                data-test-id="image-modal-confirm-btn"
                disabled={isDisabled}
                onClick={() => onClick({ altText, src })}
            >
                Confirm
            </Button>
        </>
    );
}

export function InsertImageUploadedDialogBody({
    onClick,
}: {
    onClick: (payload: InsertImagePayload) => void;
}) {
    const [src, setSrc] = useState('');
    const [altText, setAltText] = useState('');

    const isDisabled = src === '';

    const loadImage = (files: FileList | null) => {
        const reader = new FileReader();

        reader.onload = () => {
            if (typeof reader.result === 'string') {
                setSrc(reader.result);
            }
            return '';
        };
        if (files !== null) {
            reader.readAsDataURL(files[0]);
        }
    };

    return (
        <>
            <Input
                accept="image/*"
                data-test-id="image-modal-file-upload"
                placeholder="Image Upload"
                type="file"
                fullWidth
                onChange={loadImage}
            />
            <Input
                data-test-id="image-modal-alt-text-input"
                label="Alt text"
                placeholder="Descriptive alternative text"
                value={altText}
                fullWidth
                onChange={setAltText}
            />
            <Button
                data-test-id="image-modal-file-upload-btn"
                disabled={isDisabled}
                onClick={() => onClick({ altText, src })}
            >
                Confirm
            </Button>
        </>
    );
}

export function InsertImageDialog({
    activeEditor,
    onClose,
}: {
    activeEditor: LexicalEditor;
    onClose: () => void;
}): JSX.Element {
    const [mode, setMode] = useState<null | 'url' | 'file'>(null);
    const hasModifier = useRef(false);

    useEffect(() => {
        hasModifier.current = false;
        const handler = (e: KeyboardEvent) => {
            hasModifier.current = e.altKey;
        };
        document.addEventListener('keydown', handler);
        return () => {
            document.removeEventListener('keydown', handler);
        };
    }, [activeEditor]);

    const onClick = (payload: InsertImagePayload) => {
        activeEditor.dispatchCommand(INSERT_IMAGE_COMMAND, payload);
        onClose();
    };

    return (
        <div className="insert-image-dialog">
            {!mode && (
                <>
                    <Button
                        addonLeft={<Icon className="insert-image-dialog__icon" Svg={LinkIcon} />}
                        align="Start"
                        data-test-id="image-modal-option-url"
                        onClick={() => setMode('url')}
                    >
                        Insert image from URL
                    </Button>
                    <Button
                        addonLeft={<Icon className="insert-image-dialog__icon" Svg={FileIcon} />}
                        align="Start"
                        data-test-id="image-modal-option-file"
                        onClick={() => setMode('file')}
                    >
                        Upload image file
                    </Button>
                </>
            )}
            {mode === 'url' && <InsertImageUriDialogBody onClick={onClick} />}
            {mode === 'file' && <InsertImageUploadedDialogBody onClick={onClick} />}
        </div>
    );
}

const TRANSPARENT_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const img = document.createElement('img');
img.src = TRANSPARENT_IMAGE;

function $onDragStart(event: DragEvent): boolean {
    // eslint-disable-next-line no-use-before-define
    const node = $getImageNodeInSelection();
    if (!node) {
        return false;
    }
    const { dataTransfer } = event;
    if (!dataTransfer) {
        return false;
    }
    dataTransfer.setData('text/plain', '_');
    dataTransfer.setDragImage(img, 0, 0);
    dataTransfer.setData(
        'application/x-lexical-drag',
        JSON.stringify({
            data: {
                altText: node.__altText,
                caption: node.__caption,
                height: node.__height,
                key: node.getKey(),
                maxWidth: node.__maxWidth,
                showCaption: node.__showCaption,
                src: node.__src,
                width: node.__width,
            },
            type: 'image',
        }),
    );

    return true;
}

function canDropImage(event: DragEvent): boolean {
    const { target } = event;
    return !!(
        target &&
        target instanceof HTMLElement &&
        !target.closest('code, span.editor-image') &&
        target.parentElement &&
        target.parentElement.closest('div.ContentEditable__root')
    );
}

function getDragSelection(event: DragEvent): Range | null | undefined {
    let range;
    const target = event.target as null | Element | Document;
    const targetWindow =
        // eslint-disable-next-line no-nested-ternary
        target == null
            ? null
            : target.nodeType === 9
              ? (target as Document).defaultView
              : (target as Element).ownerDocument.defaultView;
    const domSelection = getDOMSelection(targetWindow);
    if (document.caretRangeFromPoint) {
        range = document.caretRangeFromPoint(event.clientX, event.clientY);
    } else if (event.rangeParent && domSelection !== null) {
        domSelection.collapse(event.rangeParent, event.rangeOffset || 0);
        range = domSelection.getRangeAt(0);
    } else {
        throw Error(`Cannot get the selection when dragging`);
    }

    return range;
}

function getDragImageData(event: DragEvent): null | InsertImagePayload {
    const dragData = event.dataTransfer?.getData('application/x-lexical-drag');
    if (!dragData) {
        return null;
    }
    const { type, data } = JSON.parse(dragData);
    if (type !== 'image') {
        return null;
    }

    return data;
}

function $onDragover(event: DragEvent): boolean {
    // eslint-disable-next-line no-use-before-define
    const node = $getImageNodeInSelection();
    if (!node) {
        return false;
    }
    if (!canDropImage(event)) {
        event.preventDefault();
    }
    return true;
}

function $onDrop(event: DragEvent, editor: LexicalEditor): boolean {
    // eslint-disable-next-line no-use-before-define
    const node = $getImageNodeInSelection();
    if (!node) {
        return false;
    }
    const data = getDragImageData(event);
    if (!data) {
        return false;
    }
    event.preventDefault();
    if (canDropImage(event)) {
        const range = getDragSelection(event);
        node.remove();
        const rangeSelection = $createRangeSelection();
        if (range !== null && range !== undefined) {
            rangeSelection.applyDOMRange(range);
        }
        $setSelection(rangeSelection);
        editor.dispatchCommand(INSERT_IMAGE_COMMAND, data);
    }
    return true;
}

function $getImageNodeInSelection(): ImageNode | null {
    const selection = $getSelection();
    if (!$isNodeSelection(selection)) {
        return null;
    }
    const nodes = selection.getNodes();
    const node = nodes[0];
    return $isImageNode(node) ? node : null;
}

export default function ImagesPlugin({ captionsEnabled }: { captionsEnabled?: boolean }): JSX.Element | null {
    const [editor] = useLexicalComposerContext();

    useEffect(() => {
        if (!editor.hasNodes([ImageNode])) {
            throw new Error('ImagesPlugin: ImageNode not registered on editor');
        }

        return mergeRegister(
            editor.registerCommand<InsertImagePayload>(
                INSERT_IMAGE_COMMAND,
                (payload) => {
                    const imageNode = $createImageNode(payload);
                    $insertNodes([imageNode]);
                    if ($isRootOrShadowRoot(imageNode.getParentOrThrow())) {
                        $wrapNodeInElement(imageNode, $createParagraphNode).selectEnd();
                    }

                    return true;
                },
                COMMAND_PRIORITY_EDITOR,
            ),
            editor.registerCommand<DragEvent>(
                DRAGSTART_COMMAND,
                (event) => $onDragStart(event),
                COMMAND_PRIORITY_HIGH,
            ),
            editor.registerCommand<DragEvent>(
                DRAGOVER_COMMAND,
                (event) => $onDragover(event),
                COMMAND_PRIORITY_LOW,
            ),
            editor.registerCommand<DragEvent>(
                DROP_COMMAND,
                (event) => $onDrop(event, editor),
                COMMAND_PRIORITY_HIGH,
            ),
        );
    }, [captionsEnabled, editor]);

    return null;
}

declare global {
    interface DragEvent {
        rangeOffset?: number;
        rangeParent?: Node;
    }
}
