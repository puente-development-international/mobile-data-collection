import { NgModule, ErrorHandler } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { TranslateModule } from 'ng2-translate/ng2-translate';
import { TranslateLoader, TranslateStaticLoader } from 'ng2-translate/src/translate.service';
import { Http } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from "@angular/forms";
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { SignaturePadModule } from 'angular2-signaturepad';
import { IonicStorageModule } from '@ionic/storage';


// App
import { MyApp } from './app.component';

// Native imports
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Geolocation } from '@ionic-native/geolocation';
import { Camera } from '@ionic-native/camera';


// Providers
import { ParseProvider } from '../providers/parse/parse';
import { AuthProvider } from '../providers/auth/auth';
import { QueryServiceProvider } from '../providers/query-service/query-service';
import { ChartsProvider } from '../providers/charts/charts';
import { UserpositionProvider } from '../providers/userposition/userposition';
import { PhotosProvider } from '../providers/photos/photos';
import { UiUxProvider } from '../providers/ui-ux/ui-ux';
import { AssetManagerProvider } from '../providers/asset-manager/asset-manager';
import { MapControlsProvider } from '../providers/map-controls/map-controls';
import { StorageProvider } from '../providers/storage/storage';

// Components
import { AccordionComponent } from '../components/accordion/accordion';
import { CardFlippingComponent } from '../components/card-flipping/card-flipping';
import { ContentDrawerComponent } from '../components/content-drawer/content-drawer';
import { SearchbarObjectIdComponent } from '../components/searchbar-object-id/searchbar-object-id';
import { SignaturePadComponent } from '../components/signature/signature';
import { CircleDecorationComponent } from '../components/circle-decoration/circle-decoration';
import { AnimatedCirclesComponent } from '../components/animated-circles/animated-circles';

//Charts
import { BarchartComponent } from '../components/charts/barchart/barchart';
import { DoughnutComponent } from '../components/charts/doughnut/doughnut';
import { RadarComponent } from '../components/charts/radar/radar';

// Forms
import { PatientIDForm } from '../components/forms/patientid/patientid';
import { EnvironmentalHistoryForm } from '../components/forms/environmentalhistory/environmentalhistory';
import { MedicalHistoryForm } from '../components/forms/medicalhistory/medicalhistory';
import { VitalsForm } from '../components/forms/vitals/vitals';
import { EvaluationMedicalForm } from '../components/forms/evaluation-medical/evaluation-medical';
import { EvaluationSurgicalForm } from '../components/forms/evaluation-surgical/evaluation-surgical';
import { PrescriptionsForm } from '../components/forms/prescriptions/prescriptions';
import { AllergiesForm } from '../components/forms/allergies/allergies';
import { CustomForm } from '../components/forms/custom-form/custom-form';
import { ListofvitalsComponent } from '../components/lists/listofvitals/listofvitals';
import { ListofEnviroComponent } from '../components/lists/listofenv/listofenv';
import { ListofMedEvalComponent } from '../components/lists/listof-med-eval/listof-med-eval';

// Pages
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SigninPage } from '../pages/signin/signin';
import { SignupPage } from '../pages/signup/signup';
import { SigninForgotPage } from '../pages/signin-forgot/signin-forgot';
import { Splash } from '../pages/splash/splash';
import { MapPage } from '../pages/map/map';
import { ProfileModalPage } from '../pages/profile-modal/profile-modal';
import { EnviroEvalUpdatePage } from '../pages/update-forms/env-update/env-update';
import { PatientUpdatePage} from '../pages/update-forms/patientid-update/patientid-update';
import { VitalsUpdatePage } from '../pages/update-forms/vitals-update/vitals-update';
import { MedEvalUpdatePage } from '../pages/update-forms/medeval-update/medeval-update';
import { HelpPage } from '../pages/help/help';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { FindRecordsPage } from '../pages/find-records/find-records';
import { ManageCustomFormsPage } from '../pages/manage-custom-forms/manage-custom-forms';
import { SettingsPageModule } from '../pages/settings/settings.module';
import { TermsOfServicePage } from '../pages/about/terms-of-service/tos';
import { ConsentFormPage } from '../pages/about/consent-form/consent-form';





export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}


@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    SignupPage,
    SigninForgotPage,
    Splash,
    MapPage,
    ProfileModalPage,
    HelpPage,
    DashboardPage,
    FindRecordsPage,
    ManageCustomFormsPage,
    EnviroEvalUpdatePage,
    PatientUpdatePage,
    VitalsUpdatePage,
    MedEvalUpdatePage,
    TermsOfServicePage,
    ConsentFormPage,
    AccordionComponent,
    CardFlippingComponent,
    ContentDrawerComponent,
    SearchbarObjectIdComponent,
    SignaturePadComponent,
    CircleDecorationComponent,
    AnimatedCirclesComponent,
    BarchartComponent,
    DoughnutComponent,
    RadarComponent,
    ListofvitalsComponent,
    ListofEnviroComponent,
    ListofMedEvalComponent,
    PatientIDForm,
    EnvironmentalHistoryForm,
    MedicalHistoryForm,
    VitalsForm,
    EvaluationMedicalForm,
    EvaluationSurgicalForm,
    PrescriptionsForm,
    AllergiesForm,
    CustomForm
  ],
  imports: [
    BrowserModule,
    SignaturePadModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}),
    ChartsModule,
    SettingsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage,
    SigninPage,
    SignupPage,
    SigninForgotPage,
    TermsOfServicePage,
    ConsentFormPage,
    Splash,
    AnimatedCirclesComponent,
    ListofvitalsComponent,
    ListofEnviroComponent,
    ListofMedEvalComponent,
    SearchbarObjectIdComponent,
    SignaturePadComponent,
    MapPage,
    ProfileModalPage,
    HelpPage,
    DashboardPage,
    FindRecordsPage,
    ManageCustomFormsPage,
    EnviroEvalUpdatePage,
    PatientUpdatePage,
    VitalsUpdatePage,
    MedEvalUpdatePage,
    PatientIDForm,
    EnvironmentalHistoryForm,
    MedicalHistoryForm,
    VitalsForm,
    EvaluationMedicalForm,
    EvaluationSurgicalForm,
    PrescriptionsForm,
    AllergiesForm,
    CustomForm
    
  ],
  providers: [
    StatusBar,
    SplashScreen,
    //Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ParseProvider,
    AuthProvider,
    Geolocation,
    Camera,
    QueryServiceProvider,
    ChartsProvider,
    UserpositionProvider,
    PhotosProvider,
    UiUxProvider,
    AssetManagerProvider,
    MapControlsProvider,
    StorageProvider,
  ]
})
export class AppModule { }
