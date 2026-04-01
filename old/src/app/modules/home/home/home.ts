import { Component } from '@angular/core';
import { NewMovimentation } from "../../../shared/components/new-movimentation/new-movimentation";

@Component({
  selector: 'app-home',
  imports: [NewMovimentation],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {

}
