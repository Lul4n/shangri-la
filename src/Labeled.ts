export interface Labeled {
    get label(): string | null;
    set label(label: string | null);

    hasLabel(): boolean;
}
