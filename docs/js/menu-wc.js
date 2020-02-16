'use strict';


customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">puente-community-health-records-collection documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                        <li class="link">
                            <a href="changelog.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CHANGELOG
                            </a>
                        </li>
                        <li class="link">
                            <a href="contributing.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>CONTRIBUTING
                            </a>
                        </li>
                        <li class="link">
                            <a href="license.html"  data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>LICENSE
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link">AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' : 'data-target="#xs-components-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' :
                                            'id="xs-components-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' }>
                                            <li class="link">
                                                <a href="components/AboutPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AboutPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AccordionComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AccordionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AllergiesForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AllergiesForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnimatedCirclesComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">AnimatedCirclesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BarchartComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">BarchartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CardFlippingComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CardFlippingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CircleDecorationComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CircleDecorationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConsentFormPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ConsentFormPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContactPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContactPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ContentDrawerComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ContentDrawerComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CustomForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">CustomForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DashboardPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DashboardPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DoughnutComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">DoughnutComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnviroEvalUpdatePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EnviroEvalUpdatePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EnvironmentalHistoryForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EnvironmentalHistoryForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluationMedicalForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvaluationMedicalForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/EvaluationSurgicalForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">EvaluationSurgicalForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FindRecordsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">FindRecordsPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HelpPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HelpPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/HomePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">HomePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListofEnviroComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListofEnviroComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListofMedEvalComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListofMedEvalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListofvitalsComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ListofvitalsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ManageCustomFormsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ManageCustomFormsPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MapPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MapPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MedEvalUpdatePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MedEvalUpdatePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MedicalHistoryForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MedicalHistoryForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MyApp.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">MyApp</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientIDForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientIDForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PatientUpdatePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PatientUpdatePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PrescriptionsForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">PrescriptionsForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProfileModalPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">ProfileModalPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RadarComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">RadarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchbarObjectIdComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SearchbarObjectIdComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignaturePadComponent.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignaturePadComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SigninForgotPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SigninForgotPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SigninPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SigninPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SignupPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SignupPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Splash.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">Splash</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TabsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TabsPage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TermsOfServicePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">TermsOfServicePage</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VitalsForm.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VitalsForm</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/VitalsUpdatePage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">VitalsUpdatePage</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#injectables-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' : 'data-target="#xs-injectables-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' :
                                        'id="xs-injectables-links-module-AppModule-eee592c43f0368de659b1668b07b7ccd"' }>
                                        <li class="link">
                                            <a href="injectables/AssetManagerProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AssetManagerProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/AuthProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>AuthProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ChartsProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ChartsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/MapControlsProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>MapControlsProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ParseProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>ParseProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/PhotosProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>PhotosProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/QueryServiceProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>QueryServiceProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/StorageProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>StorageProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UiUxProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UiUxProvider</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/UserpositionProvider.html"
                                                data-type="entity-link" data-context="sub-entity" data-context-id="modules" }>UserpositionProvider</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/SettingsPageModule.html" data-type="entity-link">SettingsPageModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-SettingsPageModule-8a2c342afd94d202e8739ddd121a587f"' : 'data-target="#xs-components-links-module-SettingsPageModule-8a2c342afd94d202e8739ddd121a587f"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-SettingsPageModule-8a2c342afd94d202e8739ddd121a587f"' :
                                            'id="xs-components-links-module-SettingsPageModule-8a2c342afd94d202e8739ddd121a587f"' }>
                                            <li class="link">
                                                <a href="components/SettingsPage.html"
                                                    data-type="entity-link" data-context="sub-entity" data-context-id="modules">SettingsPage</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/User.html" data-type="entity-link">User</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});