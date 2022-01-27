import { SignUpSuccessComponent } from './views/sign-up-success/sign-up-success.component';
import { DogStepFourComponent } from './views/create-dog-profile/dog-step-four/dog-step-four.component';
import { DogStepThreeComponent } from './views/create-dog-profile/dog-step-three/dog-step-three.component';
import { DogStepTwoComponent } from './views/create-dog-profile/dog-step-two/dog-step-two.component';
import { DogStepOneComponent } from './views/create-dog-profile/dog-step-one/dog-step-one.component';
import { NewsComponent } from './views/news/news.component';
import { StepFourComponent } from './views/create-user-profile/step-four/step-four.component';
import { StepThreeComponent } from './views/create-user-profile/step-three/step-three.component';
import { StepTwoComponent } from './views/create-user-profile/step-two/step-two.component';
import { StepOneComponent } from './views/create-user-profile/step-one/step-one.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { DetailsComponent } from './views/details/details.component';
import { NgModule } from '@angular/core';
import { DogListComponent } from './views/dog-list/dog-list.component';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './views/main/main.component';
import {CreateUserProfileStepOneGuard} from './guards/create-user-profile-step-one/create-user-profile-step-one.guard';
import {CreateDogProfileGuard} from './guards/create-dog-profile/create-dog-profile.guard';
import {IsUserLoggedGuard} from './guards/is-user-logged/is-user-logged.guard';
import {IsUserNotLoggedGuard} from './guards/is-user-not-logged/is-user-not-logged.guard';

import { DogProfileComponent } from './views/dog-profile/dog-profile.component';
import { UserProfileComponent } from './views/user-profile/user-profile-component';
import {VerifyAccountComponent} from './views/verify-account/verify-account.component';
import { AccountSettingsComponent } from './views/account-settings/account-settings.component';
import { UserProfileSettingsComponent } from './views/user-profile-settings/user-profile-settings.component';
import {MyPackComponent} from './components/my-pack/my-pack.component';
import { DogProfileSettingsComponent } from './views/dog-profile-settings/dog-profile-settings.component';
import {VerifyDeleteAccountComponent} from './views/verify-delete-account/verify-delete-account.component';
import {UserManageComponent} from './views/user-manage/user-manage/user-manage.component';
import { DogWalkRequestsListComponent } from './views/dog-walks-list/dog-walks-list.component';
import {FAQComponent} from './views/faq/faq.component';
import {TermsComponent} from './views/terms-and-conditions/terms.component';
import {PrivacyComponent} from './views/rodo-and-privacy-policy/privacy.component';
import {ForumComponent} from './views/forum/forum.component';
import {SubjectsComponent} from "./views/forum/subjects/subjects.component";
import {MessageContainerComponent} from './views/message/component/message-container/message-container.component';
import {MessageWindowComponent} from './views/message/component/message-window/message-window.component';
import {PostComponent} from "./views/forum/post/post.component";
import {ProposalsListComponent} from "./views/proposals-list/proposals-list.component";

const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [IsUserNotLoggedGuard]
  },
  {
    path: 'details',
    component: DetailsComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'sign-up-success',
    component: SignUpSuccessComponent
  },
  {
    path: 'create-user-profile/step-one',
    component: StepOneComponent,
    canActivate: [IsUserLoggedGuard, CreateUserProfileStepOneGuard]
  },
  {
    path: 'create-user-profile/step-two',
    component: StepTwoComponent,
    canActivate: [IsUserLoggedGuard, CreateUserProfileStepOneGuard]
  },
  {
    path: 'create-user-profile/step-three',
    component: StepThreeComponent,
    canActivate: [IsUserLoggedGuard, CreateUserProfileStepOneGuard]
  },
  {
    path: 'create-user-profile/step-four',
    component: StepFourComponent,
    canActivate: [IsUserLoggedGuard, CreateUserProfileStepOneGuard]
  },
  {
    path: 'create-dog-profile/dog-step-one',
    component: DogStepOneComponent,
    canActivate: [IsUserLoggedGuard, CreateDogProfileGuard]
  },
  {
    path: 'create-dog-profile/dog-step-two',
    component: DogStepTwoComponent,
    canActivate: [IsUserLoggedGuard, CreateDogProfileGuard]
  },
  {
    path: 'create-dog-profile/dog-step-three',
    component: DogStepThreeComponent,
    canActivate: [IsUserLoggedGuard, CreateDogProfileGuard]
  },
  {
    path: 'create-dog-profile/dog-step-four',
    component: DogStepFourComponent,
    canActivate: [IsUserLoggedGuard, CreateDogProfileGuard]
  },
  {
    path: 'not-found',
    component: NotFoundComponent
  },
  {
    path: 'dog/:id',
    component: DogProfileComponent,
    canActivate: [IsUserLoggedGuard]
  },
  {
    path: 'dog-list',
    component: DogListComponent,
    canActivate: [IsUserLoggedGuard]
  },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    canActivate: [IsUserLoggedGuard]
  },
  {
    path: 'verify/account/:token',
    component: VerifyAccountComponent
  },
  {
    path: 'verify/delete/:token',
    component: VerifyDeleteAccountComponent
  },
  {
    path: 'FAQ',
    component: FAQComponent,
    canActivate: [IsUserLoggedGuard]
  },
  {
    path: 'privacy',
    component: PrivacyComponent
  },
  {
    path: 'terms',
    component: TermsComponent
  },
  {
    path: 'forum',
    canActivate: [IsUserLoggedGuard],
    children: [
      {
        path: '',
        component: ForumComponent,
      },
      {
        path: 'category/:id',
        children: [
          {
            path: '',
            component: SubjectsComponent,
          },
          {
            path: 'post/:id',
            component: PostComponent,
          },
        ]
      },
    ]
  },
  {
    path: 'manage',
    component: UserManageComponent,
    canActivate: [IsUserLoggedGuard],
    children: [
      {
        path: 'my-pack',
        component: MyPackComponent,
      },
      {
        path: 'proposals-requests-list',
        component: ProposalsListComponent,
      },
      {
        path: 'dog-walk-requests-list',
        component: DogWalkRequestsListComponent,
      },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
      },
      {
        path: 'user-profile-settings',
        component: UserProfileSettingsComponent,
      },
      {
        path: 'dog-profile-settings',
        component: DogProfileSettingsComponent,
      },
    ]
  },
  {
    path: 'messages/:id',
    canActivate: [IsUserLoggedGuard],
    component: MessageContainerComponent,
  },
  {
    path: '**',
    redirectTo: '/not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
