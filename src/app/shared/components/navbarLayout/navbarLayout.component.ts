import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'navbar-layout',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './navbarLayout.component.html',
})
export class NavbarLayoutComponent { }
