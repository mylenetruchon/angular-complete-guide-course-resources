import {Component, computed, EventEmitter, Input, input, Output, output} from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  standalone: true
})
export class UserComponent {
  // INPUTS
  // older method: component properties are called inputs
  // without ! - TS2564: Property 'avatar' has no initializer and is not definitely assigned in the constructor.
  // however, ! is for TypeScript, but without the required option, Angular does not enforce to pass a value to this input
  @Input({required: true}) name!: string;

  // newer method: you can also use the Signal to set inputs (InputSignal)
  // you can assign a default initial value, which will determine the type (eg: input(""))
  // else, you can use the generics input<string> if you don't set an initial value
  // finally there is still the possibility to set the input as required (but then you can't set initial default value)
  // from outside the component (the parent), it does not affect how to pass an input
  avatar = input.required<string>();
  id = input.required<string>();

  // as the avatar input is a Signal, it must be called as a Signal (avatar() instead of avatar)
  // also, as avatar is a Signal, we should use the computed method instead of a getter to be more efficient
  imagePath = computed(() => "assets/users/" + this.avatar());

  // OUTPUTS
  // older version, the most common one
  @Output() select = new EventEmitter<string>();
  // modern version, less common
  // there is not real advantage, apart that you won't have decorators anymore and it is a bit more concise
  modernSelect = output<string>() // no need to explicitly create an EventEmitter

  onSelectUser() {
    this.select.emit(this.id());
    this.modernSelect.emit(this.id())
  }
}
