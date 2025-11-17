import { Component, OnInit, OnDestroy } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../../core/services/chat';
import { AuthService } from '../../core/services/auth';

@Component({
  standalone: true,
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  imports: [IonicModule, CommonModule, FormsModule],
})
export class ChatPage implements OnInit, OnDestroy {
  messages: any[] = [];
  newMessage = '';
  userId: string | null = null;
  conversationId = 'general'; 
  subscription: any;

  constructor(
    private chatService: ChatService,
    private auth: AuthService
  ) {}

  async ngOnInit() {
    this.auth.getUser().subscribe((u) => (this.userId = u?.id));

    this.messages = await this.chatService.getMessages(this.conversationId);

    this.subscription = this.chatService.subscribeToMessages(
      this.conversationId,
      (msg: any) => {
        this.messages.push(msg);
      }
    );
  }

  async send() {
    if (!this.newMessage) return;

    await this.chatService.sendMessage(
      this.conversationId,
      this.userId!,
      this.newMessage
    );

    this.newMessage = '';
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
