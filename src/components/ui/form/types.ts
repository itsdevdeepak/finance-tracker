
export type ActionState<FieldNames extends string = string> = {
  status?: "SUCCESS" | "ERROR";
  message: string;
  fieldErrors: { [K in FieldNames]?: string };
  payload?: FormData;
  timestamp: number;
};

export type FormAction = (action: ActionState, formData: FormData) => Promise<ActionState>;