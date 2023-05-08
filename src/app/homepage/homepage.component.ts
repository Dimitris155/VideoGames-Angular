import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_KEY } from '../config';
import { ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit{
  showHomePage = true;
  searchResults = [];
  gameScreenshots!: any[];
  upComingGames: any[] = [];
  popularGames: any[] = [];
  newGames: any[] =[];

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router 

  ) {}
  onClick() {
    this.showHomePage = false;
  }

  ngOnInit() {

    //UPCOMING GAMES
    const nextYear = new Date();
    nextYear.setFullYear(nextYear.getFullYear() + 1);
    const nextYearDate = nextYear.toISOString().slice(0, 10);
    const currentDate = new Date().toISOString().slice(0, 10);
    const apiUrl1 = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${currentDate},${nextYearDate}&ordering=-added&page_size=10`;
    this.http.get(apiUrl1).subscribe((data: any) => {
    this.upComingGames = data.results;
    });

    //POPULAR GAMES
    const lastYear = new Date();
    lastYear.setFullYear(lastYear.getFullYear() - 1);
    const lastYearDate = lastYear.toISOString().slice(0, 10);

    const apiUrl2 = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${lastYearDate},${currentDate}&ordering=-rating&page_size=10`;
    this.http.get(apiUrl2).subscribe((data: any) => {
      this.popularGames = data.results;
    });

    //NEW GAMES
    const apiUrl3 = `https://api.rawg.io/api/games?key=${API_KEY}&dates=${lastYearDate},${currentDate}&ordering=-released&page_size=10`;
    this.http.get(apiUrl3).subscribe((data: any) => {
      this.newGames = data.results;
    });
    

  }

}
