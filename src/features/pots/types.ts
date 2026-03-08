export type PotRaw = {
  name: string;
  target: string;
  total: string;
  theme: string;
};

export type Pot = {
  id: string;
  name: string;
  target: number;
  total: number;
  theme: string;
};

export type PotWithoutId = Omit<Pot, "id">;

export type GetPotsParams = {
  query?: string;
  sort?: string;
  page?: number;
  limit?: number;
};

export type GetPotsResponse = {
  data: {
    pots: Pot[];
  };
  error?: string;
};

export type GetPotsByIdResponse = {
  data: {
    pot: Pot | null;
  };
  error?: string;
};

export type UpdatePotByIdResponse = {
  data: {
    pot: Pot | null;
  };
  error?: string;
};

export type CreateNewPotResponse = {
  data: {
    pot: Pot | null;
  };
  error?: string;
};

export type DeletePotByIdResponse = {
  data: {
    pot: Pot | null;
  };
  error?: string;
};
