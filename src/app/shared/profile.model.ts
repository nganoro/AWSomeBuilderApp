export class ProfileModel{
  public PK: string;
  public SK: string;
  public skill: string;

  constructor(pk: string, sk: string, skill: string){
    this.PK = pk;
    this.SK = sk;
    this.skill = skill
  }
}

