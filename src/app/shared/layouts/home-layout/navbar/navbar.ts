import { Component } from '@angular/core';
import { Logo } from "../../../components/logo/logo";
import { Profile } from "./components/profile/profile";

@Component({
  selector: 'app-navbar',
  imports: [Logo, Profile],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
