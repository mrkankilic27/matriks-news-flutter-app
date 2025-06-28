import { Pipe, PipeTransform } from '@angular/core';
import { Headers } from '../models/newsModel';

@Pipe({
  name: 'newsFilter'
})
export class NewsFilterPipe implements PipeTransform {

  transform(value: Array<Headers>, search=""): Array<Headers> {
    search=search?.toLocaleLowerCase()

    return search?value.filter((p:Headers)=>p.headline.toLocaleLowerCase().indexOf(search)!==-1):value
  }


}
