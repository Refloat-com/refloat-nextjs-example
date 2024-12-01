export interface Plan {
  readonly id: string;
  readonly name: string;
  readonly price: {
    readonly int: number;
    readonly float: number;
  };
}

export interface User {
  readonly id: string;
  readonly name: string;
  readonly imgSrc: string;
  readonly plan: string;
  readonly subscriptionId?: string;
}
