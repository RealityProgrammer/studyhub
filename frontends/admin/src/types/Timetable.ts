export class TimetableEntity {
  start:string;
  end:string;
  title: string;
  url: string;

  private constructor(title: string , start:string,end:string,url:string) {
    this.title = title;
    this.start = start;
    this.end = end;
    this.url = url;
  }
  public static instance(data  :any): any {
    let date: string = data.date.split("T")[0] + "T"
    const time :any = data.time.split("-");
    let start :string = date + time[0]+":00";
    let end :string = date + time[1]+":00";
    let title :string = "Buổi "+data.period+": "+data.name;
    let url = data.url;
    return new TimetableEntity(
      title,
      start,
      end,
      url
    );
  }
}