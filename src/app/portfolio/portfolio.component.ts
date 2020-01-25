import { Component, OnInit } from '@angular/core';
import Profolio from '../../assets/portfolio.json';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {

  public data:{title:string, url:string, task:string, desc:string}[] = Profolio;

  constructor() { 
  }

  ngOnInit() {
  }
}
