import { COLORS } from "../helpers/colors.ts";

/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */
class CodeEditorState {

    readonly content: string;
    readonly cursorPosition: number;
    readonly unsavedChanges: boolean;

    constructor(content: string, cursorPosition: number, unsavedChanges: boolean) {
        this.content = content;
        this.cursorPosition = cursorPosition;
        this.unsavedChanges = unsavedChanges;
    }

    copyWith({ content, cursorPosition, unsavedChanges }: Partial<CodeEditorState>): CodeEditorState {
        return new CodeEditorState(
            content ?? this.content,
            cursorPosition ?? this.cursorPosition,
            unsavedChanges ?? this.unsavedChanges
        );
    };

    displayState() {
        console.log('\n%cCurrent state:', COLORS.green);
        console.log(`
            Content: ${this.content}
            Cursor position: ${this.cursorPosition}
            Unsaved changes: ${this.unsavedChanges}
            `);
    }
}

class CodeEditorHistory {
    private statesHistory: CodeEditorState[] = [];
    private currentStateIndex: number = -1;

    save(state: CodeEditorState): void {
        if (this.currentStateIndex < this.statesHistory.length - 1) {
            this.statesHistory = this.statesHistory.splice(0, this.currentStateIndex + 1);
        }

        this.statesHistory.push(state);
        this.currentStateIndex++;
    }

    undo(): CodeEditorState | null {
        if (this.currentStateIndex > 0) {
            this.currentStateIndex--;
            return this.statesHistory[this.currentStateIndex];
        }

        return null;
    }

    redo(): CodeEditorState | null {
        if (this.currentStateIndex < this.statesHistory.length - 1) {
            this.currentStateIndex++;
            return this.statesHistory[this.currentStateIndex];
        }

        return null;
    }
   
}

function main() {
    const history = new CodeEditorHistory();
    let editorState = new CodeEditorState('Hello, world!', 0, false);

    console.log('\n%cInitial State:', COLORS.blue);
    history.save(editorState);
    editorState.displayState();

    console.log('\n%cNew State:', COLORS.blue);
    editorState = editorState.copyWith({ content: 'Hello, world! This is a test.', cursorPosition: 4, unsavedChanges: true });
    history.save(editorState);
    editorState.displayState();
    
    console.log('\n%cNew State 1:', COLORS.blue);
    editorState = editorState.copyWith({ cursorPosition: 2 });
    history.save(editorState);
    editorState.displayState();
   
    console.log('\n%cNew State Undo:', COLORS.blue);
    editorState = history.undo()!;
    editorState.displayState();
    
    console.log('\n%cNew State Redo:', COLORS.blue);
    editorState = history.redo()!;
    editorState.displayState();
}

main();