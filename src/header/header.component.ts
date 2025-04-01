import {Component} from "@angular/core";

@Component({
  // it is suggested to pick 2-word names so they don't clash with the already existing html tags
  selector: 'app-header',
  // we could pass html code directly to a template property instead, but this is not ideal, unless it is single lined html
  templateUrl: './header.component.html',
  // this should be set to true, although this might be set to true automatically (Angular 19 or higher)
  // else, this would be set to false by default, and setting it to true allows us to do components based on the modern way
  // this marks this component as a Standalone Component (instead of Module-Based Components)
  standalone: true,
  // there is also a styleUrls key that takes an array of files
  // there is also a styles key that takes CSS style directly, e.g. ['h1 { color: red }'], but it's discouraged
  styleUrl: './header.component.css'
})

export class HeaderComponent {}
