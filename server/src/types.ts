export interface GetQuestionConditionals {
    text?: string,
    difficulty?: string
}

export interface GetScoreConditionals {
    username?: string;
}

export interface UpdateUserFields {
    wins?: number;
    losses?: number;
    score?: number;
}