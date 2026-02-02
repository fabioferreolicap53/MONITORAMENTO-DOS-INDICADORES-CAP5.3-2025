
/**
 * Extrai os números que precedem o caractere "-" em um rótulo.
 * Exemplo: "1.3 - Título" -> [1, 3]
 */
export const getSortValue = (label: string): number[] | null => {
    const match = label.match(/^([\d.]+)\s*-/);
    if (!match) return null;
    return match[1].split('.').map(Number);
};

/**
 * Algoritmo de ordenação crescente baseado nos números que precedem o hífen.
 * Itens sem números são posicionados ao final.
 */
export const sortMenuItems = <T extends { label: string }>(items: T[]): T[] => {
    return [...items].sort((a, b) => {
        const aNums = getSortValue(a.label);
        const bNums = getSortValue(b.label);

        // Ambos têm números
        if (aNums && bNums) {
            const maxLen = Math.max(aNums.length, bNums.length);
            for (let i = 0; i < maxLen; i++) {
                const aVal = aNums[i] ?? 0;
                const bVal = bNums[i] ?? 0;
                if (aVal !== bVal) return aVal - bVal;
            }
            return 0;
        }

        // Apenas um tem números
        if (aNums) return -1;
        if (bNums) return 1;

        // Nenhum tem números - ordem alfabética
        return a.label.localeCompare(b.label);
    });
};
