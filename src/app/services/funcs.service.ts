import { EventEmitter, Injectable, Output } from '@angular/core';
import { Categories,Headers } from '../models/newsModel';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class FuncsService {
  constructor(private api:ApiService) { }
  @Output() categories = new EventEmitter<Array<Categories>>();
  @Output() filteredHeaders = new EventEmitter<Headers>();
  @Output() search = new EventEmitter<string>();

  headers:any
  isFilterClick = false

  setSearch(search:string){
    this.search.emit(search)//Navbardan gelen arama verisi değişkene yazılıyor.
    console.log("gelen : ",search, "giden : ", this.search)
  }

  getCategories() {
    this.api.getCategories().subscribe({
      next: (response) => {
        const mixed: any = response
        this.categories.emit(mixed.sort((a: Categories, b: Categories) => {
          if (a.code > b.code) {
            return 1;
          }

          if (a.code < b.code) {
            return -1;
          }

          return 0;
        }))//Karışık gelen kategori listesi alfabetik sıralandı
      }
    })
    console.log(this.filteredHeaders)
  }


  getNewsHeaders() {
    this.api.getHeaders().subscribe({
      next: (response) => {
        this.headers = response;
        this.filteredHeaders.emit(this.headers)//Api'den gelen haber başlıkları değişkene yazıldı
      }
    })
  }

  filter(type: string, code?: string,filtered?:any) {
    if (type == "category") {
      if (code != null) {
        this.filteredHeaders.emit(this.headers.filter((news: { category: string; }) => news.category == code))
        //Tıklanan kategorideki haberler filtrelenip değişkene yazıldı
      }
      else {
        this.filteredHeaders.emit(this.headers)//Eğer kategori kodu boş olarak gelirsen tüm haberleri gönder
      }
      window.scroll({ //Kategori seçince sayfa başına yönlendirme
        top: 0,
        left: 0,
        behavior: 'smooth'
      });
      console.log(this.filteredHeaders)
    }
    else if (type == "time") {
      console.log(filtered)
      if (this.isFilterClick) {
        //Zamana göre azalan şekilde sıralama
        this.isFilterClick = false //Sıralama tuşuna önceden basıldıysa sıfırla
        this.filteredHeaders.emit(filtered?.sort((x: Headers, y: Headers) => {
          return y.timestamp.valueOf() - x.timestamp.valueOf();
        }))

      }
      else {
        //Zamana göre artan şekilde sıralama
        this.isFilterClick = true //Sıralama tuşuna basıldığı için true
        this.filteredHeaders.emit(filtered?.sort((x: Headers, y: Headers) => {
          return x.timestamp.valueOf() - y.timestamp.valueOf();

        }))
      }
    }
  }

}
