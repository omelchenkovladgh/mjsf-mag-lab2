export class Task {
    static TS_COMPLETED = 'completed'
    static TS_INCOMPLETED = 'incompleted'
  
    constructor() {
      this.ava = "";
      this.name = "";
      this.title = "";
      this.status = Task.TS_INCOMPLETED;
    }
  }