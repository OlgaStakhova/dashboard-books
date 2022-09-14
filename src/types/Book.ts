export interface Book {
    bookTitle: string,
    authorName: string,
    category: string,
    ISBN: string,
    id: number
}

export interface BookCreateData {
    bookTitle: string,
    authorName: string,
    category: string,
    ISBN: string;
}

export interface BookUpdatedData {
    bookTitle?: string,
    authorName?: string,
    category?: string,
    ISBN?: string;
}