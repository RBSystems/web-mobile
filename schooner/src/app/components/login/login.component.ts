import { Component, OnInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { MatBottomSheet } from '@angular/material';
import { NumpadComponent } from 'src/app/popups/numpad/numpad.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  roomCode = '';
  keyboardEmitter: EventEmitter<string>;


  constructor(
    private bottomSheet: MatBottomSheet,
    private router: Router) {
    this.keyboardEmitter = new EventEmitter<string>();
    this.keyboardEmitter.subscribe((s) => {
      this.roomCode = s;
    });
  }

  ngOnInit() {
  }

  showNumpad = () => {
    this.bottomSheet.open(NumpadComponent,
      {
        data: this.keyboardEmitter,
        backdropClass: 'keyboard-bg'
      }).afterDismissed().subscribe((result) => {
        if (result !== undefined) {
          console.log('redirecting using the following room code:', this.roomCode);
          this.goToRoomControl();
        }
    });
  }

  getCodeChar = (index: number): string => {
    if (this.roomCode.length > index) {
      return this.roomCode.charAt(index);
    }

    return '';
  }

  goToRoomControl = () => {
    // TODO: actually do something with the room code
    const roomID = 'ITB-1101';
    this.router.navigate(['/room/' + roomID]);
  }
}
