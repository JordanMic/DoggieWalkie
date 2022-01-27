import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss']
})
export class AvatarComponent implements OnInit, OnChanges {
  @Input()
  imageFile: Blob | null;
  @Input()
  colorInHex: string;
  @Input()
  salt: string;
  @Input()
  size: number = 50;
  @Input()
  initialsSource: string[]
  @Input()
  round: boolean = true;
  initials: string;
  color: string;
  image: SafeUrl;

  constructor(
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit(): void {
    this.setUp();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setUp()
  }

  private setUp() {
    if (this.imageFile) {
      let objectURL = 'data:image/png;base64,' + this.imageFile;
      this.image = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    } else {
      if (!this.colorInHex) {
        this.generateColor()
      } else {
        this.color = this.colorInHex;
      }
      this.generateInitials();
    }
  }

  private generateColor() {
    var hash = 0;
    var str = this.salt;

    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    var colour = '#';
    for (var i = 0; i < 3; i++) {
      var value = (hash >> (i * 8)) & 0xFF;
      colour += ('00' + value.toString(16)).substr(-2);
    }

    this.color = colour;
  }

  private generateInitials() {
    if (this.initialsSource && this.initialsSource.length > 0) {
      this.initials = '';
      for (let i=0;i < this.initialsSource.length; i++) {
        let string = this.initialsSource[i];
        if (string.length > 0) {
          this.initials += string[0];
        }
      }
    }
  }
}
