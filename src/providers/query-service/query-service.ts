import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { ParseProvider } from '../parse/parse';

/*
  Generated class for the QueryServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class QueryServiceProvider {

  constructor(private parseSrvc: ParseProvider) {
    console.log('Hello QueryServiceProvider Provider');

    
    parseSrvc.parseInitialize();
  }

  public genericQuery(parseObject: string, parseColumn: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parseSrvc.getParseENV();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);
        

        //Limiting Results based on a class
        query.equalTo(parseColumn);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  public basicQuery(offset: number = 0, limit: number = 3, parseObject: string, parseColumn: string, parseParam: string): Promise<any> {
    //This is Retrieving Results from Parse Server
    let Parse = this.parseSrvc.getParseENV();

    //Returns the resolve (the query) and if there's an error, rejects
    //Returns array of objects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseObject);

        //Queries the SurveyData class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        //You can skip the first results by setting skip
        query.skip(offset);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        //Limiting Results based on a class
        query.equalTo(parseColumn,parseParam);

        //Below searches what's in the surveyPoints array
        query.find().then((surveyPoints) => {
          resolve(surveyPoints);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }
  
  public geoQuery(lat: number, long: number, limit: number , parseClass: string, parseColumn: string, parseParam: string): Promise<any> {
    let Parse = this.parseSrvc.getParseENV();
    //Returns the resolve (the query) and if there's an error, rejects
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        //Creates local object based on "SurveyData" Object in Parse-Server
        const SurveyData = Parse.Object.extend(parseClass);

        //Users Location by creaing geopoint
        var myLocation = new Parse.GeoPoint({latitude: lat, longitude: long});

        //Query
        //Queries the Class from Parse Server
        let query = new Parse.Query(SurveyData);
        
        // Interested in locations (GeoPoint Column in Parse) near user.
        //query.near("location", myLocation);
        query.withinMiles("location", myLocation, 5);

        //You can limit the number of results by setting "limit"
        query.limit(limit);

        //Limiting Results based on a specific paramater in a specific field/column
        query.equalTo(parseColumn, parseParam);

        //Below searches what's in the surveyPoints array
        query.find().then((results) => {
          resolve(results);
        }, (error) => {
          reject(error);
        });
      }, 500);
    });
  }

  //Testing Cloud Code
  listAllPatients(){
    return this.parseSrvc.runCloudFunction("retrievePatientRecordsAll", null);
  }

  listPatientsByOrganization(organization){
    return this.parseSrvc.runCloudFunction("retrievePatientRecordByOrgnization", {
      organization: organization
    });

  }

  hello(){
    return this.parseSrvc.runCloudFunction("hello",null);
  }
  
}
