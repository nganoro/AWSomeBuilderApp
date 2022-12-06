export class Teams{
  public Biography: string;
  public Competencies: string;
  public Tenets: string;
  public Proficiency: string;
  public PK: string;
  public Market: string;

  constructor(biography: string, competencies: string, tenets: string, service: string, proficiency: string, Market: string, PK: string) {
    this.Biography = biography;
    this.Competencies = competencies;
    this.Tenets = tenets;
    this.Proficiency = proficiency;
    this.PK = PK;
    this.Market = Market;
  }
}

