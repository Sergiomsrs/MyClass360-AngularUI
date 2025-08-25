import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FooterLayoutComponent } from "../../../shared/components/footerLayout/footerLayout.component";
import { NavbarLayoutComponent } from "../../../shared/components/navbarLayout/navbarLayout.component";

@Component({
  selector: 'app-classroom-layout',
  imports: [RouterOutlet, FooterLayoutComponent, NavbarLayoutComponent],
  templateUrl: './classroomLayout.component.html',
})
export class ClassroomLayoutComponent { }
