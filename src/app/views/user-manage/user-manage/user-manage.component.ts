import {Component, OnInit, TemplateRef, ViewChildren} from '@angular/core';
import {Router} from '@angular/router';
import {SidebarMenuConfig, Tile} from '../../../shared/sidebar-and-content-template/sidebar-menu-config';
import {UserService} from '../../../core/user/service/user.service';
import {DogsSliderService} from '../../../shared/dogs-slider/dogs-slider.service';

@Component({
  selector: 'app-user-manage',
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.scss']
})
export class UserManageComponent implements OnInit {
  @ViewChildren('dogSlider') public dogSlider: TemplateRef<any>;
  config: SidebarMenuConfig = {
    back: {
      text: 'Wróć do strony głownej',
      link: '/dog-list'
    },
    sections: []
  };
  showAllDogs: boolean = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private dogSliderService: DogsSliderService
  ) { }

  ngOnInit(): void {
    this.setupMenu();

    if (this.router.url == '/manage' && this.config.sections.length > 0) {
      this.router.navigateByUrl(this.config.sections[0]?.tiles[0]?.link || '')
    }
  }


  private setupMenu() {

    const listOfDogs = this.userService.getUserData()?.userData?.listOfDogs || 0;


    if (this.userService.getUserData()?.userData?.request === true) {
      this.config.sections.push(
        {
          header: 'moje spacery',
          tiles: [
            {
              text: 'Lista psich spacerów',
              link: 'manage/dog-walk-requests-list'
            },
            {
              text: 'Lista moich propozycji',
              link: 'manage/proposals-requests-list'
            },
          ]
        },
      );
    }

    if (listOfDogs > 0) {
      this.config.sections.push(
        {
          header: 'zarządzaj moją watahą',
          tiles: [
            {
              text: 'Moja wataha',
              link: 'manage/my-pack'
            },
            {
              text: 'Ustawienia profili psów',
              link: 'manage/dog-profile-settings',
              aboveContent: true,
              extra: {
                showAllDogs: false
              }
            }
          ]
        },
      )
    }

    this.config.sections.push(
      {
        header: 'ustawienia',
        tiles: [
          {
            text: 'Profil',
            link: 'manage/user-profile-settings'
          },
          {
            text: 'Konto',
            link: 'manage/account-settings'
          }
        ]
      }
    )
  }

  selectedTile(tile: Tile) {
    const showAllDogs = !!tile?.extra?.showAllDogs;
    if (showAllDogs != this.showAllDogs) {
      this.showAllDogs = showAllDogs;
      this.dogSliderService.changeShowAll(showAllDogs);
    }
  }
}
