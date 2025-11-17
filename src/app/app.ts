import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('iflows-intelligence');

  showTextbox = false;
  userInput = '';
  response = "Generating Response...";

  onSquare1Click() {
    this.showTextbox = true;
  }

  enterTextbox(value: string) {
    this.userInput = value;
    if (this.userInput == "" || this.userInput == " ") {
      this.userInput = "Hello Assistant!"
    }
    const payload = { message: this.userInput };

    fetch('http://127.0.0.1:8000/send_request', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
      this.response = data.response;
    })
    .catch(error => {
      console.error('Error:', error);
    });
    
    
  }

}
