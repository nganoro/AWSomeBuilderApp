export class TeamMember{
  public email: string;
  public title: string;
  public service: string;
  public proficiency: string;
  public team: string;
  public first_name: string;
  public last_name: string;
  public user_name: string;

  constructor(email: string, title: string, team: string, service: string, proficiency: string, firstName: string, lastName: string, user_name: string) {
    this.email = email;
    this.title = title;
    this.team = team;
    this.service = service;
    this.proficiency = proficiency;
    this.first_name = firstName;
    this.last_name = lastName;
    this.user_name = user_name;
  }
}

