import { Component } from '@angular/core';
import {
  SpeechRecognitionService,
} from '../../../../projects/ngx-speech-recognition/src/public_api';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'demo-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  providers: [
    SpeechRecognitionService,
  ],
})
export class MainComponent {

  public started = false;
  public wakeWord = false;
  public enrollWord = false;
  public clickSpeak = true;
  serverData: JSON;

  public message = '';
  public fullMessage = ''

  constructor(
    private service: SpeechRecognitionService,
    private httpClient: HttpClient
  ) {
    // You can see Dependency Injected service in Console.
    // DI resolved from DemoModule with SpeechRecognitionModuke::withConfig.
    //console.log('MainComponent', this.service);

    this.service.onstart = (e) => {
    };
    this.service.onresult = (e) => {
      this.message = e.results[0].item(0).transcript;
      this.fullMessage = this.fullMessage + this.message;
      if(this.message.indexOf("wake") > -1) {
        console.log("WAKE FOUND")
        this.stop();
      }
      if(this.message.indexOf("enroll") > -1) {
        console.log("ENROLL FOUND")
        this.stop();
      }
    };
  }

  public start() : void {
    this.started = true;
    this.service.start();
    console.log("started")
    //this.callVoicePI();
    setTimeout(()=>{
      this.stop();
      console.log("after 5s")
    }, 5000)
  }

  public stop() : void {
    this.started = false;
    this.service.stop();
    console.log(this.message);
    this.message = "";
    console.log(this.fullMessage);
    this.callVoicePI();
  }



  
 public callVoicePI() {
   console.log("API called")
  // this.httpClient.get('http://10.0.1.159:5002/').subscribe(data => {
  // this.serverData = data as JSON;
  // console.log(this.serverData);
  // })
  }
  public enroll() {
    console.log("enrolled")
  }
}
