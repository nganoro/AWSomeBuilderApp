export class Teams{
  public Biography: string;
  public Competencies: string;
  public Tenets: string;
  public Proficiency: string;
  public User_Id: string;

  constructor(biography: string, competencies: string, tenets: string, service: string, proficiency: string, User_Id: string) {
    this.Biography = biography;
    this.Competencies = competencies;
    this.Tenets = tenets;
    this.Proficiency = proficiency;
    this.User_Id = User_Id;
  }
}

