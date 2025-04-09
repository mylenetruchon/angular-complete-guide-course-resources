import {Component, computed, signal} from '@angular/core';
import {HeaderComponent} from "./header/header.component";
import {DUMMY_USERS} from "./dummy-users";
import {UserComponent} from "./user/user.component";
import {TasksComponent} from "./tasks/tasks.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HeaderComponent,
    UserComponent,
    TasksComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  users = signal(DUMMY_USERS);
  selectedUserId = signal(DUMMY_USERS[0].id);

  selectedUser =
    computed<{ id: string; name: string; avatar: string; }>(() => DUMMY_USERS.find(user => user.id === this.selectedUserId())!)

  selectUser(id: string) {
    this.selectedUserId.set(DUMMY_USERS.find(user => user.id === id)!.id);
  }
}
