import {Component, computed, signal} from '@angular/core';
import {DUMMY_USERS} from "../dummy-users";

const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true
})
export class UserComponent {
  // Since Angular 2, this is how we deal with state (see signal for other method below)
  // this is a variable, no need to use the keyword let or const
  // we can now access this property inside the html code (in the template)
  // private selectedUser would make it not available in the template
  exampleState = "this state is just for example"

  // Since Angular 16: we can deal with state via signals as well (stable since Angular 17)
  // when the value is changed, Angular is notified (it then rerenders everywhere the value is used)
  // we can pass an initial value to the signal() method
  selectedUser = signal(DUMMY_USERS[randomIndex]);

  // getter for a computed property (without Signal)
  // it is called like this in the template: <img [src]="imagePath" />
  get imagePathWithoutSignal() {
    return "assets/users/" + this.selectedUser().avatar;
  }

  // now, with Signal, we instead use the computed method
  // when reading this value, Signal creates a subscription to selectedUser
  // and it will recompute the value of imagePath only if selectedUser changes (instead of if any value of the component changes)
  // since it is a Signal, it is called like this in the template: <img [src]="imagePath()" />
  imagePath = computed(() => "assets/users/" + this.selectedUser().avatar);

  selectUser() {
    // Traditional state: Angular detects the state changes,
    // because an event (click) occurred, when it changes (via zone.js), it supposes where it has changed and it rerenders the UI
    // if a state is declared this way, how to use it in the template: <span>{{ selectedUser.name }}</span>
    this.exampleState = "this his how to change the value of traditional state"

    const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // signal is more efficient as you subscribe (with selectedUser()) and we don't need to check multiple irrelevant components
    this.selectedUser.set(DUMMY_USERS[randomIndex]);
  }
}
