import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Header} from './core/components/header/header';
import {ToasterComponent} from './shared/components/ui/toaster-component/toaster-component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, ToasterComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {}
