import {Skills} from "./skills.model";

export class ProfileModel{
  public PK: string;
  public SK: string;

  constructor(pk: string, sk: string){
    this.PK = pk;
    this.SK = sk;
  }
}

