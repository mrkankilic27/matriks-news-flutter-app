import { Component, OnInit } from '@angular/core';
import { Categories } from 'src/app/models/newsModel';
import { FuncsService } from 'src/app/services/funcs.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public func:FuncsService) { }
  categories?: Array<Categories>
  search=""
  ngOnInit() {
    this.func.categories.subscribe(data => { this.categories = data })//Kategori listesine subscribe olunuyor
    this.func.search.subscribe(data=>{this.search=data})//Arama kutusundaki değer için subscribe olunuyor
  }

  sendPipe(search:string){
    this.func.setSearch(search)//Arama kutucuğundaki veri filtreleme için servise gönderiliyor
  }

}
