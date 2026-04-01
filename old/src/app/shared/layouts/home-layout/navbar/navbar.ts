import { Component } from '@angular/core';
import { Logo } from "../../../components/logo/logo";
import { Profile } from "./components/profile/profile";
import { Menu } from "./components/menu/menu";

@Component({
  selector: 'app-navbar',
  imports: [Logo, Profile, Menu],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss'
})
export class Navbar {

}
