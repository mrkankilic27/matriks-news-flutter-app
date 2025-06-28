import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { marked } from 'marked';
import { FuncsService } from 'src/app/services/funcs.service';
import { Categories, Details } from 'src/app/models/newsModel'

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css']
})
export class NewsComponent implements OnInit {

  constructor(private api: ApiService, public func: FuncsService) { }
  search?: string
  id?: number
  seen?: string=""
  categories?: Array<Categories>
  filteredHeaders: any
  newsDetail?: Details

  ngOnInit(): void {
    this.seen = this.getCookie() //Cookie varsa verileri çek
    this.func.getNewsHeaders() //Haber Başlıklarını al
    this.getNewsDetail(0) //İstenen haberin detaylarını çek (Başlarken 0 çünkü modal hata alıyor)
    this.func.categories.subscribe(data => { this.categories = data }) //Kategori listesi servisten alınıyor
    this.func.filteredHeaders.subscribe(data => { this.filteredHeaders = data })//Haber Başlıkları servisten alınıyor
    this.func.search.subscribe(data => { this.search = data })//Arama kutusundaki değer için subscribe olunuyor
  }

  setCookie() {
    if(this.seen)
    localStorage.setItem("okunan", this.seen.toString())
    console.log(this.seen)
  }

  getCookie() {
    if(localStorage.getItem("okunan")!==null)
    return localStorage.getItem("okunan")?.toString()
    else return ""
  }

  cookieControl(id: number) {
    const x = this.seen?.split(";")//Kontrol etmek için cookie verisi ";" ile parçalanıyor
    if (x?.includes(id.toString())) {
      console.log(x)//Gönderilen id hali hazırda cookiede bulunuyor işlme yapma
    }
    else {
      this.seen += id + ";"//id cookiede yok. Veriye ekle
      this.setCookie()//Cookieyi tekrar ayarla
    }
  }

  seenCheck(id: number) {
    const x = this.seen?.split(";")//Kontrol etmek için cookie verisi ";" ile parçalanıyor
    if (x?.includes(id.toString())) {
      return true //Eğer haber okunmuşsa true
    }
    else {
      return false //Haber okunmamışsa false
    }
  }

  dayConvert(timestamp: Date) {
    const date = new Date(timestamp)
    const fulldate: { tarih: string, saat: string } = { tarih: date.toLocaleDateString("tr-TR"), saat: (date.getHours() + ":" + date.getMinutes()) }
    return fulldate //Gelen veri tarih ve saat olarak çevrildi
  }

  categoryConvert(veri: string) {
    let TRcategory
    this.categories?.forEach((element: { code: string; description: string }) => {
      if (element.code == veri)
        TRcategory = element.description //Haber başlığının kategori kodu çeviriliyor
    });
    return TRcategory
  }

  getNewsDetail(id: number) {
    this.api.getNewsDetail(id).subscribe({
      next: (response) => {
        this.newsDetail = response;
        console.log(this.newsDetail)
        if (id != 0) {
          this.newsDetail.headline = 
          this.filteredHeaders.find((x: { id: number; }) => x.id == id).headline; //İçeriği olmayan haberlerinde başlığı olması için ayarlama
          const content = document.getElementById('content-area') as HTMLDivElement //Haberin gönderileceği html alanı
          content.innerHTML = marked.parse(this.newsDetail.content) //Markdown şeklinde gelen haber formatlanıp html alanına yazılıyor
          this.cookieControl(id)//Haberin okundu değeri cookie gönderiliyor.
        }
        console.log(this.newsDetail)
      }
    })
  }

}

