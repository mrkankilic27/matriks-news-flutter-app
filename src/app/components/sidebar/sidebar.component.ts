import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/newsModel';
import { FuncsService } from 'src/app/services/funcs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  constructor(private func:FuncsService) { }
  categories?:Array<Categories>
  ngOnInit() {
    this.func.getCategories()//Kategori listesi alınıyor
    this.func.categories.subscribe(data => { this.categories = data})//Kategori listesine subscribe olunuyor
  }

  filter(type:string,code?:string){
    this.func.filter(type,code)//Kategoriye göre filtreleme ve/veya zamana göre sıralama için servise veri gönderiliyor
  }

}
