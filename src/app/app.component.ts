import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'course-project';
  selectedSection = 'recipes';

  handleSectionSelection(value: "shoppingList" | "recipes") {
    this.selectedSection = value;
    console.log(value)
  }
}
