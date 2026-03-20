type KeysOfType<T, SelectedType> = {
  [K in keyof T]: T[K] extends SelectedType ? K : never;
}[keyof T];

type StringConfig = {
  contains: string;
  mode: "insensitive";
};

type NumberConfig = {
  equals: number;
};

export function getQueryConfig<T extends object>(
  query: string,
  fields: { name: KeysOfType<T, string | number>; isNumber?: boolean }[],
) {
  const normalizedQuery = query.trim();
  if (!normalizedQuery) return [];

  const config: Record<string, StringConfig | NumberConfig>[] = [];

  fields.forEach(({ name, isNumber }) => {
    if (isNumber) {
      const parsedAmount = Number(normalizedQuery);
      if (!Number.isNaN(parsedAmount)) {
        config.push({
          [name]: {
            equals: parsedAmount,
          },
        });
      }
    } else {
      config.push({
        [name]: {
          contains: normalizedQuery,
          mode: "insensitive" as const,
        },
      });
    }
  });

  return config;
}

export function getMonthRange(date: Date) {
  const start = new Date(date.getFullYear(), date.getMonth(), 1);
  const end = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  return { start, end };
}
