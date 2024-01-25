import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommentService {
  private dataStream = new Subject<any>();

  // Method to send data to the stream
  sendData(data: any): void {
    this.dataStream.next(data);
  }

  // Method to get the observable stream
  getStream() {
    return this.dataStream.asObservable();
  }
}
