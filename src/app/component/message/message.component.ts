import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../service/auth.service';
import {User} from '../../class/user';
import {MessageService} from '../../service/message.service';
import {Message} from '../../class/message';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {
  user: User;
  message: Message;
  formGroup: FormGroup;
  loading = true;
  constructor(
    private auth: AuthService,
    private messageService: MessageService,
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.messageService.getMessage()
      .subscribe((message: Message) => {
        console.log(message);
        this.message = message[0];
        this.createForm();
        this.loading = false;
      });

  }
  createForm() {
    this.formGroup = this.fb.group({
      check : [this.message.display]
    });
  }

  isConnected(): boolean {
    this.user = this.auth.currentUser;
    return this.auth.isConnected();
  }
  editMessage($event) {
    const val = this.formGroup.value;
    let checked: number;
    if (val.ckeck === 'true') {
      checked = 1;
    } else {
      checked = 2;
    }
    this.messageService.editMessage(this.message.id, $event.descriptionControl, checked)
      .subscribe((message: Message) => {
        this.message = message;
      });
  }
  patchMessage() {
    const val = this.formGroup.value;
    console.log('val', val.check);
    let checked: number;
    if (val.check === true) {
       checked = 1;
    } else {
       checked = 2;
    }
    console.log('val', checked);
    this.messageService.patchMessage(this.message.id, checked)
      .subscribe((message: Message) => {
        this.message = message;
      });
  }
}
