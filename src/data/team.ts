export const SUBTEAMS = [
  { name: "Design & Building", lead: "Leads: Subash Jonnalagadda & Joseph Alex • 26 members", desc: "Leads design of robot systems." },
  { name: "Coding", lead: "Leads: Julian Reiff, Joseph Uthuppan & Robert Geib • 10 members", desc: "Autonomous, vision, robot control." },
  { name: "Finance", lead: "Leads: Mathew Kulapurathazhe & Thomas Munchoff • 13 members", desc: "Creates and implements business plan" },
  { name: "Media & Marketing", lead: "Lead: Oisin Stack • 9 members", desc: "Outreach, handles sponsor benefits, video" },
];

export type RosterMember = {
  n: string;
  email: string;
  role: string;
  yr: string;
};

//roster is currently sorted by leads and section, then year and section 
//design/build, coding, finance, social media
//blank template: { n: "", email: "", role: "", yr: "" }, 
export const ROSTER: RosterMember[] = [
  //team leads
  { n: "Subash Jonnalagadda", email: "sjonnalagadda555@stepinac.org", role: "Co-Captain, Design/Build Co-lead", yr: "Junior" },
  { n: "Joseph Alex", email: "josephalex823@stepinac.org", role: "Co-Captain, Design/Build Co-lead", yr: "Sophomore" },
  { n: "Robert Geib", email: "robertgeib429@stepinac.org", role: "Coding Co-lead, Design/Build Team", yr: "Junior" },
  { n: "Joseph Uthuppan", email: "josephuthuppan930@stepinac.org", role: "Coding Co-lead, Design/Build Team", yr: "Junior" },
  { n: "Julian Reiff", email: "julianreiff995@stepinac.org", role: "Coding Co-lead", yr: "Sophomore" },
  { n: "Mathew Kulapurathazhe", email: "mathewkulapurat628@stepinac.org", role: "Finance Co-lead", yr: "Sophomore" },
  { n: "Thomas Munchoff", email: "thomasmunchoff469@stepinac.org", role: "Finance Co-lead", yr: "Sophomore" },
  { n: "Oisin Stack", email: "oisinstack354@stepinac.org", role: "Marketing/Social Media Lead", yr: "Junior" },


  //seniors
  { n: "Gianluca Fideleo", email: "gianlucafideleo955@stepinac.org", role: "Design/Build Team", yr: "Senior" },
  { n: "Konrad Burnett", email: "konradburnett588@stepinac.org", role: "Coding Team", yr: "Senior" },


  //juniors
  { n: "Josiah Gold", email: "josiahgold344@stepinac.org", role: "Design/Build Team", yr: "Junior" },
  { n: "Aiden Rios", email: "aidenrios306@stepinac.org", role: "Design/Build Team", yr: "Junior" },
  { n: "Michael Hughes", email: "michaelhughes337@stepinac.org", role: "Coding Team", yr: "Junior"}, 
  { n: "Justin Paulino", email: "justinpaulino517@stepinac.org", role: "Coding Team, Design/Build Team", yr: "Junior" },
  { n: "Fabio Coppola", email: "fabiocoppola226@stepinac.org", role: "Finance Team, Marketing/Social Media Team", yr: "Junior" },
  { n: "Jace Reyna", email: "jacereyna228@stepinac.org", role: "Coding Team, Finance Team, Marketing/Social Media Team", yr: "Junior" },
  { n: "Dylan Diaz", email: "dylandiaz677@stepinac.org", role: "Design/Build Team", yr: "Junior" },   


  //one team only sophmores
  { n: "Anthony MacDonald", email: "anthonymacdonald775@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },
  { n: "Gabriel Alba", email: "gabrielalba953@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },
  { n: "Ryan McManus", email: "ryanmcmanus962@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },
  { n: "Zachary Chavez", email: "zacharychavez228@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },
  { n: "Ebinoseta Ifidon", email: "ebinosetaifidon149@stepinac.org", role: "Design/Build Team", yr: "Sophomore" },

  //two team sophmores
  { n: "Michael Yordan", email: "michaelyordan408@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Michael Peyton", email: "michaelpeyton872@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Martin Kilcoyne", email: "martinkilcoyne337@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Viggo McCartney", email: "viggomccartney945@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Xavi Gonzalez", email: "xavigonzalez336@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Dara Kola-Olugboye", email: "darakolaolugboye721@stepinac.org", role: "Design/Build Team, Marketing/Social Media Team", yr: "Sophomore" },
  { n: "Louis Cedrone", email: "louiscedrone907@stepinac.org", role: "Design/Build Team, Marketing/Social Media Team", yr: "Sophomore" },
  { n: "John Burke", email: "johnburke441@stepinac.org", role: "Design/Build Team, Marketing/Social Media Team", yr: "Sophomore" },
  { n: "Daniel Zheng", email: "danielzheng470@stepinac.org", role: "Design/Build Team, Coding Team", yr: "Sophomore" }, 
  { n: "Nicholas Riolo", email: "nicholasriolo351@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },
  { n: "Lucas Madera", email: "lucasmadera236@stepinac.org", role: "Coding Team, Finance Team", yr: "Sophomore" },
  { n: "Korede OluwaDarasimi Kola-Olugboye", email: "koredekolaolugb447@stepinac.org", role: "Design/Build Team, Coding Team", yr: "Sophomore" },
  { n: "Ezra Walters", email: "ezrawalters460@stepinac.org", role: "Design/Build Team, Marketing/Social Media Team", yr: "Sophomore" },
  { n: "Anthony Villa", email: "anthonyvilla508@stepinac.org", role: "Design/Build Team, Finance Team", yr: "Sophomore" },

  //three team sophmores
  { n: "Aston Seravo", email: "astonseravo509@stepinac.org", role: "Design/Build Team, Coding Team, Finance Team", yr: "Sophomore" },
  { n: "Luke Kreig", email: "lukekreig553@stepinac.org", role: "Design/Build Team, Finance Team, Marketing/Social Media Team", yr: "Sophomore" },
  { n: "Austin Rebholz", email: "austinrebholz830@stepinac.org", role: "Design/Build Team, Coding Team, Marketing/Social Media Team", yr: "Sophomore" },

  
  //freshmen
  { n: "Julian Gopaul", email: "juliangopaul342@stepinac.org", role: "Design/Build Team", yr: "Freshman" },
  { n: "Andrew Hampton", email: "andrewhampton675@stepinac.org", role: "Coding Team", yr: "Freshman" },
  { n: "James Pettit", email: "jamespettit229@stepinac.org", role: "Design/Build Team, Marketing/Social Media Team", yr: "Freshman" },
  { n: "Ryan Keogh", email: "ryankeogh33@stepinac.org", role: "Design/Build Team", yr: "Freshman" }, 
  { n: "Tristan Camacho", email: "trispclegend21@gmail.com", role: "Design/Build Team", yr: "Freshman" }, 
];