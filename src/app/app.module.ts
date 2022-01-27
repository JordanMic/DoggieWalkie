import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './views/main/main.component';
import { DetailsComponent } from './views/details/details.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { SignInComponent } from './views/sign-in/sign-in.component';
import { SignUpComponent } from './views/sign-up/sign-up.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavbarComponent } from './components/navbar/navbar.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { NewsComponent } from './views/news/news.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTabsModule} from '@angular/material/tabs';
import {MatGridListModule} from '@angular/material/grid-list';
import { AlertBasicComponent } from './components/alert-basic/alert-basic.component';
import { DangerSameUserComponent } from './components/alerts/danger-same-user/danger-same-user.component';
import { DangerWrongLoginComponent } from './components/alerts/danger-wrong-login/danger-wrong-login.component';
import { WarningSeasionComponent } from './components/alerts/warning-seasion/warning-seasion.component';
import { SuccessRegisterComponent } from './components/alerts/success-register/success-register.component';
import { DangerWrongConfirmComponent } from './components/alerts/danger-wrong-confirm/danger-wrong-confirm.component';
import { HeaderCarouselComponent } from './components/header-carousel/header-carousel.component';
import { DogStepOneComponent } from './views/create-dog-profile/dog-step-one/dog-step-one.component';
import { DogStepTwoComponent } from './views/create-dog-profile/dog-step-two/dog-step-two.component';
import { DogStepThreeComponent } from './views/create-dog-profile/dog-step-three/dog-step-three.component';
import { DogStepFourComponent } from './views/create-dog-profile/dog-step-four/dog-step-four.component';
import { DogProfileSetingsComponent } from './components/dog-profile-setings/dog-profile-setings.component';
import { SignUpSuccessComponent } from './views/sign-up-success/sign-up-success.component';
import { PopupToCreateDogComponent } from './components/popup-to-create-dog/popup-to-create-dog.component';
import {ApiUrlInterceptor} from './core/interceptor/api-url.interceptor/api-url.interceptor';
import { RedirectInterceptor } from './core/interceptor/redirect.interceptor/redirect.interceptor';
import {HeaderInterceptor} from './core/interceptor/header/header.interceptor';
import { DogProfileComponent } from './views/dog-profile/dog-profile.component';
import { DogTileComponent } from './views/dog-list/dog-tile/dog-tile.component';
import { DogListComponent } from './views/dog-list/dog-list.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { CommonModule } from '@angular/common';
import { UserProfileComponent } from './views/user-profile/user-profile-component';
import { UserProfileSetingsComponent } from './components/user-profile-setings/user-profile-setings.component';
import { ChangePhotoModalComponent } from './components/change-photo-modal/change-photo-modal.component';
import {MatButtonModule} from '@angular/material/button';
import {CreateUserProfileModule} from './views/create-user-profile/create-user-profile.module';
import {VerifyAccountModule} from './views/verify-account/verify-account.module';
import {UserManageModule} from './views/user-manage/user-manage.module';
import {SharedModule} from './shared/shared.module';
import { AccountSettingsComponent } from './views/account-settings/account-settings.component';
import { UserProfileSettingsComponent } from './views/user-profile-settings/user-profile-settings.component';
import { MyPackComponent } from './components/my-pack/my-pack.component';
import { DogCardComponent } from './components/my-pack/dog-card/dog-card.component';
import { DogProfileSettingsComponent } from './views/dog-profile-settings/dog-profile-settings.component';
import { ChangeTownModalComponent } from './components/change-town-modal/change-town-modal.component';
import { VerifyDeleteAccountModule } from './views/verify-delete-account/verify-delete-account.module';
import {MessageModule} from './views/message/message.module';
import {MessageAndNotificationModule} from './core/message-and-notification/message-and-notification.module';
import { CreateMessageThreadComponent } from './components/create-message-thread/create-message-thread.component';
import {MatBadgeModule} from '@angular/material/badge';
import { DogWalkRequestsListComponent } from './views/dog-walks-list/dog-walks-list.component';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProposalModalComponent } from './components/proposal-modal/proposal-modal.component';
import { NeedToWalkModalComponent } from './components/need-to-walk-modal/need-to-walk-modal.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {NgxMatRangeSliderModule} from 'ngx-mat-range-slider';
import { FooterComponent } from './components/footer/footer.component';
import { FAQComponent } from './views/faq/faq.component';
import { QuestionModalComponent } from './components/FAQModal/question-modal/question-modal.component';
import { BugModalComponent } from './components/FAQModal/bug-modal/bug-modal.component';
import { TermsComponent } from './views/terms-and-conditions/terms.component';
import {MatTooltipModule} from '@angular/material/tooltip';
import { FooterMiniComponent } from './components/footer/footer-mini/footer-mini.component';
import { AcceptModalComponent } from './components/walk-requests-lists-modals/accept-modal/accept-modal.component';
import { RejectModalComponent } from './components/walk-requests-lists-modals/reject-modal/reject-modal.component';
import { UserReviewsComponent } from './views/user-reviews/user-reviews.component';
import { StarsComponent } from './shared/score-stars/score-stars.component';
import { ConfirmModalComponent } from './components/walk-requests-lists-modals/confirm-modal/confirm-modal.component';
import { PrivacyComponent } from './views/rodo-and-privacy-policy/privacy.component';
import { ForumComponent } from './views/forum/forum.component';
import { SubjectsComponent } from './views/forum/subjects/subjects.component';
import { PostComponent } from './views/forum/post/post.component';
import { NotificationComponent } from './components/notification/notification.component';
import {IntlModule} from '@progress/kendo-angular-intl';
import { NewPostsModalComponent } from './components/forum-modals/new-posts-modal/new-posts-modal.component';
import { NewCommentModalComponent } from './components/forum-modals/new-comment-modal/new-comment-modal.component';
import { ReportCommentModalComponent } from './components/forum-modals/report-comment-modal/report-comment-modal.component';
import { ReportPostModalComponent } from './components/forum-modals/report-post-modal/report-post-modal.component';
import { ProposalsListComponent } from './views/proposals-list/proposals-list.component';
import { ConfirmDogModalComponent } from './components/walk-requests-lists-modals/confirm-dog-modal/confirm-dog-modal.component';
import { SuccessQuestionModalComponent } from './components/FAQModal/success-question-modal/success-question-modal.component';
import { DeleteAccountModalComponent } from './components/delete-account-modal/delete-account-modal.component';
import { UserDeleteComponent } from './components/user-delete-account-modal/User-delete/user-delete.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {Ng2PageScrollModule} from 'ng2-page-scroll';
import { PasswordRemaindModalComponent } from './components/password-remaind-modal/password-remaind-modal.component';
import { SuccesProposalModalComponent } from './components/proposal-modal/succes-proposal-modal/succes-proposal-modal.component';
import {SuccesNeedToWalkModalComponent} from './components/need-to-walk-modal/succes-need-to-walk-modal/succes-need-to-walk-modal.component';
import { SuccesSettingModalComponent } from './components/succes-setting-modal/succes-setting-modal.component';
import { ErrorProposalModalComponent } from './components/proposal-modal/error-proposal-modal/error-proposal-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    DetailsComponent,
    NotFoundComponent,
    SignInComponent,
    SignUpComponent,
    NavbarComponent,
    NewsComponent,
    AlertBasicComponent,
    DangerSameUserComponent,
    DangerWrongLoginComponent,
    WarningSeasionComponent,
    SuccessRegisterComponent,
    DangerWrongConfirmComponent,
    HeaderCarouselComponent,
    DogStepOneComponent,
    DogStepTwoComponent,
    DogStepThreeComponent,
    DogStepFourComponent,
    DogProfileSetingsComponent,
    SignUpSuccessComponent,
    PopupToCreateDogComponent,
    DogProfileComponent,
    DogTileComponent,
    DogListComponent,
    UserProfileComponent,
    UserProfileSetingsComponent,
    ChangePhotoModalComponent,
    AccountSettingsComponent,
    UserProfileSettingsComponent,
    MyPackComponent,
    DogCardComponent,
    DogProfileSettingsComponent,
    ChangeTownModalComponent,
    CreateMessageThreadComponent,
    NeedToWalkModalComponent,
    ProposalModalComponent,
    DogWalkRequestsListComponent,
    FooterComponent,
    FAQComponent,
    TermsComponent,
    QuestionModalComponent,
    BugModalComponent,
    FooterMiniComponent,
    AcceptModalComponent,
    RejectModalComponent,
    DogWalkRequestsListComponent,
    UserReviewsComponent,
    StarsComponent,
    ConfirmModalComponent,
    PrivacyComponent,
    ForumComponent,
    SubjectsComponent,
    PostComponent,
    NotificationComponent,
    NewPostsModalComponent,
    NewCommentModalComponent,
    ReportCommentModalComponent,
    ReportPostModalComponent,
    ProposalsListComponent,
    ConfirmDogModalComponent,
    SuccessQuestionModalComponent,
    DeleteAccountModalComponent,
    UserDeleteComponent,
    SuccesProposalModalComponent,
    SuccesNeedToWalkModalComponent,
    SuccesSettingModalComponent,
    ErrorProposalModalComponent,
    PasswordRemaindModalComponent,
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgbModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatNativeDateModule,
        MatDatepickerModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        MatTabsModule,
        MatGridListModule,
        ImageCropperModule,
        CommonModule,
        MatButtonModule,
        FormsModule,
        VerifyAccountModule,
        CreateUserProfileModule,
        UserManageModule,
        SharedModule,
        VerifyDeleteAccountModule,
        MessageModule,
        MessageAndNotificationModule,
        MatBadgeModule,
        NgxMaterialTimepickerModule,
        MatExpansionModule,
        NgxMatRangeSliderModule,
        MatTooltipModule,
        IntlModule,
        MatAutocompleteModule,
        Ng2PageScrollModule
    ],

  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiUrlInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: RedirectInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: HeaderInterceptor, multi: true},
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
