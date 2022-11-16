export class TeamMember{
  public email: string;
  public title: string;
  public service: string;
  public proficiency: string;
  public team: string;
  public firstName: string;
  public lastName: string;

  constructor(email: string, title: string, team: string, service: string, proficiency: string, firstName: string, lastName: string) {
    this.email = email;
    this.title = title;
    this.team = team;
    this.service = service;
    this.proficiency = proficiency;
    this.firstName = firstName;
    this.lastName = lastName;
  }
}

