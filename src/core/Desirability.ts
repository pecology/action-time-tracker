const values = ["Good", "Neautoral", "Bad"] as const;

export type Desirability = (typeof values)[number];

export function isDesirability(obj: any) : obj is Desirability {
    return values.includes(obj);
};