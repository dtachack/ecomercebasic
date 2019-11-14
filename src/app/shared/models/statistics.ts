/**
 * Modelo DTO para etadisticas
 */
export class StatisticsForDays {
  constructor(public count: string, public date: Date) {}
}

export class StatisticsTopProducts {
  constructor(
    public count: number,
    public idProduct: string,
    public name: string
  ) {}
}
