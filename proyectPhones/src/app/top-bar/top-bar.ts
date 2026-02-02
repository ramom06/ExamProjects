import { Component } from '@angular/core';
import {RouterLink} from '@angular/router';
import { CartService } from '../cart.service';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-top-bar',
  imports: [
    RouterLink
  ],
  templateUrl: './top-bar.html',
  styleUrl: './top-bar.css',
})
export class TopBar {
}
