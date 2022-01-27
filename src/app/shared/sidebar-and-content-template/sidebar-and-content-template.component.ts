import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, TemplateRef} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';
import {SidebarMenuConfig, Tile} from './sidebar-menu-config';
import {SidebarMenuValidator} from '../sidebar-menu-validator';
import {Subscription} from 'rxjs';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-sidebar-and-content-template',
  templateUrl: './sidebar-and-content-template.component.html',
  styleUrls: ['./sidebar-and-content-template.component.scss']
})
export class SidebarAndContentTemplateComponent implements OnInit, OnDestroy {
  @Input()
  config: SidebarMenuConfig;
  @Input()
  aboveContentSection: TemplateRef<any>;
  @Output()
  selectedTile: EventEmitter<Tile> = new EventEmitter<Tile>();
  subscription: Subscription;
  private currentUrl: string;
  currentTile: Tile;

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {

    this.currentUrl = this.router.url.substr(1);
    this.setCurrentTile();

    this.subscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
      this.currentUrl = (event as NavigationEnd).urlAfterRedirects.substr(1);
      this.setCurrentTile();
    });
  }

  private setCurrentTile() {
    this.config.sections.forEach(section => {
      section.tiles.forEach(tile => {
        if (this.checkIfLinkIsActive(tile.link)) {
          this.currentTile = tile;
          this.selectedTile.next(tile);
        }
      });
    });
  }

  goToLink(link: string, validators: SidebarMenuValidator[] = []) {

    if (validators.length > 0) {
      for (let i = 0; i < validators.length; i++) {
        const validate = validators[i].validate();
        if (validate) {
          return;
        }
      }
    }

    this.router.navigateByUrl(link);
  }

  checkIfLinkIsActive(link: string) {
    if (link.startsWith('/')) { link = link.substr(1); }

    return this.currentUrl == link;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCurrentSectionElement() {
    return this.currentTile?.aboveContent || null;
  }

  currentSectionHasAboveElement() {
    return !!this.currentTile?.aboveContent || false;
  }
}
