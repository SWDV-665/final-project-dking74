export interface GetQuestionFieldContitionals {
    text?: string,
    difficulty?: string
}

export interface GetQuestionResultsCondtionals {
    random?: boolean,
    limit?: number
}

export interface GetQuestionConditionals extends
    GetQuestionFieldContitionals,
    GetQuestionResultsCondtionals {
}

export interface GetScoreConditionals {
    username?: string;
}

export interface UpdateUserFields {
    wins?: number;
    losses?: number;
    score?: number;
}